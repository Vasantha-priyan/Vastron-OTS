// FAQ JavaScript - FAQ accordion functionality

class FAQAccordion {
    constructor() {
        this.faqContainer = document.getElementById('faqContainer');
        this.init();
    }
    
    init() {
        // Wait for FAQ items to be added to the DOM
        if (this.faqContainer) {
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        // Use event delegation for better performance
        this.faqContainer.addEventListener('click', (e) => {
            const faqQuestion = e.target.closest('.faq-question');
            if (faqQuestion) {
                this.toggleItem(faqQuestion.parentElement);
            }
        });
    }
    
    toggleItem(faqItem) {
        try {
            const answer = faqItem.querySelector('.faq-answer');
            const icon = faqItem.querySelector('.faq-icon');
            const isExpanded = faqItem.classList.contains('active');
            
            if (isExpanded) {
                this.closeItem(faqItem, answer, icon);
            } else {
                this.openItem(faqItem, answer, icon);
            }
        } catch (error) {
            console.error('Error toggling FAQ item:', error);
            // Fallback: toggle display property
            const answer = faqItem.querySelector('.faq-answer');
            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        }
    }
    
    openItem(faqItem, answer, icon) {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
        if (icon) {
            icon.textContent = '×';
        }
        faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
    }
    
    closeItem(faqItem, answer, icon) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        if (icon) {
            icon.textContent = '+';
        }
        faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    }
    
    closeAllItems() {
        const allItems = this.faqContainer.querySelectorAll('.faq-item');
        allItems.forEach(item => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            this.closeItem(item, answer, icon);
        });
    }
}

// Initialize FAQ accordion when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FAQAccordion();
});
