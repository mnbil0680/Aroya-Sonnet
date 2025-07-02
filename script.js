// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    navLinks.classList.toggle("active");
});

// FAQ accordion
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains("active");

        // Close all other FAQ items
        document.querySelectorAll(".faq-item").forEach((item) => {
            item.classList.remove("active");
            const btn = item.querySelector(".faq-question");
            btn.setAttribute("aria-expanded", "false");
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add("active");
            question.setAttribute("aria-expanded", "true");
        }
    });
});

// Search form submission
const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);

    // Basic validation
    const destination = formData.get("destination");
    const departureDate = formData.get("departure-date");
    const duration = formData.get("duration");
    const guests = formData.get("guests");

    if (!destination || !departureDate || !duration || !guests) {
        alert("يرجى ملء جميع الحقول المطلوبة");
        return;
    }

    // Simulate search results
    alert(
        `تم البحث عن رحلة إلى ${destination} لمدة ${duration} لعدد ${guests} في تاريخ ${departureDate}`
    );
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            // Close mobile menu after click
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});

// Gallery item click handler
document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
        alert("عذراً، المعرض قيد التطوير. سيتم إضافة الصور قريباً!");
    });

    // Keyboard support for gallery items
    item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            item.click();
        }
    });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.style.transform = "translateY(-100%)";
    } else {
        navbar.style.transform = "translateY(0)";
    }
    lastScrollY = window.scrollY;
});

// Add loading states for better UX
document.addEventListener("DOMContentLoaded", () => {
    // Add loaded class to body for any CSS animations
    document.body.classList.add("loaded");

    // Set minimum date for departure date input
    const departureDateInput = document.getElementById("departure-date");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    departureDateInput.min = tomorrow.toISOString().split("T")[0];
});

// Enhanced keyboard navigation
document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
    }
});

// Intersection Observer for animations (performance-friendly)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
});
