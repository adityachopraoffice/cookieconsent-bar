import { Page, BlockStack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useSubmit, useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  const billingCheck = await billing.check({
    plans: ["Premium Plan"],
    isTest: true,
  });

  return {
    hasActivePayment: billingCheck.hasActivePayment,
  };
};

export const action = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  const formData = await request.formData();
  const plan = formData.get("plan");

  if (plan === "Premium Plan") {
    return await billing.request({
      plan: "Premium Plan",
      isTest: true,
    });
  } else if (plan === "Cancel") {
    const billingCheck = await billing.check({
      plans: ["Premium Plan"],
      isTest: true,
    });
    const subscription = billingCheck.appSubscriptions[0];
    if (subscription) {
      const result = await billing.cancel({
        subscriptionId: subscription.id,
        isTest: true,
        prorate: true,
      });
      return result;
    }
  }
  return null;
};

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
    <path fillRule="evenodd" d="M16.7 5.3c.4.4.4 1 0 1.4l-8 8c-.4.4-1 .4-1.4 0l-4-4c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.3 3.3 7.3-7.3c.4-.4 1-.4 1.4 0z" />
  </svg>
);

export default function Pricing() {
  const submit = useSubmit();
  const { hasActivePayment } = useLoaderData();

  const handleUpgrade = () => {
    submit({ plan: "Premium Plan" }, { method: "post" });
  };
  
  const handleCancel = () => {
    submit({ plan: "Cancel" }, { method: "post" });
  };

  return (
    <Page fullWidth>
      <TitleBar title="Pricing" />
      <BlockStack gap="800">
        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#202223', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Simple, transparent pricing
          </h1>
          <p style={{ fontSize: '18px', color: '#6d7175', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
            Start for free and upgrade when you need more customization and premium templates.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 20px',
          alignItems: 'stretch'
        }}>
          {/* Free Plan */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e1e3e5',
            borderRadius: '24px',
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            transition: 'transform 0.2s',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#202223', marginBottom: '12px' }}>Free Plan</h2>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '24px' }}>
              <span style={{ fontSize: '42px', fontWeight: '900', color: '#202223', letterSpacing: '-1px' }}>$0</span>
              <span style={{ fontSize: '15px', color: '#6d7175', marginLeft: '4px' }}>/ month</span>
            </div>
            
            <p style={{ color: '#6d7175', fontSize: '15px', marginBottom: '32px', lineHeight: 1.5 }}>
              Perfect for getting started with basic cookie consent compliance.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#202223', fontSize: '15px' }}>
                <span style={{ color: '#5cbf60' }}><CheckIcon /></span>
                Basic Cookie Consent Banner
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#202223', fontSize: '15px' }}>
                <span style={{ color: '#5cbf60' }}><CheckIcon /></span>
                Standard Colors
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#202223', fontSize: '15px' }}>
                <span style={{ color: '#5cbf60' }}><CheckIcon /></span>
                Accept & Decline Buttons
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#a6a8ab', fontSize: '15px', textDecoration: 'line-through' }}>
                <span style={{ color: '#e1e3e5' }}><CheckIcon /></span>
                Premium Templates
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#a6a8ab', fontSize: '15px', textDecoration: 'line-through' }}>
                <span style={{ color: '#e1e3e5' }}><CheckIcon /></span>
                No Watermark
              </li>
            </ul>

            <button 
              disabled={!hasActivePayment}
              onClick={hasActivePayment ? handleCancel : undefined}
              style={{
                width: '100%',
                background: '#f4f6f8',
                color: '#8c9196',
                border: '1px solid #e1e3e5',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: !hasActivePayment ? 'not-allowed' : 'pointer',
              }}
            >
              {!hasActivePayment ? "Current Plan" : "Downgrade to Free"}
            </button>
          </div>

          {/* Premium Plan */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(#ffffff, #ffffff), linear-gradient(135deg, #00cceb 0%, #a29bfe 100%)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            position: 'relative',
            transform: 'scale(1.02)',
          }}>
            <div style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #00cceb 0%, #a29bfe 100%)',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 10px rgba(0,204,235,0.3)'
            }}>
              Most Popular
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#202223', marginBottom: '12px' }}>Premium Plan</h2>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '24px' }}>
              <span style={{ fontSize: '42px', fontWeight: '900', color: '#202223', letterSpacing: '-1px' }}>$9.99</span>
              <span style={{ fontSize: '15px', color: '#6d7175', marginLeft: '4px' }}>/ month</span>
            </div>
            
            <p style={{ color: '#6d7175', fontSize: '15px', marginBottom: '32px', lineHeight: 1.5 }}>
              Unlock the full potential of your brand with advanced features and designs.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#202223', fontSize: '15px', fontWeight: 500 }}>
                <span style={{ color: '#a29bfe' }}><CheckIcon /></span>
                Premium Templates
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#202223', fontSize: '15px', fontWeight: 500 }}>
                <span style={{ color: '#a29bfe' }}><CheckIcon /></span>
                Advanced Color Customization
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#202223', fontSize: '15px', fontWeight: 500 }}>
                <span style={{ color: '#a29bfe' }}><CheckIcon /></span>
                No Watermark
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#202223', fontSize: '15px' }}>
                <span style={{ color: '#a29bfe' }}><CheckIcon /></span>
                Priority Support
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#202223', fontSize: '15px' }}>
                <span style={{ color: '#a29bfe' }}><CheckIcon /></span>
                Everything in Free
              </li>
            </ul>

            <button 
              onClick={hasActivePayment ? undefined : handleUpgrade}
              disabled={hasActivePayment}
              style={{
                width: '100%',
                background: hasActivePayment ? '#f4f6f8' : '#1f2124',
                color: hasActivePayment ? '#8c9196' : '#fff',
                border: hasActivePayment ? '1px solid #e1e3e5' : 'none',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: hasActivePayment ? 'not-allowed' : 'pointer',
                boxShadow: hasActivePayment ? 'none' : '0 4px 15px rgba(31, 33, 36, 0.2)',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                if(!hasActivePayment) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(31, 33, 36, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if(!hasActivePayment) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(31, 33, 36, 0.2)';
                }
              }}
            >
              {hasActivePayment ? "Current Plan" : "Upgrade to Premium"}
            </button>
          </div>
        </div>
      </BlockStack>
    </Page>
  );
}
