// Animations JavaScript - Scroll animations and transitions

class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('section, .feature-card, .tutorial-step, .faq-item');
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
    }
    
    setupScrollAnimations() {
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            this.observeElements();
        } else {
            // Fallback: show all elements immediately
            this.animatedElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
    }
    
    observeElements() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    // Optionally unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Set initial state and observe elements
        this.animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});
