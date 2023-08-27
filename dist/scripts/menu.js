const menuBtn = document.querySelector(".menuBtn");
const menu = document.querySelector(".menu");
const background = document.querySelector("section");
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle("drop-down")
    menu.classList.toggle("menuDrop");
    background.classList.toggle("opacity-50");
    background.classList.toggle("z-50");
    document.body.classList.toggle("overflow-hidden")
})