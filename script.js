// Navigation Active Link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.content-card, .project-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Counter Animation for Skills
window.addEventListener('scroll', () => {
    const skillElements = document.querySelectorAll('.skill-progress');
    
    skillElements.forEach(skill => {
        const skillSection = skill.closest('.section');
        if (skillSection && isInViewport(skillSection)) {
            const width = skill.style.width;
            if (width && !skill.classList.contains('animated')) {
                skill.style.width = '0';
                setTimeout(() => {
                    skill.style.width = width;
                    skill.classList.add('animated');
                }, 100);
            }
        }
    });
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(10, 10, 21, 0.95)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 21, 0.9)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    }
});

// Parallax Effect on Hero
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroStars = document.querySelector('.stars');
        if (heroStars && scrollPosition < window.innerHeight) {
            heroStars.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

// Mobile Responsive Menu
function handleWindowResize() {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
}

window.addEventListener('resize', handleWindowResize);

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Typing Animation
const typingSpan = document.querySelector('.typing-text span');
const words = [" web designer", " web developer", " UI/UX designer"," Student"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
let cursorVisible = true;

function blinkCursor() {
    cursorVisible = !cursorVisible;
    const currentWord = words[wordIndex];
    let text = isDeleting ? currentWord.substring(0, charIndex) : currentWord.substring(0, charIndex);
    typingSpan.textContent = text + (cursorVisible ? '|' : '');
}

function typeWriter() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
        typingSpeed = 100;
    } else {
        charIndex++;
        typingSpeed = 150;
    }

    let text = currentWord.substring(0, charIndex);
    typingSpan.textContent = text + '|';

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before next word
    }

    setTimeout(typeWriter, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        typeWriter();
        setInterval(blinkCursor, 500); // Blink cursor every 500ms
    }, 1000); // Delay start by 1 second
});



// Initialize
console.log('Profile Portfolio Loaded Successfully! 🚀');
