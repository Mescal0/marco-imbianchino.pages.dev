// Menu Toggle per Mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

        // Animazione hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Chiudi menu quando si clicca su un link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Smooth scroll per i link interni
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header shadow on scroll
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .feature, .testimonial-card, .faq-item, .service-detail, .portfolio-item, .contact-item');
    
    if (!revealElements.length) return;

    revealElements.forEach(el => el.classList.add('reveal'));

    let revealCounter = 0;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = revealCounter * 80;
                revealCounter++;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\+\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 9;
}

// Export per uso in altre pagine
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail, validatePhone };
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Scroll Reveal
    initScrollReveal();

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            // Chiudi tutti
            faqQuestions.forEach(function(q) {
                q.setAttribute('aria-expanded', 'false');
                const ans = document.getElementById(q.getAttribute('aria-controls'));
                if (ans) ans.classList.remove('open');
            });
            // Apri quello cliccato se era chiuso
            if (!expanded) {
                this.setAttribute('aria-expanded', 'true');
                const answer = document.getElementById(this.getAttribute('aria-controls'));
                if (answer) answer.classList.add('open');
            }
        });
    });

    // Monitoraggio Click sul Telefono (Globale)
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'contact', {
                    'method': 'Phone',
                    'event_label': 'Chiamata Diretta'
                });
            }
        });
    });

    // Filtro Portfolio
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');

                const category = btn.dataset.category;
                portfolioItems.forEach(item => {
                    item.style.display =
                        (category === 'tutti' || item.dataset.category === category)
                            ? 'block'
                            : 'none';
                });

                if (typeof gtag === 'function') {
                    gtag('event', 'select_content', {
                        'content_type': 'portfolio_category',
                        'item_id': btn.dataset.category
                    });
                }
            });
        });
    }

    // Gestione messaggio successo - pagina Contatti
    const contactSuccess = document.getElementById('contactSuccess');
    const contactForm = document.getElementById('contactForm');
    if (contactSuccess && contactForm) {
        if (window.location.search.indexOf('inviato=1') !== -1) {
            contactForm.style.display = 'none';
            contactSuccess.style.display = 'block';
        } else {
            contactForm.addEventListener('submit', function() {
                if (typeof gtag === 'function') {
                    gtag('event', 'generate_lead', {
                        'method': 'ContactForm',
                        'event_label': 'Modulo Contatti'
                    });
                }
            });
        }
    }

    // Monitoraggio click pulsanti servizi
    document.querySelectorAll('.service-detail .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'select_content', {
                    'content_type': 'servizio_button',
                    'item_id': this.textContent.trim()
                });
            }
        });
    });
});
