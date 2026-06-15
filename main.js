// ===============================
// INITIALIZATION
// ===============================
AOS.init({
    duration: 900,
    easing: "ease-in-out",
    once: true,
    offset: 120
});


// ===============================
// DOM ELEMENTS
// ===============================
const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector(".stats");
const galleryImages = document.querySelectorAll(".gallery-grid img");
const contactForm = document.querySelector(".contact-form");
const hero = document.querySelector(".hero");


// ===============================
// MOBILE MENU
// ===============================
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.classList.toggle("active");
});

// close when nav link clicked
navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
    });
});

// close when clicking outside
document.addEventListener("click", (e) => {
    if (
        !menuBtn.contains(e.target) &&
        !navLinks.contains(e.target)
    ) {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
    }
});


// ===============================
// SCROLL EVENTS
// ===============================
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Sticky navbar
    if (scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // Active nav highlighting
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (
            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });

    // Hero parallax
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollY * 0.4}px`;
    }
});


// ===============================
// COUNTER ANIMATION
// ===============================
const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.dataset.target;
        let current = 0;
        const step = target / 100;

        const updateCounter = () => {
            current += step;

            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.disconnect();
        }
    });
}, {
    threshold: 0.5
});

if (statsSection) {
    counterObserver.observe(statsSection);
}


// ===============================
// SMOOTH SCROLL
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// ===============================
// CONTACT FORM
// ===============================
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
galleryImages.forEach(img => {
    img.addEventListener("click", () => {
        const lightbox = document.createElement("div");
        lightbox.classList.add("lightbox");

        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="">
                <span class="close">&times;</span>
            </div>
        `;

        document.body.appendChild(lightbox);

        lightbox.addEventListener("click", (e) => {
            if (
                e.target.classList.contains("lightbox") ||
                e.target.classList.contains("close")
            ) {
                lightbox.remove();
            }
        });
    });
});


// ===============================
// REVEAL ANIMATIONS
// ===============================
const revealElements = document.querySelectorAll(
    ".program-card, .glass-card, .impact-box, .stat-card"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});