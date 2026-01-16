/**
 * Common JavaScript utilities shared across all pages
 */

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Navbar scroll hide/show effect
function initNavbarScroll() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    navbar.style.transition = 'transform 0.3s ease-in-out';
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const shouldHide = currentScroll > lastScroll && currentScroll > 100;
        navbar.style.transform = shouldHide ? 'translateY(-100%)' : 'translateY(0)';
        lastScroll = currentScroll;
    });
}

// Topology cards scroll animation (homepage only)
function initTopologyCardsAnimation() {
    const cards = document.querySelectorAll('.topology-card');
    if (cards.length === 0) return;
    
    window.addEventListener('scroll', () => {
        cards.forEach((card) => {
            const cardTop = card.getBoundingClientRect().top;
            const isSticky = cardTop < 100;
            card.style.transform = isSticky ? 'scale(0.95)' : 'scale(1)';
            card.style.opacity = isSticky ? '0.8' : '1';
        });
    });
}

// Form validation (signup page only)
function initSignupForm() {
    const form = document.getElementById('signupForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            systemType: document.getElementById('systemType').value,
            company: document.getElementById('company').value,
            interests: document.getElementById('interests').value
        };
        
        if (!validateEmail(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        if (!validatePhone(formData.phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        console.log('Form submitted:', formData);
        alert('Thank you for your interest! We will contact you shortly to schedule your demo.');
        this.reset();
    });
    
    // Input focus animations
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Select dropdown styling
    const selectElement = document.getElementById('systemType');
    if (selectElement) {
        if (selectElement.value === '') {
            selectElement.style.color = '#CBD5E0';
        }
        
        selectElement.addEventListener('change', function() {
            this.style.color = this.value === '' ? '#CBD5E0' : '#333';
            this.setCustomValidity(this.value === '' ? 'Please select a system type' : '');
        });
        
        selectElement.addEventListener('invalid', function() {
            this.setCustomValidity('Please select a system type');
        });
    }
}

// Validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initNavbarScroll();
    initTopologyCardsAnimation();
    initSignupForm();
});
