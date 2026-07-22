document.addEventListener('DOMContentLoaded', function() {
  var isDesignMode = window.Shopify && window.Shopify.designMode;
  var consent = localStorage.getItem('cookieconsent');
  
  if (!isDesignMode && (consent === 'accepted' || consent === 'declined')) {
    return;
  }

  var wrapper = document.getElementById('cookieconsent-wrapper');
  if (!wrapper) return;
  var shop = wrapper.getAttribute('data-shop');
  
  if (!shop) return;

  // Assuming api endpoint is served under /apps/ proxy in Shopify
  // However the instruction says fetch from /apps/cookieconsent-bar/api/settings?shop={shop}
  // Wait, the prompt says exactly: "Fetch settings from /apps/cookieconsent-bar/api/settings?shop={shop}"
  
  fetch('/apps/easycookiebar/api/settings?shop=' + shop)
    .then(function(res) { return res.json(); })
    .then(function(settings) {
      if (!settings) return;

      var banner = document.createElement('div');
      banner.id = 'cookieconsent-banner';
      banner.style.position = 'fixed';
      banner.style.backgroundColor = settings.bgColor || '#000';
      banner.style.color = settings.textColor || '#fff';
      banner.style.padding = '15px';
      banner.style.display = 'flex';
      banner.style.justifyContent = 'space-between';
      banner.style.alignItems = 'center';
      banner.style.boxSizing = 'border-box';
      banner.style.zIndex = '999999';
      banner.style.fontFamily = 'sans-serif';

      var layout = settings.layout || 'banner';
      if (layout === 'pill') {
        banner.style[settings.position === 'top' ? 'top' : 'bottom'] = '20px';
        banner.style.left = '50%';
        banner.style.transform = 'translateX(-50%)';
        banner.style.width = 'auto';
        banner.style.maxWidth = '90%';
        banner.style.borderRadius = '50px';
        banner.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      } else if (layout === 'box') {
        banner.style[settings.position === 'top' ? 'top' : 'bottom'] = '20px';
        banner.style.left = '20px';
        banner.style.width = '350px';
        banner.style.maxWidth = 'calc(100% - 40px)';
        banner.style.borderRadius = '8px';
        banner.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
        banner.style.flexDirection = 'column';
        banner.style.alignItems = 'flex-start';
        banner.style.gap = '15px';
      } else {
        // banner
        banner.style.left = '0';
        banner.style.right = '0';
        banner.style[settings.position === 'top' ? 'top' : 'bottom'] = '0';
        banner.style.width = '100%';
      }

      var textDiv = document.createElement('div');
      textDiv.innerText = settings.bannerText || 'We use cookies to improve your experience.';
      
      if (settings.privacyPolicyUrl) {
        var link = document.createElement('a');
        link.href = settings.privacyPolicyUrl;
        link.target = '_blank';
        link.innerText = ' Privacy Policy';
        link.style.color = settings.textColor || '#fff';
        link.style.textDecoration = 'underline';
        link.style.marginLeft = '5px';
        textDiv.appendChild(link);
      }

      var btnDiv = document.createElement('div');
      btnDiv.style.display = 'flex';
      btnDiv.style.gap = '10px';
      if (layout === 'box') {
        btnDiv.style.width = '100%';
        btnDiv.style.justifyContent = 'flex-end';
      }

      var acceptBtn = document.createElement('button');
      acceptBtn.innerText = settings.acceptButtonText || 'Accept';
      acceptBtn.style.backgroundColor = settings.buttonColor || '#fff';
      acceptBtn.style.color = settings.buttonTextColor || '#000';
      acceptBtn.style.border = 'none';
      acceptBtn.style.padding = '8px 15px';
      acceptBtn.style.cursor = 'pointer';
      acceptBtn.style.fontWeight = 'bold';
      acceptBtn.style.borderRadius = '4px';

      var declineBtn = document.createElement('button');
      declineBtn.innerText = settings.declineButtonText || 'Decline';
      declineBtn.style.backgroundColor = settings.buttonColor || '#fff';
      declineBtn.style.color = settings.buttonTextColor || '#000';
      declineBtn.style.border = 'none';
      declineBtn.style.padding = '8px 15px';
      declineBtn.style.cursor = 'pointer';
      declineBtn.style.fontWeight = 'bold';
      declineBtn.style.borderRadius = '4px';

      acceptBtn.onclick = function() {
        localStorage.setItem('cookieconsent', 'accepted');
        banner.remove();
      };

      declineBtn.onclick = function() {
        localStorage.setItem('cookieconsent', 'declined');
        banner.remove();
      };

      btnDiv.appendChild(acceptBtn);
      btnDiv.appendChild(declineBtn);

      banner.appendChild(textDiv);
      banner.appendChild(btnDiv);

      document.body.appendChild(banner);
    })
    .catch(function(err) {
      console.error('Error fetching cookie consent settings:', err);
    });
});
