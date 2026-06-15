// ===============================
// INITIALIZATION
// ===============================

// AOS (scroll reveal library)
AOS.init({
    duration: 900,
    easing: "ease-in-out",
    once: true,
    offset: 120
});


// ===============================
// CACHED DOM ELEMENTS
// ===============================
const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector(".stats");
const galleryImages = document.querySelectorAll(".gallery-grid img");


// ===============================
// MOBILE NAVIGATION
// ===============================
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.classList.toggle("active");
});

// close menu on link click
navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
    });
});


// ===============================
// STICKY NAVBAR + ACTIVE LINK + PARALLAX
// (optimized single scroll handler)
// ===============================
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // ---------- Sticky Navbar ----------
    if (scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // ---------- Active Section Highlight ----------
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });

    // ---------- Hero Parallax Effect ----------
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollY * 0.4}px`;
    }

    lastScrollY = scrollY;
});


// ===============================
// COUNTER ANIMATION (INTERSECTION OBSERVER)
// ===============================
const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let current = 0;

        const step = target / 120;

        const update = () => {
            current += step;

            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        update();
    });
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, {
    threshold: 0.5
});

if (statsSection) observer.observe(statsSection);


// ===============================
// SMOOTH SCROLL NAVIGATION
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.querySelector(anchor.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ===============================
// FORM UX HANDLING
// ===============================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const button = contactForm.querySelector("button");

        button.innerText = "Sending...";

        setTimeout(() => {
            button.innerText = "Send Message";
            contactForm.reset();
            alert("Message sent successfully!");
        }, 1200);
    });
}


// ===============================
// GALLERY LIGHTBOX
// ===============================
let lightbox = null;

const createLightbox = (imgSrc) => {
    lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");

    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imgSrc}" alt="Gallery Image">
            <span class="close">&times;</span>
        </div>
    `;

    document.body.appendChild(lightbox);

    // close events
    lightbox.addEventListener("click", (e) => {
        if (e.target.classList.contains("lightbox") || e.target.classList.contains("close")) {
            lightbox.remove();
        }
    });
};

// attach click events to gallery images
galleryImages.forEach(img => {
    img.addEventListener("click", () => {
        createLightbox(img.src);
    });
});


// ===============================
// SCROLL REVEAL ENHANCEMENT (fallback micro animation layer)
// ===============================
const revealElements = document.querySelectorAll(".program-card, .glass-card, .impact-box, .stat-card");

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));