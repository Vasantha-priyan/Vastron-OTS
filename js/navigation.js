// Navigation JavaScript - Navigation and scroll handling

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        this.hamburger = document.getElementById('hamburger');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.sections = document.querySelectorAll('section[id]');
        
        this.init();
    }
    
    init() {
        // Set up smooth scroll for navigation links
        this.setupSmoothScroll();
        
        // Set up mobile menu toggle
        this.setupMobileMenu();
        
        // Set up scroll spy for active section highlighting
        this.setupScrollSpy();
        
        // Set up install button handlers
        this.setupInstallButtons();
    }
    
    setupSmoothScroll() {
        // Desktop navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.smoothScrollTo(targetId);
            });
        });
        
        // Mobile navigation links
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.smoothScrollTo(targetId);
                this.closeMobileMenu();
            });
        });
    }
    
    smoothScrollTo(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbarHeight = this.navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenu.contains(e.target) && 
                !this.hamburger.contains(e.target) && 
                this.mobileMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.mobileMenu.classList.remove('active');
    }
    
    setupScrollSpy() {
        // Use Intersection Observer for better performance
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    this.highlightActiveSection(sectionId);
                }
            });
        }, observerOptions);
        
        // Observe all sections
        this.sections.forEach(section => {
            observer.observe(section);
        });
        
        // Fallback for browsers without Intersection Observer
        if (!('IntersectionObserver' in window)) {
            window.addEventListener('scroll', this.handleScrollFallback.bind(this));
        }
    }
    
    highlightActiveSection(sectionId) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    handleScrollFallback() {
        // Fallback scroll handler for browsers without Intersection Observer
        let currentSection = '';
        const navbarHeight = this.navbar.offsetHeight;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            this.highlightActiveSection(currentSection);
        }
    }
    
    setupInstallButtons() {
        const installButtons = document.querySelectorAll('#installBtn, #heroInstallBtn');
        
        installButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Placeholder for Chrome Web Store link
                // TODO: Replace with actual Chrome Web Store URL when available
                alert('Chrome Web Store link will be added here. Please add the extension URL later.');
                // window.open('CHROME_WEB_STORE_URL', '_blank');
            });
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
