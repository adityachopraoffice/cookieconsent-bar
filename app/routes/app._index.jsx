import { Page, Layout, Card, Text, BlockStack, Button } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <Page>
      <TitleBar title="Dashboard" />
      <BlockStack gap="600">
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1f2124 0%, #3a3f45 100%)',
          borderRadius: '16px',
          padding: '40px',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '250px',
            height: '250px',
            background: 'linear-gradient(135deg, #00cceb 0%, #5cbf60 100%)',
            borderRadius: '50%',
            opacity: 0.2,
            filter: 'blur(50px)'
          }} />
          
          <div style={{ maxWidth: '500px', position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
              Make your store compliant,<br/>beautifully.
            </h1>
            <p style={{ fontSize: '16px', color: '#e1e3e5', marginBottom: '32px', lineHeight: 1.6 }}>
              Your cookie consent bar is installed. Now it's time to make it yours. 
              Choose a stunning template or customize every detail to match your brand.
            </p>
            <button 
              onClick={() => navigate('/app/templates')}
              style={{
                background: '#00cceb',
                color: '#fff',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 204, 235, 0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Browse Templates
            </button>
          </div>
          
          {/* Illustration / Graphic */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '16px', opacity: 0.95 }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '24px',
              borderRadius: '16px',
              width: '240px',
              color: '#fff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              transform: 'rotate(-4deg)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(-4deg)'}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🍪</div>
              <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>We value your privacy</div>
              <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '6px', width: '60%', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '20px' }} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1, height: '28px', background: '#00cceb', borderRadius: '6px' }} />
                <div style={{ width: '50px', height: '28px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '10px'
        }}>
          {/* Card 1 */}
          <div 
            onClick={() => navigate('/app/templates')}
            style={{
              background: '#fff',
              border: '1px solid #e1e3e5',
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#a29bfe'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = '#e1e3e5'}
          >
            <div style={{ 
              width: '48px', height: '48px', borderRadius: '12px', 
              background: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px'
            }}>
              🎨
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#202223', marginBottom: '8px' }}>Design Templates</h3>
              <p style={{ color: '#6d7175', fontSize: '14px', lineHeight: 1.5 }}>
                Get a head start with our professionally designed, responsive templates.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => navigate('/app/settings')}
            style={{
              background: '#fff',
              border: '1px solid #e1e3e5',
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#00b894'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = '#e1e3e5'}
          >
            <div style={{ 
              width: '48px', height: '48px', borderRadius: '12px', 
              background: 'linear-gradient(135deg, #55efc4 0%, #00b894 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px'
            }}>
              ⚙️
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#202223', marginBottom: '8px' }}>Customize Settings</h3>
              <p style={{ color: '#6d7175', fontSize: '14px', lineHeight: 1.5 }}>
                Fine-tune your colors, text, and banner position to match your brand perfectly.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => navigate('/app/pricing')}
            style={{
              background: '#fff',
              border: '1px solid #e1e3e5',
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#fd79a8'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = '#e1e3e5'}
          >
            <div style={{ 
              width: '48px', height: '48px', borderRadius: '12px', 
              background: 'linear-gradient(135deg, #fab1a0 0%, #fd79a8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px'
            }}>
              💎
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#202223', marginBottom: '8px' }}>Unlock Premium</h3>
              <p style={{ color: '#6d7175', fontSize: '14px', lineHeight: 1.5 }}>
                Remove watermarks, access premium templates, and get priority support.
              </p>
            </div>
          </div>
        </div>
      </BlockStack>
    </Page>
  );
}
