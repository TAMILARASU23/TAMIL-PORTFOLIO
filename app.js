document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Navigation & Mobile Menu Handler
       ========================================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle hamburger animation style if needed
            const bars = navToggle.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // Scroll effect - Header highlight
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       Active Link Highlighter on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const scrollObserverOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, scrollObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* ==========================================================================
       Stats Counter Count-up Animation
       ========================================================================== */
    const statsNumbers = document.querySelectorAll('.stat-number, .stat-number-percent');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let current = 0;
        
        // Adjust step sizes for larger numbers (like 5000) to keep speed consistent
        const increment = target > 1000 ? Math.ceil(target / 100) : 1;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = current.toLocaleString();
            }
        }, stepTime);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target); // Run animation only once
            }
        });
    }, { threshold: 0.5 });

    statsNumbers.forEach(num => {
        statsObserver.observe(num);
    });

    /* ==========================================================================
       Scroll Fade-In Effects (Subtle AOS style)
       ========================================================================== */
    const animElements = document.querySelectorAll('.service-card, .timeline-item, .project-card, .education-details-card, .contact-info, .contact-form-container');
    
    // Add fade-prepare style initially
    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    animElements.forEach(el => {
        fadeObserver.observe(el);
    });

    /* ==========================================================================
       Contact Form Submission Handler (EmailJS/Web3Forms + WhatsApp)
       ========================================================================== */
    const contactForm = document.getElementById('portfolioContactForm');
    const btnSubmitEmail = document.getElementById('btnSubmitEmail');
    const btnSubmitWhatsapp = document.getElementById('btnSubmitWhatsapp');
    const formAlert = document.getElementById('formAlert');
    const web3FormsKeyField = document.getElementById('web3FormsKey');
    const btnAlertClose = document.getElementById('btnAlertClose');

    // Load Access Key from LocalStorage if it exists
    const storedAccessKey = localStorage.getItem('web3forms_access_key');
    if (storedAccessKey && web3FormsKeyField) {
        web3FormsKeyField.value = storedAccessKey;
    }

    // Modal elements for config
    const modal = document.getElementById('web3formsConfigModal');
    const tempAccessKeyInput = document.getElementById('tempAccessKeyInput');
    const btnSaveKey = document.getElementById('btnSaveKey');
    const btnCloseModal = document.getElementById('btnCloseModal');

    // Success / Error Alerts Utility
    const showAlert = (message, type) => {
        formAlert.className = `alert-box ${type}`;
        formAlert.querySelector('.alert-message').textContent = message;
        formAlert.classList.remove('hidden-alert');
    };

    if (btnAlertClose) {
        btnAlertClose.addEventListener('click', () => {
            formAlert.classList.add('hidden-alert');
        });
    }

    // Web3Forms Setup Modal Close
    if (btnCloseModal && modal) {
        btnCloseModal.addEventListener('click', () => {
            modal.classList.remove('active');
            modal.classList.add('hidden-modal');
        });
    }

    // Web3Forms Save Access Key from Modal
    if (btnSaveKey && tempAccessKeyInput && modal && web3FormsKeyField) {
        btnSaveKey.addEventListener('click', () => {
            const key = tempAccessKeyInput.value.trim();
            if (key) {
                localStorage.setItem('web3forms_access_key', key);
                web3FormsKeyField.value = key;
                modal.classList.remove('active');
                modal.classList.add('hidden-modal');
                showAlert('Access Key saved! You can now send tests.', 'success');
            } else {
                alert('Please enter a valid Web3Forms access key.');
            }
        });
    }

    // Submit via Web3Forms (Email Notification)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const currentKey = web3FormsKeyField.value;
            // If the key hasn't been set yet, show instructions modal
            if (currentKey === 'YOUR_ACCESS_KEY_HERE') {
                if (modal) {
                    modal.classList.remove('hidden-modal');
                    modal.classList.add('active');
                }
                return;
            }

            // Show loading spinner
            const btnText = btnSubmitEmail.querySelector('.btn-text');
            const btnLoader = btnSubmitEmail.querySelector('.btn-loader');
            btnText.classList.add('hidden-loader');
            btnLoader.classList.remove('hidden-loader');
            btnSubmitEmail.disabled = true;

            const formData = new FormData(contactForm);
            
            // Post via fetch API to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    showAlert('Thank you! Your inquiry was sent successfully. Tamil will get back to you shortly.', 'success');
                    contactForm.reset();
                    // Keep the saved key
                    if (storedAccessKey) {
                        web3FormsKeyField.value = storedAccessKey;
                    }
                } else {
                    console.log(response);
                    showAlert(json.message || 'Form submission failed. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.log(error);
                showAlert('Network error occurred. Please try sending via WhatsApp instead.', 'error');
            })
            .finally(() => {
                // Restore submit buttons
                btnText.classList.remove('hidden-loader');
                btnLoader.classList.add('hidden-loader');
                btnSubmitEmail.disabled = false;
            });
        });
    }

    // Submit via WhatsApp Direct message
    if (btnSubmitWhatsapp && contactForm) {
        btnSubmitWhatsapp.addEventListener('click', () => {
            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const service = document.getElementById('formMarketplace').value;
            const message = document.getElementById('formMessage').value.trim();

            if (!name || !email || !message) {
                showAlert('Please fill in Name, Email, and Message fields to submit to WhatsApp.', 'error');
                
                // Highlight fields
                if (!name) document.getElementById('formName').focus();
                else if (!email) document.getElementById('formEmail').focus();
                else if (!message) document.getElementById('formMessage').focus();
                return;
            }

            // Construct Tamil's WhatsApp Link
            // Number: +919487676941 (Tamil)
            const whatsappNumber = '919487676941';
            
            // Format message neatly with emojis and formatting
            const whatsappText = 
`*New Portfolio Inquiry*
--------------------------------
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone || 'Not Provided'}
*Service/Marketplace:* ${service}
*Message:* ${message}
--------------------------------
_Sent from Tamilarasu's E-Commerce Portfolio_`;

            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappText)}`;
            
            // Open in new tab
            window.open(whatsappUrl, '_blank');
        });
    }
});
