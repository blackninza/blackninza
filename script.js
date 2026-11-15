// ============================================
// NAZMUL ISLAM - RED TEAMER PORTFOLIO
// Interactive JavaScript
// ============================================

// Matrix Rain Background (Subtle)
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters (reduced density for professionalism)
const chars = '01';
const charArray = chars.split('');

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize / 3); // Reduced density

// Initialize drops
let drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height / fontSize;
}

// Draw matrix rain (slower, more subtle)
function drawMatrix() {
    ctx.fillStyle = 'rgba(13, 17, 23, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#f85149';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize * 3, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 100);

// Typing Effect
const typingTexts = [
    'Pentester | Bug Hunter | Red Teamer',
    'CVE-2025-47977 Discoverer',
    'Hall of Fame - HackerOne & Bugcrowd',
    '10+ Real-World Security Assessments',
    'Offensive Security Professional'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeText() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

// Start typing effect
setTimeout(typeText, 1000);

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible && bar.style.width === '0px' || bar.style.width === '') {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
animateSkillBars(); // Initial check

// Animate stat numbers
const statNumbers = document.querySelectorAll('.stat-number');

const animateNumbers = () => {
    statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible && !stat.classList.contains('animated')) {
            stat.classList.add('animated');
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        }
    });
};

window.addEventListener('scroll', animateNumbers);
animateNumbers(); // Initial check

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.section-header, .skill-category, .timeline-item, .pentest-card, .achievement-card, .cert-card').forEach(el => {
    observer.observe(el);
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Create mailto link
        const mailtoLink = `mailto:pentester.nazmulislam@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

        window.location.href = mailtoLink;

        // Show success message
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="btn-text">Opening Email Client...</span>';
        btn.style.background = 'var(--accent-green)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 2000);
    });
}

// Add glitch effect on hover for cards
document.querySelectorAll('.pentest-card, .achievement-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// Terminal typing effect for terminal boxes
const terminalOutputs = document.querySelectorAll('.terminal-content code');

terminalOutputs.forEach(output => {
    const originalText = output.innerHTML;
    output.setAttribute('data-original', originalText);
});

// Smooth reveal animations for new sections
const serviceCards = document.querySelectorAll('.service-card, .method-card');
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    serviceObserver.observe(card);
});

// Console message for developers
console.log('%c🔴 RED TEAMER PORTFOLIO', 'color: #ff2d2d; font-size: 24px; font-weight: bold;');
console.log('%cNazmul Islam | Pentester | Bug Hunter | Red Teamer', 'color: #00ff41; font-size: 14px;');
console.log('%cCVE-2025-47977 Discoverer', 'color: #00d4ff; font-size: 12px;');
console.log('%cTry the Konami Code: ↑↑↓↓←→←→BA', 'color: #ffcc00; font-size: 10px;');

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation class to hero elements
    document.querySelector('.hero-text').classList.add('animate-fadeInUp');
});
