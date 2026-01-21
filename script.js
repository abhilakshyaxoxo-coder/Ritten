// script.js - Optimized Vanilla JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const appointmentForm = document.getElementById('appointment-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const newAppointmentBtn = document.getElementById('new-appointment');
    
    // Theme Toggle Functionality
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light-mode';
        document.documentElement.className = savedTheme;
        updateThemeIcon(savedTheme);
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.className;
        const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
        
        document.documentElement.className = newTheme;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add animation feedback
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    }
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light-mode' ? '🌙' : '☀️';
    }
    
    // Mobile Navigation Toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Appointment Form Submission
    function handleAppointmentSubmit(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value;
        const reason = document.getElementById('reason').value;
        
        if (!name || !phone || !email || !date || !reason) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Generate random appointment number (demo only)
        const appointmentNumber = '10' + Math.floor(Math.random() * 10000) + '51';
        
        // Hide form and show confirmation with animation
        appointmentForm.style.opacity = '0';
        appointmentForm.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            appointmentForm.style.display = 'none';
            confirmationMessage.style.display = 'block';
            confirmationMessage.style.opacity = '0';
            confirmationMessage.style.transform = 'translateY(20px)';
            
            // Animate confirmation in
            setTimeout(() => {
                confirmationMessage.style.opacity = '1';
                confirmationMessage.style.transform = 'translateY(0)';
                confirmationMessage.style.transition = 'all 0.6s ease';
            }, 50);
            
            // Scroll to confirmation for better UX
            confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
    
    // New Appointment Button
    function handleNewAppointment() {
        // Animate confirmation out
        confirmationMessage.style.opacity = '0';
        confirmationMessage.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
            
            // Reset form and show it
            appointmentForm.reset();
            appointmentForm.style.display = 'block';
            appointmentForm.style.opacity = '0';
            appointmentForm.style.transform = 'translateY(-20px)';
            
            // Animate form in
            setTimeout(() => {
                appointmentForm.style.opacity = '1';
                appointmentForm.style.transform = 'translateY(0)';
                appointmentForm.style.transition = 'all 0.6s ease';
            }, 50);
            
            // Scroll to form
            appointmentForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Set minimum date to today for appointment form
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // Initialize
    initTheme();
    
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    navToggle.addEventListener('click', toggleMobileMenu);
    appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    newAppointmentBtn.addEventListener('click', handleNewAppointment);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Performance optimization: Lazy load non-critical images (if any were added)
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Add subtle scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.trust-badge, .appointment-container').forEach(el => {
        observer.observe(el);
    });
});
