const scrollSection = document.querySelector(".scroll-section");
const screenHeight = document
    .querySelector(".fixed-section")
    .getClientRects()[0].height;
const movingSection = document.querySelector(".moving-section");
let homeAzure = document.getElementById("home-azure-div")
let scrollPercentage;
let ticking = false;
let isEventActive;

document.documentElement.style.setProperty(
    "--screenWidth",
    `${document.body.offsetWidth}px`
);

function setScrollValue() {
    scrollPercentage =
        ((screenHeight - scrollSection.getClientRects()[0].top) /
            (screenHeight * 2)) *
        100;
    document
        .querySelector(":root")
        .style.setProperty("--scrollPercentage", scrollPercentage);
    if (scrollPercentage > 100) {
        movingSection.classList.add("moving-background");
        return
    }
    movingSection.classList.remove("moving-background");
}

const scrollHandler = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            setScrollValue();
            ticking = false;
        });

        ticking = true;
    }
};

if (document.body.offsetWidth > 767) {
    isEventActive = true;
    document.addEventListener("scroll", scrollHandler);
} else {
    isEventActive = false;
    movingSection.classList.add("moving-background");
}

const restAnimation = () => {
    document.querySelector(":root").style.setProperty("--scrollPercentage", 0);
};

addEventListener("resize", () => {
    if (document.body.offsetWidth > 767 && !isEventActive) {
        document.addEventListener("scroll", scrollHandler);
        setScrollValue();
        isEventActive = true;
        return;
    }
    if (document.body.offsetWidth < 767) {
        document.removeEventListener("scroll", scrollHandler);
        isEventActive = false;
        restAnimation();
        if (movingSection.classList.contains("moving-background")) {
            return;
        }
        movingSection.classList.add("moving-background");
        homeAzure.style = `opacity: 1`;
    }
});
