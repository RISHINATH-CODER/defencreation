// Services page - Learn More functionality
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            const detailsSection = document.getElementById(`${serviceType}-details`);
            const isActive = detailsSection.classList.contains('active');
            
            // Close all other open sections
            document.querySelectorAll('.service-details').forEach(section => {
                section.classList.remove('active');
            });
            
            // Reset all button texts
            document.querySelectorAll('.learn-more-btn').forEach(btn => {
                btn.textContent = 'Learn More';
                btn.classList.remove('active');
            });
            
            // Toggle current section
            if (!isActive) {
                detailsSection.classList.add('active');
                this.textContent = 'Show Less';
                this.classList.add('active');
                
                // Smooth scroll to the card
                setTimeout(() => {
                    this.closest('.service-card').scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            } else {
                detailsSection.classList.remove('active');
                this.textContent = 'Learn More';
                this.classList.remove('active');
            }
        });
    });
    
    // Add animation on scroll for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        // Stagger the animation
        setTimeout(() => {
            observer.observe(card);
        }, index * 50);
    });
});

// Add active state styling for buttons
const style = document.createElement('style');
style.textContent = `
    .learn-more-btn.active {
        background: var(--primary-color);
        color: var(--white);
        border-color: var(--primary-color);
    }
`;
document.head.appendChild(style);
