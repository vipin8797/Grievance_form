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
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");

    // 0. Theme Initialization & Toggling
    const currentTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (currentTheme === "dark") {
        document.documentElement.classList.add("dark");
        if (sunIcon) sunIcon.classList.remove("d-none");
        if (moonIcon) moonIcon.classList.add("d-none");
    } else {
        document.documentElement.classList.remove("dark");
        if (sunIcon) sunIcon.classList.add("d-none");
        if (moonIcon) moonIcon.classList.remove("d-none");
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isDark = document.documentElement.classList.toggle("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            
            if (isDark) {
                if (sunIcon) sunIcon.classList.remove("d-none");
                if (moonIcon) moonIcon.classList.add("d-none");
            } else {
                if (sunIcon) sunIcon.classList.add("d-none");
                if (moonIcon) moonIcon.classList.remove("d-none");
            }
        });
    }

    // 1. Real-time character counter
    if (messageInput && charCountSpan) {
        // Initialize if there is pre-existing content (e.g. form recovery)
        charCountSpan.textContent = messageInput.value.length;
        
        messageInput.addEventListener("input", () => {
            charCountSpan.textContent = messageInput.value.length;
        });
    }

    // 2. Client-side evidence files validation (size & count limits) & List Display
    if (fileInput) {
        fileInput.addEventListener("change", () => {
            const files = fileInput.files;
            const listContainer = document.getElementById("selectedFilesList");
            
            if (listContainer) listContainer.innerHTML = "";

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
                    
                    // Render selected files
                    if (listContainer && files.length > 0) {
                        for (let i = 0; i < files.length; i++) {
                            const file = files[i];
                            const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
                            const fileItem = document.createElement("div");
                            fileItem.className = "selected-file-item";
                            fileItem.innerHTML = `
                                <span class="text-truncate" style="max-width: 80%;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-check-fill text-primary me-2 align-middle" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708"/></svg>${file.name}</span>
                                <span class="text-muted small">${fileSizeMB} MB</span>
                            `;
                            listContainer.appendChild(fileItem);
                        }
                    }
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

    // 4.5. Pincode and Contact Number Interactive Masks
    const pincodeInput = document.getElementById("pincode");
    const contactInput = document.getElementById("contact");

    if (pincodeInput) {
        pincodeInput.addEventListener("input", () => {
            pincodeInput.value = pincodeInput.value.replace(/\D/g, "").slice(0, 6);
        });
    }

    if (contactInput) {
        contactInput.addEventListener("input", () => {
            contactInput.value = contactInput.value.replace(/\D/g, "").slice(0, 10);
        });
    }

    // 4.7. Auto-resizing Textareas (Address and Message)
    const autoResizeTextareas = document.querySelectorAll("textarea");
    autoResizeTextareas.forEach(textarea => {
        textarea.addEventListener("input", function() {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });
    });

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
