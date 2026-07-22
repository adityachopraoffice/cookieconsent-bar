export const meta = () => {
  return [
    { title: "Privacy Policy | Cookie Consent Bar" },
    { name: "description", content: "Privacy policy for the Cookie Consent Bar Shopify App." }
  ];
};

export default function PrivacyPolicy() {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      lineHeight: 1.6,
      color: '#333',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Privacy Policy</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>Last Updated: {new Date().toLocaleDateString()}</p>
      
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>1. Information We Collect</h2>
        <p>When you install the Cookie Consent Bar app, we automatically access certain types of information from your Shopify account:</p>
        <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
          <li><strong>Store Information:</strong> Your store domain and basic contact information to provide you with app updates and customer support.</li>
          <li><strong>Theme Data:</strong> We may access your theme files to inject our cookie consent script to make it visible on your storefront.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>2. How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
          <li>To provide and operate the Cookie Consent Bar service.</li>
          <li>To communicate with you regarding updates, support, or billing.</li>
          <li>To ensure your store complies with our terms of service and billing requirements.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>3. Data Sharing and Retention</h2>
        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We retain your store data as long as you have the app installed. When you uninstall the app, we are required by Shopify to delete your personal data within 48 hours via Shopify's mandatory webhooks.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>4. Your Customer's Data</h2>
        <p>Our app does not collect, track, or store any personal information from the end customers visiting your Shopify store. The cookie consent decisions are processed directly in the user's browser using local cookies/storage.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>5. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <strong>support@yourdomain.com</strong>.</p>
      </section>
    </div>
  );
}
