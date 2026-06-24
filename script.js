const text = "Machine Learning | Python Developer | Streamlit Builder";
let i = 0;

function typeEffect() {
    const el = document.querySelector(".typing");
    if (!el) return;

    if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 80);
    } else {
        setTimeout(() => {
            el.innerHTML = "";
            i = 0;
            typeEffect();
        }, 2000);
    }
}

window.onload = typeEffect;

function toggleMode() {
    document.body.classList.toggle("light");
}

// ================= ADVANCED GALLERY & SWIPE CONTROLLER =================
let currentProjectImages = [];
let currentImageIndex = 0;

const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("fullImg");
const modalCounter = document.querySelector(".modal-counter");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Open Swipable Gallery on Project Card Click
document.querySelectorAll(".project-card").forEach(card => {
    card.querySelector(".img-container").addEventListener("click", function(e) {
        currentProjectImages = JSON.parse(card.getAttribute("data-images"));
        currentImageIndex = 0;
        
        updateModalImage();
        modal.classList.add("show");
    });
});

function updateModalImage() {
    if (currentProjectImages.length === 0) return;
    
    modalImg.style.opacity = "0";
    setTimeout(() => {
        modalImg.src = currentProjectImages[currentImageIndex];
        modalCounter.innerHTML = `${currentImageIndex + 1} / ${currentProjectImages.length}`;
        modalImg.style.opacity = "1";
    }, 150);

    if (currentProjectImages.length <= 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
    }
}

function showNextImage() {
    if (currentProjectImages.length <= 1) return;
    currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
    updateModalImage();
}

function showPrevImage() {
    if (currentProjectImages.length <= 1) return;
    currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
    updateModalImage();
}

nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showNextImage(); });
prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showPrevImage(); });

document.querySelector(".close").onclick = () => modal.classList.remove("show");
modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal-wrapper")) {
        modal.classList.remove("show");
    }
});

document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("show")) return;
    if (e.key === "ArrowRight") showNextImage();
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "Escape") modal.classList.remove("show");
});

// MOBILE TOUCH SWIPE LOGIC
let touchStartX = 0;
let touchEndX = 0;

const modalWrapper = document.querySelector(".modal-wrapper");

modalWrapper.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

modalWrapper.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
}, { passive: true });

function handleSwipeGesture() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
        showNextImage();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        showPrevImage();
    }
}

// SCROLL REVEAL EFFECT
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);