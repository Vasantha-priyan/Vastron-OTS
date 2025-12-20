// Contact Form JavaScript - Form validation and submission

class ContactForm {
    constructor() {
        this.form = null;
        this.init();
    }
    
    init() {
        // Wait for form to be added to the DOM
        document.addEventListener('DOMContentLoaded', () => {
            this.form = document.getElementById('contactForm');
            if (this.form) {
                this.setupEventListeners();
            }
        });
    }
    
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Real-time validation
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            field.addEventListener('input', () => {
                // Clear error when user starts typing
                this.clearFieldError(field);
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, `${this.capitalize(fieldName)} is required`);
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            if (!this.validateEmail(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        this.clearFieldError(field);
        return true;
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    async handleSubmit() {
        try {
            // Validate all fields
            const fields = this.form.querySelectorAll('input, textarea');
            let isValid = true;
            
            fields.forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                return;
            }
            
            // Get form data
            const formData = {
                name: this.form.querySelector('#name').value.trim(),
                email: this.form.querySelector('#email').value.trim(),
                message: this.form.querySelector('#message').value.trim(),
                timestamp: new Date().toISOString()
            };
            
            // Disable submit button
            const submitButton = this.form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission (replace with actual API call)
            await this.submitForm(formData);
            
            // Show success message
            this.showSuccess();
            
            // Reset form
            this.resetForm();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('Failed to send message. Please try again or email us directly at support@vastorn.com');
        } finally {
            // Re-enable submit button
            const submitButton = this.form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }
    }
    
    async submitForm(formData) {
        // Submit to backend API
        const API_URL = 'http://localhost:3000/api/contact'; // Change to your production URL
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok || !data.success) {
            throw new Error(data.error || 'Form submission failed');
        }
        
        return data;
    }
    
    showSuccess() {
        const successDiv = document.querySelector('.form-success');
        if (successDiv) {
            successDiv.hidden = false;
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(10px)';
            
            // Animate in
            setTimeout(() => {
                successDiv.style.transition = 'opacity 0.3s, transform 0.3s';
                successDiv.style.opacity = '1';
                successDiv.style.transform = 'translateY(0)';
            }, 10);
            
            // Hide after 5 seconds
            setTimeout(() => {
                successDiv.hidden = true;
            }, 5000);
        }
    }
    
    showError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.form-error');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            this.form.insertBefore(errorDiv, this.form.firstChild);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
    
    resetForm() {
        this.form.reset();
        
        // Clear all error states
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            this.clearFieldError(field);
        });
    }
    
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize contact form
new ContactForm();
