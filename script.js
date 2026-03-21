// Menu Toggle per Mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function closeMenu() {
    navMenu.classList.remove('active');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
    navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && navMenu) {
    navToggle.setAttribute('aria-controls', 'navMenu');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Apri menu di navigazione');

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');

        const spans = navToggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            navToggle.setAttribute('aria-expanded', 'true');
        } else {
            closeMenu();
        }
    });

    // Chiudi menu quando si clicca su un link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Chiudi menu con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
            navToggle.focus();
        }
    });
}

// Smooth scroll per i link interni
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Header shadow on scroll + scroll-to-top button
const header = document.querySelector('.header');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (header) {
        header.style.boxShadow = window.scrollY > 50
            ? '0 4px 12px rgba(0, 0, 0, 0.15)'
            : '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Fade-in on scroll via IntersectionObserver
const FADE_IN_THRESHOLD = 0.12;
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: FADE_IN_THRESHOLD });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Form validation helpers
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[\d\s\+\-\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 9;
}

// Export per uso in altre pagine
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail, validatePhone };
}

// Monitoraggio Click sul Telefono (Globale)
document.addEventListener('DOMContentLoaded', function() {
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

    // Traccia click WhatsApp
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'contact', {
                    'method': 'WhatsApp',
                    'event_label': 'Click WhatsApp'
                });
            }
        });
    });
});
