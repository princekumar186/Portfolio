// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.background = 'white';
        navMenu.style.padding = '1rem';
        navMenu.style.gap = '1rem';
        navMenu.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.style.display = 'none';
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Portfolio Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill out all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        emailjs.send("service_ofulz0n","template_zvzh75q",{
            name: name,
            email: email,
            subject: subject,
            message: message
        }).then(function(){
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';

        },function(){
            showNotification('Failed to send message', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }, 1500);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;

    if (type === 'success') {
        notification.style.background = '#00D4AA';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = '#FF4757';
        notification.style.color = 'white';
    } else {
        notification.style.background = '#6C63FF';
        notification.style.color = 'white';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;

        if (!email) {
            showNotification('Please enter your email', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        showNotification('Successfully subscribed to our newsletter!', 'success');
        this.reset();
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project and skill cards
document.querySelectorAll('.project-card, .skill-category, .blog-card, .testimonial-card, .education-card, .experience-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Skill Progress Animation
const skillBars = document.querySelectorAll('.skill-progress');
let animated = false;

const skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animated = true;
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease';
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Counter Animation for Stats
const stats = document.querySelectorAll('.stat h3');
let statsAnimated = false;

const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                }, 30);
            });
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Image Lazy Loading
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src || 'images/placeholder.jpg';
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Add Active State to Navigation Links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 5px;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard Navigation
document.addEventListener('keydown', function (e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu) {
        navMenu.style.display = 'none';
    }
});

// Navbar Shadow on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 0) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Back to Top Button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-5px)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
    });
}

createBackToTopButton();

// Initialize AOS-like animations on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio website loaded successfully!');

    // Add any initialization code here
    // Example: Initialize tooltips, set up dynamic content, etc.
});

// Print debugging info (remove in production)
console.log('Portfolio.js loaded successfully');