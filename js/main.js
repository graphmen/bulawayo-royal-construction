/**
 * BULAWAYO ROYAL CONSTRUCTION
 * Main Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    // Close when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // 2. Sticky Navbar on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Portfolio Category Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      galleryCards.forEach(card => {
        if (filterValue === 'all' || card.dataset.category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 4. Lightbox Modal for Project Photos
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.gallery-thumb-wrap img');
      const title = card.querySelector('.gallery-title')?.textContent || '';
      const location = card.querySelector('.gallery-location')?.textContent || '';

      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
        if (lightboxCaption) {
          lightboxCaption.textContent = `${title} (${location})`;
        }
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal?.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // 5. Contact Form Submission Handling
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cf-name')?.value || '';
      const phone = document.getElementById('cf-phone')?.value || '';
      const email = document.getElementById('cf-email')?.value || '';
      const service = document.getElementById('cf-service')?.value || '';
      const location = document.getElementById('cf-location')?.value || '';
      const message = document.getElementById('cf-message')?.value || '';

      // Construct WhatsApp message
      const text = `Hello Bulawayo Royal Construction,\n\n*NEW INQUIRY VIA WEBSITE*\n• *Client Name:* ${name}\n• *Phone:* ${phone}\n• *Email:* ${email}\n• *Service Needed:* ${service}\n• *Site Location:* ${location}\n• *Project Scope / Details:* ${message}\n\n_Do it right the first time and have peace of mind._`;

      const whatsappUrl = `https://wa.me/263772990134?text=${encodeURIComponent(text)}`;

      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Offer direct WhatsApp open
      window.open(whatsappUrl, '_blank');
      contactForm.reset();
    });
  }

  // 6. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 7. Client Logo PNG Downloader (Canvas generator)
  window.downloadLogoPng = function(svgPath, fileName, size = 1024) {
    fetch(svgPath)
      .then(res => res.text())
      .then(svgText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgEl = xmlDoc.documentElement;
        
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobURL = URL.createObjectURL(svgBlob);

        img.onload = function() {
          ctx.drawImage(img, 0, 0, size, size);
          const pngUrl = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(blobURL);
        };
        img.src = blobURL;
      })
      .catch(err => {
        console.error('Error exporting PNG:', err);
        window.open(svgPath, '_blank');
      });
  };
});
