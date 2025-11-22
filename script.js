// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section (disabled on mobile)
window.addEventListener('scroll', function() {
    // Only apply parallax on desktop screens (width > 768px)
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    } else {
        // On mobile, keep hero section fixed
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = 'translateY(0)';
        }
    }
});

// Ensure hero section is fixed on mobile on page load
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = 'translateY(0)';
        }
    }
});

// Add animation to service cards on hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add animation to contact cards
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Phone number formatting
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Optional: Add analytics or tracking here
        console.log('Phone number clicked:', this.getAttribute('href'));
    });
});

// Email link handling
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Optional: Add analytics or tracking here
        console.log('Email clicked:', this.getAttribute('href'));
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Language Switcher
let currentLang = localStorage.getItem('language') || 'ar';

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    const html = document.getElementById('htmlRoot');
    const allElements = document.querySelectorAll('[data-ar], [data-en]');
    
    if (lang === 'en') {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        document.title = 'Sanaa Comprehensive Construction Company - We Build Dreams';
        
        // Switch Bootstrap to LTR
        let bootstrapLink = document.querySelector('link[href*="bootstrap"]');
        if (bootstrapLink) {
            const newLink = document.createElement('link');
            newLink.rel = 'stylesheet';
            newLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
            newLink.id = 'bootstrap-css';
            bootstrapLink.parentNode.replaceChild(newLink, bootstrapLink);
        }
        
        allElements.forEach(element => {
            if (element.hasAttribute('data-en')) {
                const enText = element.getAttribute('data-en');
                if (enText) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = enText;
                    } else {
                        element.textContent = enText;
                    }
                }
            }
        });
        
        // Update language switcher button
        const langSwitch = document.getElementById('langSwitch');
        if (langSwitch) {
            langSwitch.setAttribute('data-lang', 'en');
            const span = langSwitch.querySelector('span');
            if (span) {
                span.textContent = 'العربية';
            }
        }
    } else {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        document.title = 'شركة صنعة الإعمار الشامل - نحن صناع الأحلام';
        
        // Switch Bootstrap to RTL
        let bootstrapLink = document.querySelector('link[href*="bootstrap"]');
        if (bootstrapLink) {
            const newLink = document.createElement('link');
            newLink.rel = 'stylesheet';
            newLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css';
            newLink.id = 'bootstrap-css';
            bootstrapLink.parentNode.replaceChild(newLink, bootstrapLink);
        }
        
        allElements.forEach(element => {
            if (element.hasAttribute('data-ar')) {
                const arText = element.getAttribute('data-ar');
                if (arText) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = arText;
                    } else {
                        element.textContent = arText;
                    }
                }
            }
        });
        
        // Update language switcher button
        const langSwitch = document.getElementById('langSwitch');
        if (langSwitch) {
            langSwitch.setAttribute('data-lang', 'ar');
            const span = langSwitch.querySelector('span');
            if (span) {
                span.textContent = 'English';
            }
        }
    }
    
    // Update gallery modal title if modal is open
    if (typeof galleryModal !== 'undefined' && galleryModal && galleryModal._isShown) {
        const modalTitle = document.getElementById('projectGalleryModalLabel');
        if (modalTitle && typeof currentProjectIndex !== 'undefined' && projects && projects[currentProjectIndex]) {
            modalTitle.textContent = projects[currentProjectIndex].title[lang];
        }
    }
    
    // Reinitialize AOS after language switch
    setTimeout(() => {
        AOS.refresh();
    }, 100);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    switchLanguage(currentLang);
    
    // Language switcher button event
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.addEventListener('click', function() {
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            switchLanguage(newLang);
        });
    }
});

// Project Gallery Modal
const projects = [
    {
        image: 'project_image/1.png',
        title: {
            ar: 'منتجع الهزم السياحي .. زليتن',
            en: 'Al-Hazm Tourist Resort .. Zliten'
        }
    },
    {
        image: 'project_image/2.png',
        title: {
            ar: 'متحف السرايا ... طرابلس',
            en: 'Al-Saraya Museum ... Tripoli'
        }
    },
    {
        image: 'project_image/3.png',
        title: {
            ar: 'شركة الصناعة الكهربائية ... بئر التوتة - طرابلس',
            en: 'Electrical Industry Company ... Bir Al-Tuta - Tripoli'
        }
    },
    {
        image: 'project_image/4.png',
        title: {
            ar: 'نادي السلام ... الزاوية',
            en: 'Al-Salam Club ... Al-Zawiya'
        }
    },
    {
        image: 'project_image/5.png',
        title: {
            ar: 'مدرسة المنار الكبرى الدولية ... مصراتة',
            en: 'Al-Manar Al-Kubra International School ... Misrata'
        }
    },
    {
        image: 'project_image/6.png',
        title: {
            ar: '1500م جامع غرناطة .... سرت',
            en: '1500m Granada Mosque .... Sirte'
        }
    }
];

let currentProjectIndex = 0;
let galleryModal;

// Open gallery modal when clicking on project card
function initGallery() {
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            currentProjectIndex = index;
            openGalleryModal(index);
        });
    });
}

function openGalleryModal(index) {
    if (!galleryModal) {
        const galleryModalElement = document.getElementById('projectGalleryModal');
        if (galleryModalElement) {
            galleryModal = new bootstrap.Modal(galleryModalElement, {
                keyboard: true,
                backdrop: true
            });
        }
    }
    
    const project = projects[index];
    const modalTitle = document.getElementById('projectGalleryModalLabel');
    const modalImage = document.getElementById('galleryModalImage');
    
    if (!modalTitle || !modalImage) return;
    
    // Set title based on current language
    const currentLang = localStorage.getItem('language') || 'ar';
    modalTitle.textContent = project.title[currentLang];
    modalTitle.setAttribute('data-ar', project.title.ar);
    modalTitle.setAttribute('data-en', project.title.en);
    
    // Set image
    modalImage.src = project.image;
    modalImage.alt = project.title.ar;
    
    // Update navigation buttons
    updateGalleryNav();
    
    // Show modal
    if (galleryModal) {
        galleryModal.show();
    }
}

function updateGalleryNav() {
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    
    prevBtn.style.display = currentProjectIndex === 0 ? 'none' : 'flex';
    nextBtn.style.display = currentProjectIndex === projects.length - 1 ? 'none' : 'flex';
}

// Navigation buttons
document.getElementById('galleryPrev').addEventListener('click', function(e) {
    e.stopPropagation();
    if (currentProjectIndex > 0) {
        currentProjectIndex--;
        openGalleryModal(currentProjectIndex);
    }
});

document.getElementById('galleryNext').addEventListener('click', function(e) {
    e.stopPropagation();
    if (currentProjectIndex < projects.length - 1) {
        currentProjectIndex++;
        openGalleryModal(currentProjectIndex);
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (galleryModal && galleryModal._isShown) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const isRTL = document.documentElement.dir === 'rtl';
            const isNext = (isRTL && e.key === 'ArrowRight') || (!isRTL && e.key === 'ArrowLeft');
            
            if (isNext && currentProjectIndex < projects.length - 1) {
                currentProjectIndex++;
                openGalleryModal(currentProjectIndex);
            } else if (!isNext && currentProjectIndex > 0) {
                currentProjectIndex--;
                openGalleryModal(currentProjectIndex);
            }
        } else if (e.key === 'Escape') {
            galleryModal.hide();
        }
    }
});

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery modal
    const galleryModalElement = document.getElementById('projectGalleryModal');
    if (galleryModalElement) {
        galleryModal = new bootstrap.Modal(galleryModalElement, {
            keyboard: true,
            backdrop: true
        });
    }
    
    // Initialize gallery click handlers
    initGallery();
});

// Console message
console.log('%cشركة صنعة الإعمار الشامل', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cنحن صناع الأحلام', 'color: #B8860B; font-size: 14px;');

