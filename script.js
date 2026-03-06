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
   { duration: "1 Day", price: "55 Tk", link: "https://dash.zinipay.com/exe-elite/product/58f2eacc-76ff-4ce8-a25e-4eb5d73d314a" },
   { duration: "3 Days", price: "150 Tk", link: "https://dash.zinipay.com/exe-elite/product/0b406e53-9ed0-438b-a036-06350c8e511a" },
    { duration: "7 Days", price: "300 Tk", link: "https://dash.zinipay.com/exe-elite/product/99a55974-026b-4bef-b398-96735ee25568" },
    { duration: "1 Month", price: "600 Tk", link: "https://dash.zinipay.com/exe-elite/product/965245ea-c5bd-4e20-b0fe-9bb6b5e55e89" },
    { duration: "1 OBB", price: "1100 Tk", link: "https://dash.zinipay.com/exe-elite/product/f818e472-e877-4451-a159-5413358f15b1" },
    { duration: "Lifetime", price: "3000 Tk", link: "https://dash.zinipay.com/exe-elite/product/eef129d8-29f4-40cd-977c-8cd560b537b1" }
  ],
  "Aimbot Ai": [
   { duration: "1 Day", price: "30 Tk", link: "https://dash.zinipay.com/exe-elite/product/351012af-7185-4cdb-bddc-ba0e533294dd" },
    { duration: "3 Days", price: "80 Tk", link: "https://dash.zinipay.com/exe-elite/product/7c4c39bd-6a31-40dc-992b-58b598dec435" },
    { duration: "7 Days", price: "150 Tk", link: "https://dash.zinipay.com/exe-elite/product/3883e318-57ad-47e8-9de0-1aca2436798e" },
    { duration: "1 Month", price: "450 Tk", link: "https://dash.zinipay.com/exe-elite/product/bec46d3e-7db4-4cac-a00c-69b12d846a26" },
    { duration: "1 OBB", price: "800 Tk", link: "https://dash.zinipay.com/exe-elite/product/f36b2447-c0bd-492e-adda-cc15a951ea78" },
    { duration: "Lifetime", price: "3000 Tk", link: "https://dash.zinipay.com/exe-elite/product/c58dfda3-e259-446b-8a4e-206bcf9d42f7" }
  ],
  "Streamer Panel": [
   { duration: "1 Month", price: "1000 Tk", link: "https://dash.zinipay.com/exe-elite/product/145621c0-79bc-41bb-bf39-f7fb28edeabe" },
    { duration: "1 OB", price: "1800 Tk", link: "https://dash.zinipay.com/exe-elite/product/2976c963-3877-46a2-ac29-9fda81bcc231" },
    { duration: "1 Year", price: "6000 Tk", link: "https://dash.zinipay.com/exe-elite/product/289127ed-16fc-441e-a345-c46df2b533b8" },
    { duration: "Lifetime", price: "8000 Tk", link: "https://dash.zinipay.com/exe-elite/product/ab2d8fc7-e23d-46b2-bb3e-d3b8ba7cacfe" }
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

