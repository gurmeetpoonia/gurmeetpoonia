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

// MULTI SCREENSHOT SWITCHER FUNCTION
function switchImg(mainImgId, newSrc, thumbnailElement) {
    // Change main display image
    const mainImg = document.getElementById(mainImgId);
    if(mainImg) {
        mainImg.src = newSrc;
    }
    
    // Manage Active State Classes for current card thumbnails
    const parentContainer = thumbnailElement.parentElement;
    parentContainer.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumbnailElement.classList.add('active');
}

// MODAL CONTROLLER
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("fullImg");

// Open Modal on Project Main Image Click
document.addEventListener("click", function(e) {
    if(e.target && e.target.classList.contains("project-img")) {
        modal.classList.add("show");
        modalImg.src = e.target.src;
    }
});

// CLOSE BUTTON
document.querySelector(".close").onclick = () => {
    modal.classList.remove("show");
};

// CLICK OUTSIDE CLOSE
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});

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