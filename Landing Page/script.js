
// ==================================
// 1. MOBILE NAVIGATION
// ==================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

});

// Close mobile menu after clicking a link

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

    });

});


// ==================================
// 2. NAVBAR SCROLL EFFECT
// ==================================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// ==================================
// 3. SCROLL REVEAL ANIMATION
// ==================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach((element) => {

    revealObserver.observe(element);

});


// ==================================
// 4. ANIMATED STATISTICS COUNTER
// ==================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed = currentTime - startTime;

                const progress = Math.min(elapsed / duration, 1);

                // Smooth ease-out animation

                const easedProgress = 1 - Math.pow(1 - progress, 3);

                const currentValue = Math.floor(
                    easedProgress * target
                );

                counter.textContent = currentValue.toLocaleString("en-IN");

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target.toLocaleString("en-IN");

                }

            }

            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(counter);

        }

    });

}, {
    threshold: 0.7
});

counters.forEach((counter) => {

    counterObserver.observe(counter);

});


// ==================================
// 5. AUTOMATIC COPYRIGHT YEAR
// ==================================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ==================================
// 6. ACTIVE NAVIGATION ON SCROLL
// ==================================

const sections = document.querySelectorAll(
    "section[id]"
);

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            navItems.forEach((link) => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    "#" + entry.target.id
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach((section) => {

    sectionObserver.observe(section);

});
