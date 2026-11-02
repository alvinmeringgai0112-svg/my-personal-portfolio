// Portfolio JavaScript
// Features: mobile menu, theme switch, project filter, reveal animation,
// active navigation, back-to-top button, current year and contact form.

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");
    const themeToggle = document.getElementById("themeToggle");
    const filterButtons = document.querySelectorAll(".filter-button");
    const projectCards = document.querySelectorAll(".project-card");
    const backToTop = document.getElementById("backToTop");
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    // 1. Mobile navigation menu
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    // Close the mobile menu after a navigation link is selected
    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // 2. Light/dark theme switch (preference is saved in local storage)
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggle.textContent = "☀";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");
        themeToggle.textContent = isDark ? "☀" : "☾";
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    });

    // 3. Filter projects by category
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((item) => item.classList.remove("selected"));
            button.classList.add("selected");

            projectCards.forEach((card) => {
                const matches = selectedFilter === "all" || card.dataset.category === selectedFilter;
                card.classList.toggle("hide", !matches);
            });
        });
    });

    // 4. Reveal elements when they enter the screen
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    // 5. Highlight the navigation link for the current section
    const sections = document.querySelectorAll("main section[id]");
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navItems.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            }
        });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach((section) => sectionObserver.observe(section));

    // 6. Show the back-to-top button after scrolling
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.scrollY > 450);
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 7. Display the current year automatically
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    // 8. Validate the form and prepare an email (front-end only)
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("visitorName").value.trim();
        const email = document.getElementById("visitorEmail").value.trim();
        const message = document.getElementById("visitorMessage").value.trim();

        // Replace this address with your own email address.
        const ownerEmail = "your.email@example.com";
        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        formStatus.textContent = "Your email application should open with the message prepared.";
        window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
    });
});
