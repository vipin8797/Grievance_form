/**
 * Client-side script for Starex Grievance Form
 * Handles validations, character counters, floating buttons, dynamic role inputs, and spinner states.
 * Updated: May 2026
 */
(() => {
    'use strict';

    const forms = document.querySelectorAll(".needs-validation");
    const roleSelect = document.getElementById("role");
    const studentFields = document.getElementById("studentFields");
    const messageInput = document.getElementById("message");
    const charCountSpan = document.getElementById("charCount");
    const fileInput = document.getElementById("evidenceFiles");
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // 1. Real-time character counter
    if (messageInput && charCountSpan) {
        // Initialize if there is pre-existing content (e.g. form recovery)
        charCountSpan.textContent = messageInput.value.length;
        
        messageInput.addEventListener("input", () => {
            charCountSpan.textContent = messageInput.value.length;
        });
    }

    // 2. Client-side evidence files validation (size & count limits)
    if (fileInput) {
        fileInput.addEventListener("change", () => {
            const files = fileInput.files;
            if (files.length > 5) {
                fileInput.setCustomValidity("You can only upload up to 5 files.");
                alert("Error: You can upload a maximum of 5 evidence files at once.");
            } else {
                let sizeExceeded = false;
                const maxSize = 100 * 1024 * 1024; // 100 MB
                for (let i = 0; i < files.length; i++) {
                    if (files[i].size > maxSize) {
                        sizeExceeded = true;
                        break;
                    }
                }
                if (sizeExceeded) {
                    fileInput.setCustomValidity("Each file must be under 100 MB.");
                    alert("Error: Each evidence file must be under 100 MB in size.");
                } else {
                    fileInput.setCustomValidity("");
                }
            }
        });
    }

    // 3. Viewport tracking & click scroll-to-top handler
    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add("show");
            } else {
                scrollToTopBtn.classList.remove("show");
            }
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 4. Role selector toggling (Students Only fields)
    if (roleSelect && studentFields) {
        // Toggle on page load in case of browser autocomplete
        if (roleSelect.value === "student") {
            studentFields.style.display = "block";
        }

        roleSelect.addEventListener("change", function() {
            if (this.value === "student") {
                studentFields.style.display = "block";
            } else {
                studentFields.style.display = "none";
            }
        });
    }

    // 5. Bootstrap validation styling & Submit loading states
    Array.from(forms).forEach(form => {
        form.addEventListener("submit", event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add("was-validated");
            } else {
                form.classList.add("was-validated");
                
                const submitBtn = document.getElementById("submitBtn");
                const submitSpinner = document.getElementById("submitSpinner");
                const btnText = submitBtn ? submitBtn.querySelector(".button-text") : null;
                
                if (submitBtn) {
                    // Prevent multiple submissions with a micro-timeout
                    setTimeout(() => {
                        submitBtn.disabled = true;
                        if (submitSpinner) submitSpinner.classList.remove("d-none");
                        if (btnText) btnText.textContent = "Submitting...";
                    }, 10);
                }
            }
        });
    });
})();
