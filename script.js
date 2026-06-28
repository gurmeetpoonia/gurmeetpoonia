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

// ================= ADVANCED GALLERY & MODAL SYSTEM =================
let currentImages = [];
let currentIndex = 0;

const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("fullImg");
const counter = document.querySelector(".modal-counter");
const prev = document.querySelector(".prev-btn");
const next = document.querySelector(".next-btn");

function attachGalleryListeners() {
    document.querySelectorAll(".project-card").forEach(card => {
        const imgContainer = card.querySelector(".img-container");
        if (imgContainer) {
            imgContainer.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();

                let dataAttr = card.getAttribute("data-images");
                console.log("Card clicked. data-images raw value:", dataAttr);

                if (dataAttr) {
                    try {
                        currentImages = JSON.parse(dataAttr.replace(/'/g, '"'));
                        console.log("Parsed image list:", currentImages);
                        currentIndex = 0;
                        showImage();
                        openModal();
                    } catch (error) {
                        console.error("इमेज डेटा रीड करने में एरर आया: ", error);
                    }
                } else {
                    console.warn("No data-images attribute found on this card.");
                }
            });
        } else {
            console.warn("No .img-container found inside a .project-card", card);
        }
    });
}

function showImage() {
    if (currentImages && currentImages.length > 0) {
        const path = currentImages[currentIndex];
        modalImg.src = path;

        modalImg.onload = () => console.log("Image loaded OK:", path);
        modalImg.onerror = () => console.error("Image FAILED to load. Check spelling/case/path:", path);

        counter.innerHTML = `${currentIndex + 1} / ${currentImages.length}`;

        const displayStyle = currentImages.length > 1 ? "flex" : "none";
        if (prev && next) {
            prev.style.display = displayStyle;
            next.style.display = displayStyle;
        }
    } else {
        console.warn("currentImages is empty, nothing to show.");
    }
}

document.addEventListener("DOMContentLoaded", attachGalleryListeners);
window.addEventListener("load", attachGalleryListeners);

if (next && prev) {
    next.onclick = (e) => { e.stopPropagation(); currentIndex = (currentIndex + 1) % currentImages.length; showImage(); };
    prev.onclick = (e) => { e.stopPropagation(); currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; showImage(); };
}

function openModal() {
    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10); 
}

const closeModal = () => {
    modal.classList.remove("show");
    

    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
};
const closeBtn = document.querySelector(".close");
if (closeBtn) closeBtn.onclick = closeModal;
modal.onclick = (e) => { if (e.target === modal) closeModal(); };

document.addEventListener("keydown", e => {
    if (!modal.classList.contains("show")) return;
    if (e.key === "ArrowRight" && currentImages.length > 1) next.click();
    if (e.key === "ArrowLeft" && currentImages.length > 1) prev.click();
    if (e.key === "Escape") closeModal();
});

// Swipe variables declaration
let touchStartX = 0;
let touchEndX = 0;

const modalWrapper = document.querySelector(".modal-wrapper");

if (modalWrapper) {
    modalWrapper.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modalWrapper.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, { passive: true });
}

function handleSwipeGesture() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
        next.click();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        prev.click();
    }
}
// ================= SCROLL REVEAL LOGIC =================
function revealElements() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const revealPoint = 60;

    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealElements);
window.addEventListener("resize", revealElements);

revealElements();
document.addEventListener("DOMContentLoaded", revealElements);
window.addEventListener("load", revealElements);