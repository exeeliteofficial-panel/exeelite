// Contact Popup Functions
window.openContactPopup = function () {
  const popup = document.getElementById('contactPopup');
  if (popup) {
    popup.style.display = 'flex';
    popup.offsetHeight;
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

window.closeContactPopup = function () {
  const popup = document.getElementById('contactPopup');
  if (popup) {
    popup.classList.remove('active');
    setTimeout(() => {
      popup.style.display = 'none';
      if (!document.getElementById('selectionPopup')?.classList.contains('active')) {
        document.body.style.overflow = '';
      }
    }, 300);
  }
}

// Product Data for Selection Popup
const productPlans = {
  "Premium Panel": [
    { duration: "1 Week", price: "300 Tk", link: "https://dash.zinipay.com/exe-elite/product/99a55974-026b-4bef-b398-96735ee25568" },
    { duration: "1 Month", price: "600 Tk", link: "https://dash.zinipay.com/exe-elite/product/99a55974-026b-4bef-b398-96735ee25568" },
    { duration: "1 Year", price: "2000 Tk", link: "https://dash.zinipay.com/exe-elite/product/99a55974-026b-4bef-b398-96735ee25568" },
    { duration: "Lifetime", price: "3000 Tk", link: "https://dash.zinipay.com/exe-elite/product/99a55974-026b-4bef-b398-96735ee25568" }
  ],
  "Aimbot Ai": [
    { duration: "1 Week", price: "150 Tk", link: "https://dash.zinipay.com/exe-elite/product/123-dummy" },
    { duration: "1 Month", price: "449 Tk", link: "https://dash.zinipay.com/exe-elite/product/123-dummy" },
    { duration: "1 Year", price: "2500 Tk", link: "https://dash.zinipay.com/exe-elite/product/123-dummy" },
    { duration: "Lifetime", price: "3000 Tk", link: "https://dash.zinipay.com/exe-elite/product/123-dummy" }
  ],
  "Streamer Panel": [
    { duration: "1 Month", price: "1000 Tk", link: "https://dash.zinipay.com/exe-elite/product/456-dummy" },
    { duration: "1 OB", price: "1800 Tk", link: "https://dash.zinipay.com/exe-elite/product/456-dummy" },
    { duration: "1 Year", price: "6000 Tk", link: "https://dash.zinipay.com/exe-elite/product/456-dummy" },
    { duration: "Lifetime", price: "8000 Tk", link: "https://dash.zinipay.com/exe-elite/product/456-dummy" }
  ]
  
};

let currentSelectedProduct = "";

// Selection Popup Functions
window.openSelectionPopup = function (productName) {
  const popup = document.getElementById('selectionPopup');
  const title = document.getElementById('selectionProductTitle');
  const container = document.getElementById('selectionOptionsContainer');

  if (!popup || !productPlans[productName]) return;

  currentSelectedProduct = productName;
  title.textContent = `Select Plan for ${productName}`;

  container.innerHTML = "";
  productPlans[productName].forEach(plan => {
    const option = document.createElement('a');
    option.href = plan.link;
    option.target = "_blank";
    option.className = "selection-option";
    option.innerHTML = `
      <div class="selection-info">
        <h4>${plan.duration}</h4>
        <p>Instant Access</p>
      </div>
      <div class="selection-price">${plan.price}</div>
    `;
    container.appendChild(option);
  });

  popup.style.display = 'flex';
  popup.offsetHeight;
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeSelectionPopup = function () {
  const popup = document.getElementById('selectionPopup');
  if (popup) {
    popup.classList.remove('active');
    setTimeout(() => {
      popup.style.display = 'none';
      if (!document.getElementById('contactPopup')?.classList.contains('active')) {
        document.body.style.overflow = '';
      }
    }, 300);
  }
};

// 3D Tilt Effect Logic
function initTiltEffect() {
  const tiltElements = document.querySelectorAll('.project-card, .skill-category, .language-badge, .floating-card, .product-card, .feature');
  tiltElements.forEach(el => {
    if (!el.querySelector('.tilt-glare')) {
      const glare = document.createElement('div');
      glare.className = 'tilt-glare';
      el.appendChild(glare);
    }
    el.addEventListener('mousemove', handleTilt);
    el.addEventListener('mouseleave', resetTilt);
  });
}

function handleTilt(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;
  const glare = el.querySelector('.tilt-glare');
  const glareX = (x / rect.width) * 100;
  const glareY = (y / rect.height) * 100;
  el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  if (glare) {
    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3), transparent 60%)`;
    glare.style.opacity = '1';
  }
}

function resetTilt(e) {
  const el = e.currentTarget;
  const glare = el.querySelector('.tilt-glare');
  el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  if (glare) glare.style.opacity = '0';
}

// Typing animation
const typingText = document.querySelector(".typing-text");
const texts = ["Premium Free Fire Cheat", "Antiban Protection", "Main ID Safe", "ESP & Aimbot", "Lifetime Updates"];
let textIndex = 0, charIndex = 0, isDeleting = false, typingDelay = 150;

function typeText() {
  const currentText = texts[textIndex];
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 150;
  }
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingDelay = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingDelay = 500;
  }
  setTimeout(typeText, typingDelay);
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  initTiltEffect();
  setTimeout(typeText, 1000);

  // Track selected product
  document.querySelectorAll(".product-card .buy-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      currentSelectedProduct = this.closest('.product-card').querySelector('h3').textContent.trim();
    });
  });

  // Hook into the dynamic Online Buy button
  const originalOpenContactPopup = window.openContactPopup;
  window.openContactPopup = function () {
    originalOpenContactPopup();
    setTimeout(() => {
      const popupOptions = document.querySelector("#contactPopup .contact-options");
      if (!popupOptions) return;
      const checkBtn = setInterval(() => {
        const onlineBuyBtn = popupOptions.querySelector(".bkash-direct-option");
        if (onlineBuyBtn) {
          clearInterval(checkBtn);
          if (productPlans[currentSelectedProduct]) {
            onlineBuyBtn.removeAttribute('href');
            onlineBuyBtn.style.cursor = "pointer";
            onlineBuyBtn.onclick = (e) => {
              e.preventDefault();
              closeContactPopup();
              setTimeout(() => openSelectionPopup(currentSelectedProduct), 400);
            };
          }
        }
      }, 100);
      setTimeout(() => clearInterval(checkBtn), 3000);
    }, 100);
  };

  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Close popups on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeContactPopup();
    closeSelectionPopup();
  }
});

