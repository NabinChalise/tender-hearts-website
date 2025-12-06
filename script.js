/* script.js */

// 1. Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    
    // Toggle icon between bars and times
    if(navLinks.classList.contains('nav-active')) {
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// 2. Scroll Animation (Reveal on Scroll)
const revealElements = document.querySelectorAll('.reveal, .program-card, .section-title, .contact-info, .about-img');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            scrollObserver.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.1, 
    rootMargin: "0px 0px -30px 0px"
});

revealElements.forEach(el => {
    el.classList.add('reveal'); 
    scrollObserver.observe(el);
});

// 3. Testimonial Slider (Fixed Lag)
const testimonials = [
    {
        text: "Absolutely the best daycare in Casper! My daughter loves the staff and comes home learning something new every day.",
        author: "Sarah Jenkins"
    },
    {
        text: "The facility is always clean, bright, and welcoming. I feel so safe leaving my son here. The 7 AM start time is a lifesaver!",
        author: "Mike Thompson"
    },
    {
        text: "Tender Hearts truly cares about the children. The preschool curriculum has prepared my child wonderfully for Kindergarten.",
        author: "Emily R."
    }
];

let currentTestimonial = 0;
let slideInterval; // Variable to hold the timer
let isAnimating = false; // Prevent double clicking rapidly

const textEl = document.querySelector('.testimonial-text');
const authorEl = document.querySelector('.testimonial-author');
const dotsContainer = document.querySelector('.dots');

// Create Dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    
    // Pass 'true' to indicate a manual click
    dot.addEventListener('click', () => showTestimonial(index, true));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showTestimonial(index, isManual = false) {
    if (index === currentTestimonial || isAnimating) return;
    
    // If user clicked manually, reset the auto-rotation timer
    if (isManual) {
        resetInterval();
    }

    isAnimating = true;

    // Fade out
    textEl.style.opacity = 0;
    authorEl.style.opacity = 0;
    
    setTimeout(() => {
        currentTestimonial = index;
        textEl.innerText = `"${testimonials[index].text}"`;
        authorEl.innerText = `- ${testimonials[index].author}`;
        
        // Update dots visual
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        // Fade in
        textEl.style.opacity = 1;
        authorEl.style.opacity = 1;
        
        isAnimating = false;
    }, 300); 
}

function nextSlide() {
    let next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next, false);
}

// Function to start/restart timer
function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Function to clear and restart timer (prevents lag on click)
function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

// Start the timer initially
startInterval();

// 4. Form Handling Simulation
function handleForm(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Sending...';
    btn.style.opacity = '0.7';

    setTimeout(() => {
        alert("Thank you! We have received your inquiry and will call you shortly.");
        event.target.reset();
        btn.innerText = originalText;
        btn.style.opacity = '1';
    }, 1500);
}