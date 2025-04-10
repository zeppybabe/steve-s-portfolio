const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
const styleSwitcher = document.querySelector(".style-switcher");

if (styleSwitcherToggle && styleSwitcher) {
    styleSwitcherToggle.addEventListener("click", () => {
        styleSwitcher.classList.toggle("open");

        // Auto-close after 5 seconds (5000 ms)
        if (styleSwitcher.classList.contains("open")) {
            setTimeout(() => {
                styleSwitcher.classList.remove("open");
            }, 13525); // Adjust timing as needed
        }
    });
}

// Function to Set and Store Active Style
const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    document.cookie = `theme=${color}; path=/; max-age=31536000`; // Store for 1 year
    applyStyle(color);
}

function applyStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}

// Dark Mode Toggle
const dayNight = document.querySelector(".day-night");

if (dayNight) {
    dayNight.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        document.cookie = `darkMode=${document.body.classList.contains("dark")}; path=/; max-age=31536000`;

        dayNight.querySelector("i").classList.toggle("fa-sun");
        dayNight.querySelector("i").classList.toggle("fa-moon");
    });

    // Apply dark mode and theme on page load
    window.addEventListener("load", () => {
        const savedTheme = getCookie("theme");
        if (savedTheme) applyStyle(savedTheme);

        const darkMode = getCookie("darkMode");
        if (darkMode === "true") {
            document.body.classList.add("dark");
            dayNight.querySelector("i").classList.add("fa-sun");
        } else {
            dayNight.querySelector("i").classList.add("fa-moon");
        }
    });
}

// Function to Retrieve Cookie Value
function getCookie(name) {
    let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}