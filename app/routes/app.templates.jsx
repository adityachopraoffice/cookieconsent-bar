import { useState, useEffect } from "react";
import { Page, Layout, BlockStack, Text, Modal } from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useSubmit, useNavigate, useActionData, useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  const billingCheck = await billing.check({
    plans: ["Premium Plan"],
    isTest: true,
  });
  return { hasActivePayment: billingCheck.hasActivePayment };
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();
  
  const data = {
    bannerText: formData.get("bannerText"),
    bgColor: formData.get("bgColor"),
    textColor: formData.get("textColor"),
    buttonColor: formData.get("buttonColor"),
    buttonTextColor: formData.get("buttonTextColor"),
    acceptButtonText: formData.get("acceptButtonText"),
    declineButtonText: "Decline",
  };

  await prisma.shopSettings.upsert({
    where: { shop },
    update: data,
    create: { shop, ...data, position: "bottom", privacyPolicyUrl: "" },
  });

  return { success: true };
};

const TemplatePreview = ({ bannerText, bgColor, textColor, buttonColor, buttonTextColor, acceptText, isPill }) => (
  <div style={{
    backgroundColor: bgColor,
    color: textColor,
    padding: isPill ? "12px 20px" : "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxSizing: "border-box",
    fontFamily: "sans-serif",
    fontSize: "12px",
    borderRadius: isPill ? "50px" : "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    width: "90%",
  }}>
    <div style={{ fontWeight: 500, lineHeight: 1.4 }}>{bannerText}</div>
    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
      <button style={{
        backgroundColor: "transparent",
        color: textColor,
        border: "none",
        fontSize: "11px",
        cursor: "pointer",
        textDecoration: "underline"
      }}>
        Decline
      </button>
      <button style={{
        backgroundColor: buttonColor,
        color: buttonTextColor,
        border: "none",
        padding: "6px 12px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "11px",
        borderRadius: isPill ? "50px" : "4px"
      }}>
        {acceptText}
      </button>
    </div>
  </div>
);

const TemplateCard = ({ title, tier, gradient, mockup, ctaText, isUpgrade, onPreview, onApply }) => {
  return (
    <div style={{
      borderRadius: '12px',
      border: '1px solid #e1e3e5',
      overflow: 'hidden',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      height: '100%'
    }}>
      {/* Top half: Gradient + Mockup */}
      <div style={{
        background: gradient,
        height: '180px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {mockup}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          backgroundColor: tier === 'FREE' ? '#5cbf60' : '#00cceb',
          color: '#fff',
          fontSize: '11px',
          fontWeight: 'bold',
          padding: '4px 10px',
          borderRadius: '12px',
          letterSpacing: '0.5px'
        }}>
          {tier}
        </div>
      </div>
      
      {/* Bottom half: Info and Buttons */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong style={{ fontSize: '15px', color: '#202223', fontFamily: 'sans-serif' }}>{title}</strong>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: tier === 'FREE' ? '#5cbf60' : '#00cceb', letterSpacing: '0.5px' }}>
            {tier}
          </span>
        </div>
        
        <button 
          onClick={onPreview}
          style={{
            background: 'none',
            border: 'none',
            color: '#6d7175',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontWeight: 500
          }}
        >
          <svg viewBox="0 0 20 20" style={{width: '16px', height: '16px', fill: 'currentColor'}}>
            <path fillRule="evenodd" d="M10 4.5c-3.4 0-6.5 2.2-8.3 5.5 1.8 3.3 4.9 5.5 8.3 5.5s6.5-2.2 8.3-5.5c-1.8-3.3-4.9-5.5-8.3-5.5zm0 9c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm0-5.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          Live Preview
        </button>
        
        <div style={{ flexGrow: 1 }} />
        
        <button 
          onClick={onApply}
          style={{
            backgroundColor: isUpgrade ? '#00cceb' : '#1f2124',
            color: '#fff',
            border: 'none',
            padding: '12px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '13px',
            width: '100%',
            transition: 'background-color 0.2s'
          }}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
};

export default function Templates() {
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const submit = useSubmit();
  const navigate = useNavigate();
  const shopify = useAppBridge();
  const actionData = useActionData();
  const { hasActivePayment } = useLoaderData();

  useEffect(() => {
    if (actionData?.success) {
      shopify.toast.show("Design applied successfully!");
    }
  }, [actionData, shopify]);

  const handleApply = (t) => {
    if (t.isUpgrade) {
      navigate("/app/pricing");
    } else {
      submit(t.config, { method: "post" });
    }
  };

  const templates = [
    {
      title: "Minimalist Light",
      tier: "FREE",
      gradient: "linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)",
      ctaText: "Apply Design",
      config: {
        bannerText: "We use cookies to ensure you get the best experience on our website.",
        bgColor: "#ffffff",
        textColor: "#111111",
        buttonColor: "#111111",
        buttonTextColor: "#ffffff",
        acceptButtonText: "Accept All"
      },
      mockup: (
        <TemplatePreview 
          bannerText="We use cookies to ensure you get the best experience on our website."
          bgColor="#ffffff"
          textColor="#111111"
          buttonColor="#111111"
          buttonTextColor="#ffffff"
          acceptText="Accept All"
        />
      )
    },
    {
      title: "Elegant Dark",
      tier: "FREE",
      gradient: "linear-gradient(135deg, #00b894 0%, #55efc4 100%)",
      ctaText: "Apply Design",
      config: {
        bannerText: "Our website uses cookies to analyze traffic and personalize content.",
        bgColor: "#1a1a1a",
        textColor: "#ffffff",
        buttonColor: "#ffffff",
        buttonTextColor: "#1a1a1a",
        acceptButtonText: "Got it!"
      },
      mockup: (
        <TemplatePreview 
          bannerText="Our website uses cookies to analyze traffic and personalize content."
          bgColor="#1a1a1a"
          textColor="#ffffff"
          buttonColor="#ffffff"
          buttonTextColor="#1a1a1a"
          acceptText="Got it!"
        />
      )
    },
    {
      title: "Floating Pill",
      tier: "PREMIUM",
      gradient: "linear-gradient(135deg, #fd79a8 0%, #fab1a0 100%)",
      ctaText: hasActivePayment ? "Apply Design" : "Upgrade to Premium",
      isUpgrade: !hasActivePayment,
      config: {
        bannerText: "🍪 We use cookies for a better experience.",
        bgColor: "#e8f4fd",
        textColor: "#0b5c9c",
        buttonColor: "#0b5c9c",
        buttonTextColor: "#ffffff",
        acceptButtonText: "Allow Cookies"
      },
      mockup: (
        <TemplatePreview 
          bannerText="🍪 We use cookies for a better experience."
          bgColor="#e8f4fd"
          textColor="#0b5c9c"
          buttonColor="#0b5c9c"
          buttonTextColor="#ffffff"
          acceptText="Allow Cookies"
          isPill={true}
        />
      )
    }
  ];

  return (
    <Page title="Templates">
      <TitleBar title="Templates" />
      <BlockStack gap="600">
        <Layout>
          {templates.map(t => (
            <Layout.Section variant="oneThird" key={t.title}>
              <TemplateCard 
                {...t}
                onPreview={() => setPreviewTemplate(t)}
                onApply={() => handleApply(t)}
              />
            </Layout.Section>
          ))}
        </Layout>
      </BlockStack>

      <Modal
        open={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        title={`Preview: ${previewTemplate?.title}`}
      >
        <Modal.Section>
          {previewTemplate && (
            <div style={{
              background: previewTemplate.gradient,
              padding: '60px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }}>
              {previewTemplate.mockup}
            </div>
          )}
        </Modal.Section>
      </Modal>
    </Page>
  );
}
