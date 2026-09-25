const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Hide loading screen
window.addEventListener("load", () => {
    const loader = $("#loader");
    if (loader) {
        setTimeout(() => {
            loader.style.display = "none";
        }, 400);
    }
});

// Typing effect
const typing = $("#typing");
const roles = [
    "Full-Stack Developer",
    "Web Developer",
    "Problem Solver",
    "Tech Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typing) return;

    const role = roles[roleIndex];

    if (!deleting) {
        typing.textContent = role.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === role.length) {
            deleting = true;
            setTimeout(typeEffect, 1300);
            return;
        }
    } else {
        typing.textContent = role.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 55 : 95);
}

typeEffect();

// Dark / light mode
const theme = $("#theme");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

if (theme) {
    theme.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";

    theme.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        theme.textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    });
}

// Mobile menu
const menu = $("#menu");
const nav = $("#nav");

if (menu && nav) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    $$("#nav a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });
    });
}

// Scroll reveal + skill bars
const revealItems = $$(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");

            if (entry.target.id === "skills") {
                $$(".skills i").forEach((bar) => {
                    bar.style.setProperty("--w", `${bar.dataset.w}%`);
                    bar.classList.add("go");
                });
            }

            obs.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("visible"));
}

// Back to top
const topButton = $("#top");

if (topButton) {
    window.addEventListener("scroll", () => {
        topButton.classList.toggle("show", window.scrollY > 400);
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Project demo buttons that intentionally have no real URL
const projectButtons = $$(".pbtn");
projectButtons.forEach((button) => {
    if (button.getAttribute("href") === "#") {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const toast = $("#toast");
            if (!toast) return;
            toast.textContent = "This project demo link will be added soon.";
            toast.style.display = "block";
            setTimeout(() => {
                toast.style.display = "none";
            }, 2000);
        });
    }
});

// Contact form validation
const form = $("#form");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = $("#name");
        const email = $("#email");
        const message = $("#msg");
        const result = $("#result");

        if (!name || !email || !message || !result) return;

        if (!name.value.trim() || !message.value.trim() || !email.value.trim()) {
            result.textContent = "Please fill in all fields.";
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            result.textContent = "Please enter a valid email.";
            return;
        }

        result.textContent = "Form validated successfully ✓";
        form.reset();
    });
}
