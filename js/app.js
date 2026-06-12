document.addEventListener("DOMContentLoaded"[span_25](start_span)[span_25](end_span), () => {
    initializeCarousel();
    initializeFormValidator();
});

/* ==========================================================================
   1. شريط الصور التفاعلي الدوار (Dynamic Image Carousel)
   ========================================================================== */
function initializeCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const carouselContainer = document.querySelector(".hero-carousel");
    
    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 5000; // المؤقت الزمني المعتمد للتحول (5 ثوانٍ)

    if (!slides.length) return;

    function updateSlides(index) {
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;

        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
    }

    function nextSlide() {
        updateSlides(currentIndex + 1);
    }

    function prevSlide() {
        updateSlides(currentIndex - 1);
    }

    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
        clearInterval(slideInterval);
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            updateSlides(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    carouselContainer.addEventListener("mouseenter", stopAutoPlay);
    carouselContainer.addEventListener("mouseleave", startAutoPlay);

    startAutoPlay();
}

/* ==========================================================================
   2. محرك التحقق الفوري والذكي من المدخلات (Form Validation Engine)
   ========================================================================== */
function initializeFormValidator() {
    const form = document.getElementById("catering-form");
    if (!form) return;

    const fields = {
        username: {
            input: document.getElementById("username"),
            validate: value => value.trim().length >= 3
        },
        email: {
            input: document.getElementById("email"),
            validate: value => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(value.trim());
            }
        },
        message: {
            input: document.getElementById("message"),
            validate: value => value.trim().length >= 15
        }
    };

    function validateField(field) {
        const value = field.input.value;
        const isValid = field.validate(value);
        const parent = field.input.parentElement;

        if (!isValid) {
            parent.classList.add("invalid");
        } else {
            parent.classList.remove("invalid");
        }
        return isValid;
    }

    Object.keys(fields).forEach(key => {
        const field = fields[key];
        field.input.addEventListener("input", () => {
            validateField(field);
        });
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        let isFormValid = true;

        Object.keys(fields).forEach(key => {
            const isValid = validateField(fields[key]);
            if (!isValid) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            const successAlert = document.getElementById("form-success");
            successAlert.style.display = "block";
            form.reset(); 

            Object.keys(fields).forEach(key => {
                fields[key].input.parentElement.classList.remove("invalid");
            });

            setTimeout(() => {
                successAlert.style.display = "none";
            }, 5000);
        }
    });
}
