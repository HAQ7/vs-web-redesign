const scrollSection = document.querySelector(".scroll-section");
const scrollElements = document.getElementById("scroll-rectangle").children;
const screenHeight = document
    .querySelector(".fixed-section")
    .getClientRects()[0].height;
const movingSection = document.querySelector(".moving-section");
const homeAzure = document.getElementById("home-azure-div");
const downloadSection = document.querySelector(".download-section-wrap");
const curvesSection = downloadSection.querySelectorAll("path");
let scrollPercentage;
let ticking = false;
let isEventActive;

document.documentElement.style.setProperty(
    "--screenWidth",
    `${document.body.offsetWidth}px`
);

function scrollAnimation() {
    scrollPercentage =
        ((screenHeight - scrollSection.getClientRects()[0].top) /
            (screenHeight * 2)) *
        100;
    for (let elementNumber = 0; elementNumber < 4; elementNumber++) {
        let elementSelection = elementNumber == 1 || elementNumber == 2;
        scrollElements[elementNumber].style = `transform: translate(${
            elementNumber == 1 || elementNumber == 0 ? "-" : ""
        }${
            150 > scrollPercentage && scrollPercentage > 120
                ? (scrollPercentage - 120) *
                  (elementSelection ? 20 / 3 : 10 / 3)
                : scrollPercentage > 150
                ? elementSelection
                    ? 200
                    : 100
                : 0
        }%,${elementNumber == 1 || elementNumber == 3 ? "-" : ""}${
            (elementSelection ? 100 : 50) > scrollPercentage &&
            scrollPercentage > (elementSelection ? 50 : 0)
                ? 100 -
                  (elementSelection
                      ? scrollPercentage - 50
                      : scrollPercentage) *
                      2
                : (elementSelection ? 100 : 50) < scrollPercentage
                ? 0
                : 100
        }%);`;
    }
    homeAzure.style = `opacity: ${scrollPercentage > 90 ? 1 : 0}`;
    if (scrollPercentage > 100) {
        movingSection.classList.add("moving-background");
    } else {
        movingSection.classList.remove("moving-background");
    }
    downloadSection.style = `transform: translateY(${
        scrollPercentage > 150 && scrollPercentage < 200
            ? 100 - (scrollPercentage - 150) * 2
            : scrollPercentage > 200
            ? 0
            : 100
    }%)`;
    for (let elementNumber = 0; elementNumber < 3; elementNumber++) {
        curvesSection[elementNumber].style = `transform: translateX(-${
            scrollPercentage > 150
                ? (scrollPercentage - 150) *
                  (elementNumber == 0 ? 2 : elementNumber == 1 ? 1.5 : 1)
                : 0
        }%`;
    }
}

const scrollHandler = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            scrollAnimation();
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
    for (let elementNumber = 0; elementNumber < 4; elementNumber++) {
        scrollElements[elementNumber].style = `transform: translate(0,0);`;
    }
};

addEventListener("resize", () => {
    if (document.body.offsetWidth > 767 && !isEventActive) {
        document.addEventListener("scroll", scrollHandler);
        scrollAnimation();
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
