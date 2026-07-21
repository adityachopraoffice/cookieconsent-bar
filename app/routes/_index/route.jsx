import { redirect, Form, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData();

  return (
    <div className={styles.index}>
      <div className={styles.backgroundGlow}></div>
      
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.badge}>✨ Cookie Consent Bar</div>
          <h1 className={styles.heading}>
            Make your store <span className={styles.gradientText}>compliant</span> in minutes.
          </h1>
          <p className={styles.text}>
            The most beautiful, customizable, and frictionless way to handle GDPR cookie consent on your Shopify store. Keep your customers' trust without sacrificing design.
          </p>
          
          {showForm && (
            <Form className={styles.form} method="post" action="/auth/login">
              <label className={styles.label}>
                <span className={styles.labelText}>Enter your Shop domain</span>
                <div className={styles.inputWrapper}>
                  <input 
                    className={styles.input} 
                    type="text" 
                    name="shop" 
                    placeholder="my-shop-domain.myshopify.com" 
                  />
                  <button className={styles.button} type="submit">
                    Install App
                  </button>
                </div>
              </label>
            </Form>
          )}
        </div>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h3 className={styles.featureTitle}>Stunning Design</h3>
            <p className={styles.featureText}>Fully customizable to match your brand's aesthetic perfectly.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>Lightning Fast</h3>
            <p className={styles.featureText}>Zero impact on your store's performance or page load speed.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h3 className={styles.featureTitle}>Always Compliant</h3>
            <p className={styles.featureText}>Stay up to date with the latest privacy laws automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
