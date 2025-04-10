// Typed.js for typing animation
var typed = new Typed(".typing", {
    strings: ["", "Web Designer", "Developer", "Graphic Designer", "Programmer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

var typedNames = new Typed(".names", {
    strings: ["", "Steve Padilla-Benitez"],
    typeSpeed: 125,
    fadeOut: true,
    cursorChar: ''
});

// Navigation
const nav = document.querySelector(".nav");
if (nav) {
    const navList = nav.querySelectorAll("li");
    const totalNavList = navList.length;
    const allSection = document.querySelectorAll(".section");
    const totalSection = allSection.length;

    for (let i = 0; i < totalNavList; i++) {
        const a = navList[i].querySelector("a");
        if (!a) continue; // Skip if there's no link

        a.addEventListener("click", function () {
            // Remove 'back-section' from all sections
            allSection.forEach(section => section.classList.remove("back-section"));

            // Remove active class and set back-section properly
            navList.forEach((navItem, j) => {
                const link = navItem.querySelector("a");
                if (link && link.classList.contains("active")) {
                    allSection[j]?.classList.add("back-section");
                }
                if (link) link.classList.remove("active");
            });

            // Add active class to clicked link
            this.classList.add("active");

            // Show the corresponding section
            showSection(this);
        });
    }
}

function showSection(element) {
    const target = element.getAttribute("href").split("#")[1];
    if (!target) return; // Prevent errors if href="#"
    document.querySelectorAll(".section").forEach(section => section.classList.remove("active"));
    document.querySelector("#" + target)?.classList.add("active");
}

// Sidebar Toggle
const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");

if (navTogglerBtn) {
    navTogglerBtn.addEventListener("click", asideSectionTogglerBtn);
}

function asideSectionTogglerBtn() {
    aside?.classList.toggle("open");
    navTogglerBtn?.classList.toggle("open");
    document.querySelectorAll(".section").forEach(section => section.classList.toggle("open"));
}

// Fullscreen Zoom
function change(element) {
    element.classList.toggle("fullsize");
}

// Form Submission Reset - THIS NEEDS TO BE CALLED
formReset();

function formReset() {
    document.getElementById("contactForm").addEventListener("submit", async function(e) {
        e.preventDefault(); // Prevent page reload

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch("/.netlify/functions/submitForm", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert("Message sent!");
                form.reset(); // 🎯 This clears the form
            } else {
                alert("Something went wrong. Try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
    });
}