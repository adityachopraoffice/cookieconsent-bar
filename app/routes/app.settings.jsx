import { useEffect, useState } from "react";
import { useSubmit, useLoaderData, useActionData } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Page,
  Card,
  BlockStack,
  TextField,
  Select,
  Button,
  Text,
  FormLayout,
  Divider,
} from "@shopify/polaris";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  let settings = await prisma.shopSettings.findUnique({
    where: { shop },
  });

  if (!settings) {
    settings = await prisma.shopSettings.create({
      data: {
        shop,
        bannerText: "We use cookies to improve your experience.",
        privacyPolicyUrl: "",
        acceptButtonText: "Accept",
        declineButtonText: "Decline",
        bgColor: "#000000",
        textColor: "#FFFFFF",
        buttonColor: "#FFFFFF",
        buttonTextColor: "#000000",
        position: "bottom",
        layout: "banner",
      },
    });
  }

  return settings;
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();
  
  const data = {
    bannerText: formData.get("bannerText"),
    privacyPolicyUrl: formData.get("privacyPolicyUrl"),
    acceptButtonText: formData.get("acceptButtonText"),
    declineButtonText: formData.get("declineButtonText"),
    bgColor: formData.get("bgColor"),
    textColor: formData.get("textColor"),
    buttonColor: formData.get("buttonColor"),
    buttonTextColor: formData.get("buttonTextColor"),
    position: formData.get("position"),
    layout: formData.get("layout") || "banner",
  };

  await prisma.shopSettings.upsert({
    where: { shop },
    update: data,
    create: { shop, ...data },
  });

  return { success: true };
};

export default function Index() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  const shopify = useAppBridge();

  const [formState, setFormState] = useState(loaderData);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (loaderData) {
      setFormState(loaderData);
    }
  }, [loaderData]);

  useEffect(() => {
    if (actionData?.success) {
      shopify.toast.show("Settings saved");
      setIsSaving(false);
    }
  }, [actionData, shopify]);

  const handleChange = (value, id) => {
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    submit(formState, { method: "post" });
  };

  const positionOptions = [
    { label: "Bottom", value: "bottom" },
    { label: "Top", value: "top" },
  ];

  return (
    <Page title="Customize Banner">
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* Left Column: Forms */}
        <div style={{ flex: '1 1 60%', minWidth: '300px' }}>
          <BlockStack gap="500">
            
            <Card padding="500">
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">Content</Text>
                <Text as="p" tone="subdued">Define the text and links shown to your customers.</Text>
                <Divider />
                <FormLayout>
                  <TextField
                    label="Banner Text"
                    id="bannerText"
                    value={formState?.bannerText || ""}
                    onChange={handleChange}
                    autoComplete="off"
                    multiline={2}
                  />
                  <TextField
                    label="Privacy Policy URL"
                    id="privacyPolicyUrl"
                    value={formState?.privacyPolicyUrl || ""}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="https://yourstore.com/policies/privacy-policy"
                  />
                  <FormLayout.Group>
                    <TextField
                      label="Accept Button Text"
                      id="acceptButtonText"
                      value={formState?.acceptButtonText || ""}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <TextField
                      label="Decline Button Text"
                      id="declineButtonText"
                      value={formState?.declineButtonText || ""}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </FormLayout.Group>
                </FormLayout>
              </BlockStack>
            </Card>

            <Card padding="500">
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">Appearance</Text>
                <Text as="p" tone="subdued">Customize the colors to match your brand identity.</Text>
                <Divider />
                <FormLayout>
                  <FormLayout.Group>
                    <TextField
                      label="Background Color"
                      type="color"
                      id="bgColor"
                      value={formState?.bgColor || "#000000"}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <TextField
                      label="Text Color"
                      type="color"
                      id="textColor"
                      value={formState?.textColor || "#ffffff"}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                      label="Button Color"
                      type="color"
                      id="buttonColor"
                      value={formState?.buttonColor || "#ffffff"}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <TextField
                      label="Button Text Color"
                      type="color"
                      id="buttonTextColor"
                      value={formState?.buttonTextColor || "#000000"}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </FormLayout.Group>
                  <Select
                    label="Position on Screen"
                    id="position"
                    options={positionOptions}
                    value={formState?.position || "bottom"}
                    onChange={handleChange}
                  />
                  <Select
                    label="Layout Style"
                    id="layout"
                    options={[
                      { label: "Full Width Banner", value: "banner" },
                      { label: "Floating Pill", value: "pill" },
                      { label: "Floating Box", value: "box" },
                    ]}
                    value={formState?.layout || "banner"}
                    onChange={handleChange}
                  />
                </FormLayout>
              </BlockStack>
            </Card>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '40px' }}>
              <Button variant="primary" onClick={handleSave} loading={isSaving} size="large">
                Save Settings
              </Button>
            </div>
          </BlockStack>
        </div>

        {/* Right Column: Sticky Live Preview */}
        <div style={{ flex: '1 1 35%', minWidth: '300px', position: 'sticky', top: '24px' }}>
          <Card padding="0">
            <div style={{ padding: '20px', borderBottom: '1px solid #e1e3e5', background: '#fafbfb' }}>
              <Text variant="headingMd" as="h2">Live Preview</Text>
              <Text as="p" tone="subdued" variant="bodySm">See how it looks on your store</Text>
            </div>
            <div style={{
              background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23f4f6f8\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
              padding: '40px 20px',
              display: 'flex',
              alignItems: formState?.layout === "box" ? 'flex-end' : (formState?.layout === "banner" && formState?.position === "top" ? 'flex-start' : 'center'),
              justifyContent: formState?.layout === "box" ? 'flex-start' : 'center',
              minHeight: '200px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  width: formState?.layout === "banner" ? "100%" : (formState?.layout === "pill" ? "auto" : "100%"),
                  maxWidth: formState?.layout === "box" ? "300px" : "100%",
                  backgroundColor: formState?.bgColor || "#000000",
                  color: formState?.textColor || "#ffffff",
                  padding: formState?.layout === "pill" ? "12px 24px" : "16px 20px",
                  display: "flex",
                  flexDirection: formState?.layout === "box" ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: formState?.layout === "box" ? "flex-start" : "center",
                  gap: "12px",
                  boxSizing: "border-box",
                  fontFamily: "sans-serif",
                  borderRadius: formState?.layout === "banner" ? "0" : (formState?.layout === "pill" ? "50px" : "8px"),
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  position: formState?.layout === "banner" ? "absolute" : "relative",
                  bottom: formState?.layout === "banner" && formState?.position === "bottom" ? "0" : "auto",
                  top: formState?.layout === "banner" && formState?.position === "top" ? "0" : "auto",
                  left: formState?.layout === "banner" ? "0" : "auto",
                  right: formState?.layout === "banner" ? "0" : "auto",
                }}
              >
                <div style={{ fontSize: '13px', lineHeight: 1.5, fontWeight: 500 }}>
                  {formState?.bannerText || "We use cookies..."}{" "}
                  {formState?.privacyPolicyUrl && (
                    <a
                      href={formState.privacyPolicyUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: formState.textColor, textDecoration: "underline", marginLeft: '4px' }}
                    >
                      Privacy Policy
                    </a>
                  )}
                </div>
                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", width: formState?.layout === "box" ? "100%" : "auto" }}>
                  <button
                    style={{
                      background: "transparent",
                      color: formState?.textColor || "#ffffff",
                      border: "none",
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: "12px",
                      textDecoration: "underline"
                    }}
                  >
                    {formState?.declineButtonText || "Decline"}
                  </button>
                  <button
                    style={{
                      backgroundColor: formState?.buttonColor || "#ffffff",
                      color: formState?.buttonTextColor || "#000000",
                      border: "none",
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "12px",
                      borderRadius: "6px"
                    }}
                  >
                    {formState?.acceptButtonText || "Accept"}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </Page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
