// ============================================
// ABChugtai Studio - Complete JavaScript
// Mobile Menu + All Features
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // MOBILE MENU - COMPLETE WORKING CODE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
    
    // Mobile menu button click
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle menu
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Prevent body scroll
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            
            console.log('Menu clicked! Active:', navLinks.classList.contains('active'));
        });
    }
    
    // Close menu when overlay clicked
    overlay.addEventListener('click', function() {
        closeMenu();
    });
    
    // Close menu when any nav link clicked
    if (navLinks) {
        const allNavLinks = navLinks.querySelectorAll('a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });
    }
    
    // Close menu function
    function closeMenu() {
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Close menu on window resize (if desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && navLinks && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // ==========================================
    // SCROLL REVEAL ANIMATION
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .logo-card, .website-card, .contact-card, .info-card, .pricing-plan, .testimonial-card, .feature-card, .faq-item, .social-link').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(el);
    });

    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================
    // SKILLS ANIMATION
    // ==========================================
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    if (targetWidth) {
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 200);
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        skillsObserver.observe(skillsContainer);
    }

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    function animateCounters() {
        document.querySelectorAll('.counter').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            if (!target) return;
            
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counters-section, .profile-stats, .stats-bar').forEach(section => {
        counterObserver.observe(section);
    });

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // ==========================================
    // ACTIVE NAV LINK HIGHLIGHT
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // ==========================================
    // MOUSE GLOW EFFECT
    // ==========================================
    document.addEventListener('mousemove', (e) => {
        let glow = document.querySelector('.mouse-glow');
        if (!glow) {
            glow = document.createElement('div');
            glow.className = 'mouse-glow';
            document.body.appendChild(glow);
        }
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    console.log('🔥 ABChugtai Studio - All Systems Ready!');
    console.log('📱 Mobile Menu: Active');
    console.log('🎨 Current Page:', currentPage);
});