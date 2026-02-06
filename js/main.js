/**
 * Glass & Aluminium Installer Website
 * Main JavaScript File
 * 
 * Features:
 * - Mobile menu toggle
 * - Header scroll effect
 * - Image carousel (manual navigation)
 * - Lightbox gallery
 * - Gallery filtering
 * - Lazy loading images
 * - Form validation & handling
 * - File upload preview
 */

(function() {
  'use strict';

  // ========================================
  // DOM Elements
  // ========================================
  const header = document.getElementById('header');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const quoteForm = document.getElementById('quoteForm');
  const formMessage = document.getElementById('formMessage');
  const fileUpload = document.getElementById('fileUpload');
  const fileInput = document.getElementById('photos');
  const fileList = document.getElementById('fileList');

  // ========================================
  // Mobile Menu
  // ========================================
  function initMobileMenu() {
    if (!mobileMenuToggle || !mobileMenu) return;

    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ========================================
  // Header Scroll Effect
  // ========================================
  function initHeaderScroll() {
    if (!header) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // ========================================
  // Image Carousel
  // ========================================
  function initCarousel() {
    const carousel = document.getElementById('featuredCarousel');
    if (!carousel) return;

    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');
    const slides = track.querySelectorAll('.carousel__slide');

    if (slides.length === 0) return;

    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let maxIndex = Math.max(0, slides.length - slidesPerView);

    // Get slides per view based on viewport
    function getSlidesPerView() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    // Create dots
    function createDots() {
      dotsContainer.innerHTML = '';
      const totalDots = Math.ceil(slides.length / slidesPerView);
      
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel__dot');
        if (i === 0) dot.classList.add('carousel__dot--active');
        dot.setAttribute('aria-label', `Go to slide group ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i * slidesPerView));
        dotsContainer.appendChild(dot);
      }
    }

    // Update dots
    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.carousel__dot');
      const activeIndex = Math.floor(currentIndex / slidesPerView);
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('carousel__dot--active', index === activeIndex);
      });
    }

    // Go to specific slide
    function goToSlide(index) {
      maxIndex = Math.max(0, slides.length - slidesPerView);
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      
      const slideWidth = 100 / slidesPerView;
      const offset = currentIndex * slideWidth;
      
      track.style.transform = `translateX(-${offset}%)`;
      updateDots();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        slidesPerView = getSlidesPerView();
        maxIndex = Math.max(0, slides.length - slidesPerView);
        createDots();
        goToSlide(Math.min(currentIndex, maxIndex));
      }, 200);
    });

    // Initialize
    createDots();
    goToSlide(0);

    // Add click handlers for lightbox on carousel images
    const carouselImages = carousel.querySelectorAll('.carousel__image[data-lightbox="true"]');
    carouselImages.forEach((item, index) => {
      item.addEventListener('click', () => {
        const images = Array.from(carouselImages).map(img => ({
          src: img.querySelector('img').src || img.querySelector('img').dataset.src,
          caption: img.querySelector('.carousel__caption')?.textContent || ''
        }));
        openLightbox(images, index);
      });
    });
  }

  // ========================================
  // Lightbox
  // ========================================
  let lightboxImages = [];
  let lightboxCurrentIndex = 0;

  function openLightbox(images, index) {
    if (!lightbox) return;
    
    lightboxImages = images;
    lightboxCurrentIndex = index;
    
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    if (!lightboxImage || lightboxImages.length === 0) return;
    
    const current = lightboxImages[lightboxCurrentIndex];
    lightboxImage.src = current.src;
    lightboxImage.alt = current.caption;
    
    if (lightboxCaption) {
      lightboxCaption.textContent = current.caption;
    }
  }

  function lightboxPrevImage() {
    lightboxCurrentIndex = (lightboxCurrentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightboxImage();
  }

  function lightboxNextImage() {
    lightboxCurrentIndex = (lightboxCurrentIndex + 1) % lightboxImages.length;
    updateLightboxImage();
  }

  function initLightbox() {
    if (!lightbox) return;

    // Close button
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Navigation buttons
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', lightboxPrevImage);
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', lightboxNextImage);
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          lightboxPrevImage();
          break;
        case 'ArrowRight':
          lightboxNextImage();
          break;
      }
    });
  }

  // ========================================
  // Gallery Filter
  // ========================================
  function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (filterButtons.length === 0 || !galleryGrid) return;

    const galleryItems = galleryGrid.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.dataset.filter;

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
        this.classList.add('filter-btn--active');

        // Filter items
        galleryItems.forEach(item => {
          const category = item.dataset.category;
          
          if (filter === 'all' || category === filter) {
            item.style.display = '';
            item.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // Add click handlers for lightbox on gallery items
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        // Get only visible items for lightbox navigation
        const visibleItems = Array.from(galleryItems).filter(i => i.style.display !== 'none');
        const currentVisibleIndex = visibleItems.indexOf(item);
        
        const images = visibleItems.map(i => ({
          src: i.querySelector('img').src || i.querySelector('img').dataset.src,
          caption: i.querySelector('.gallery-item__title')?.textContent || ''
        }));
        
        openLightbox(images, currentVisibleIndex);
      });
    });
  }

  // ========================================
  // Lazy Loading Images
  // ========================================
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
      });
    }
  }

  // ========================================
  // Form Handling
  // ========================================
  function initFormHandling() {
    if (!quoteForm) return;

    // File upload preview
    if (fileInput && fileList) {
      fileInput.addEventListener('change', function() {
        const files = Array.from(this.files);
        
        if (files.length === 0) {
          fileList.innerHTML = '';
          return;
        }

        const fileNames = files.map(file => {
          const size = (file.size / 1024 / 1024).toFixed(2);
          return `<span style="display: block; margin-bottom: 4px;">📎 ${file.name} (${size}MB)</span>`;
        }).join('');

        fileList.innerHTML = fileNames;
      });
    }

    // Drag and drop enhancement
    if (fileUpload && fileInput) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileUpload.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
        });
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        fileUpload.addEventListener(eventName, () => {
          fileUpload.style.borderColor = 'var(--color-accent)';
          fileUpload.style.backgroundColor = 'var(--color-grey-lighter)';
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        fileUpload.addEventListener(eventName, () => {
          fileUpload.style.borderColor = '';
          fileUpload.style.backgroundColor = '';
        });
      });

      fileUpload.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        
        // Trigger change event
        const event = new Event('change');
        fileInput.dispatchEvent(event);
      });
    }

    // Form submission
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const service = document.getElementById('service').value;
      const propertyType = document.getElementById('property-type').value;
      const location = document.getElementById('location').value.trim();

      if (!name || !phone || !email || !service || !propertyType || !location) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate form submission (replace with actual backend)
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        showFormMessage('Thank you! Your quote request has been submitted. We will contact you within 24 hours.', 'success');
        quoteForm.reset();
        if (fileList) fileList.innerHTML = '';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  function showFormMessage(message, type) {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message form-message--${type}`;
    formMessage.classList.remove('hidden');
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Auto-hide success message
    if (type === 'success') {
      setTimeout(() => {
        formMessage.classList.add('hidden');
      }, 10000);
    }
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ========================================
  // Initialize All
  // ========================================
  function init() {
    initMobileMenu();
    initHeaderScroll();
    initCarousel();
    initLightbox();
    initGalleryFilter();
    initLazyLoading();
    initFormHandling();
    initSmoothScroll();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
