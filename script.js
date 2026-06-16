const text = "Machine Learning | Python Developer | Streamlit Builder";

let i = 0;

function typeEffect() {
    const typingElement = document.querySelector(".typing");

    if (!typingElement) return;

    if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 70);
    } else {
        setTimeout(() => {
            typingElement.innerHTML = "";
            i = 0;
            typingElement.innerHTML = "";
            typeEffect();
        }, 2000);
    }
}

window.onload = function () {
    typeEffect();
};

function toggleMode() {
    document.body.classList.toggle("light");
}