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

const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("fullImg");

// OPEN IMAGE (FULL SCREEN)
document.querySelectorAll(".project-img").forEach(img => {
    img.addEventListener("click", () => {
        modal.classList.add("show");
        modalImg.src = img.src;
    });
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