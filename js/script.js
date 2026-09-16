// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');

        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Animated counter for stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate stat numbers
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }

            // Add fade-in animation to cards
            if (entry.target.classList.contains('app-card') ||
                entry.target.classList.contains('feature-card') ||
                entry.target.classList.contains('goal-card')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => observer.observe(stat));

    // Observe cards
    const cards = document.querySelectorAll('.app-card, .feature-card, .goal-card');
    cards.forEach(card => observer.observe(card));
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Log form data (in production, this would be sent to a backend)
        console.log('Form submitted:', formData);

        // Show success message
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');

        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.classList.remove('show');
        }, 5000);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero, .app-hero');

    parallaxElements.forEach(element => {
        if (element) {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
});

// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// =========================================
// Settings Menu Functionality
// =========================================

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsSidebar = document.getElementById('settingsSidebar');
    const settingsOverlay = document.getElementById('settingsOverlay');
    const closeSettingsBtn = document.getElementById('closeSettings');
    const themeToggle = document.getElementById('themeToggle');
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const languageSelect = document.getElementById('languageSelect');
    const body = document.body;

    // 1. Sidebar Toggle
    function openSettings() {
        settingsSidebar.classList.add('active');
        settingsOverlay.classList.add('active');
    }

    function closeSettings() {
        settingsSidebar.classList.remove('active');
        settingsOverlay.classList.remove('active');
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettings);
        closeSettingsBtn.addEventListener('click', closeSettings);
        settingsOverlay.addEventListener('click', closeSettings);
    }

    // 2. Theme Management
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.textContent = 'Dark Mode: OFF';
        themeToggle.classList.remove('active');
    } else {
        // Default is dark
        themeToggle.classList.add('active');
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');

        if (isLight) {
            this.textContent = 'Dark Mode: OFF';
            this.classList.remove('active');
            localStorage.setItem('theme', 'light');
        } else {
            this.textContent = 'Dark Mode: ON';
            this.classList.add('active');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 3. Font Size Management
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.documentElement.style.fontSize = savedFontSize + 'px';
        fontSizeSlider.value = savedFontSize;
    }

    fontSizeSlider.addEventListener('input', function () {
        const size = this.value;
        document.documentElement.style.fontSize = size + 'px';
        localStorage.setItem('fontSize', size);
    });

    // 4. Language Management (Mock)
    languageSelect.addEventListener('change', function () {
        const lang = this.options[this.selectedIndex].text;
        showToast(`Language changed to: ${lang}`, 'info');
    });

    // 5. Utilities
    document.getElementById('checkUpdates').addEventListener('click', function () {
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="util-icon">🔄</span> Checking...';

        setTimeout(() => {
            showToast('You are running the latest version (v2.4.0)', 'success');
            this.innerHTML = '<span class="util-icon">✅</span> Up to date!';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 3000);
        }, 1500);
    });

    const notifBtn = document.getElementById('toggleNotifications');
    notifBtn.addEventListener('click', function () {
        if (this.textContent.includes('ON')) {
            this.innerHTML = '<span class="util-icon">🔕</span> Notifications: OFF';
            showToast('Notifications disabled', 'info');
        } else {
            this.innerHTML = '<span class="util-icon">🔔</span> Notifications: ON';
            showToast('Notifications enabled', 'success');
        }
    });

    document.getElementById('shareBtn').addEventListener('click', function () {
        if (navigator.share) {
            navigator.share({
                title: 'Defencreation',
                text: 'Check out Defencreation - Cybersecurity for everyone!',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            showToast('Link copied to clipboard!', 'success');
        }
    });
});

// =========================================
// Premium Features Logic
// =========================================

// 1. Toast Notification System
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Create Toast Element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Icons based on type
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    // Add to container
    container.appendChild(toast);

    // Animation: Slide In
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400); // Wait for slide out animation
    }, 3000);
}

// 2. Preloader Logic
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Minimum load time of 1s to show off the logo
        setTimeout(() => {
            preloader.classList.add('loaded');
            // Remove from DOM after fade out
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// 3. Typing Text Effect (Hero)
document.addEventListener('DOMContentLoaded', function () {
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = ["Indian Youth", "Your Business", "Future Generations", "Digital India"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Deleting is faster
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Typing speed
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Finished typing phrase
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before new phrase
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing loop
        setTimeout(type, 1000);
    }
});

// Console message
console.log('%c🛡️ Defencreation', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
console.log('%cProtecting and empowering Indian youth in the digital age.', 'color: #2ECC71; font-size: 14px;');
console.log('%cWebsite built with ❤️ for a safer digital India', 'color: #34495E; font-size: 12px;');
