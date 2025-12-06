/* script.js */

// 1. Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    // Animate Burger Icon change (Optional simple toggle)
    hamburger.innerHTML = navLinks.classList.contains('nav-active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
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
            // Stop observing once revealed (optional)
            scrollObserver.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    el.classList.add('reveal'); // Add base class via JS to ensure they are visible if JS fails
    scrollObserver.observe(el);
});

// 3. Testimonial Slider
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
const textEl = document.querySelector('.testimonial-text');
const authorEl = document.querySelector('.testimonial-author');
const dotsContainer = document.querySelector('.dots');

// Initialize Dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTestimonial(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    // Fade out
    textEl.style.opacity = 0;
    authorEl.style.opacity = 0;
    
    setTimeout(() => {
        currentTestimonial = index;
        textEl.innerText = `"${testimonials[index].text}"`;
        authorEl.innerText = `- ${testimonials[index].author}`;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        // Fade in
        textEl.style.opacity = 1;
        authorEl.style.opacity = 1;
    }, 300); // Wait for fade out
}

// Auto rotate every 5 seconds
setInterval(() => {
    let next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
}, 5000);

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