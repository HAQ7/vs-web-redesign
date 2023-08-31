const iconList = document.getElementById("iconList").children;
const carousel = document.getElementById("carousel").querySelectorAll("img");
const progressBar = document.getElementById("progress-bar");
const progressBarFill = [{ width: "0" }, { width: "calc((10/12 * 100)*1%)" }];
const progressTiming = {
    duration: 7000,
    iterations: 1,
};
let carouselIntervel;
let activeCarouselNumber = 0;
let activeCarouselElementClass;
let firstTime = true;

const toggleHoverEffect = iconElement => {
    iconElement.classList.toggle("iconHover");
};

const addListenerIcons = () => {
    for (const icon of iconList) {
        icon.addEventListener("click", iconHandler);
        toggleHoverEffect(icon);
    }
};

const setNewActiveElement = () => {
    activeCarouselElementClass = carousel[activeCarouselNumber].classList;
};

const restProgressBar = () => {
    progressBar.classList.remove("progress-bar");
    setTimeout(() => {
        progressBar.classList.add("progress-bar");
        addListenerIcons();
    }, 2000);
};

const getNewCarouselElement = () => {
    setNewActiveElement();
    activeCarouselElementClass.remove("back-card-shuffle");
    activeCarouselElementClass.add("front-card-shuffle");
    iconList[activeCarouselNumber].classList.add("bg-blue-600");
    restProgressBar();
};

const removeListenerIcon = () => {
    for (const icon of iconList) {
        icon.removeEventListener("click", iconHandler);
        toggleHoverEffect(icon);
    }
};

const removeCurrentCarouselElement = () => {
    removeListenerIcon();
    iconList[activeCarouselNumber].classList.remove("bg-blue-600");
    setNewActiveElement();
    activeCarouselElementClass.remove("front-card-shuffle");
    activeCarouselElementClass.add("back-card-shuffle");
}

const startCarouselTransition = (eventBtn = false, nextActiveNumber = undefined) => {
    removeCurrentCarouselElement();
    if (eventBtn) {
        activeCarouselNumber = nextActiveNumber;
        getNewCarouselElement();
        return;
    }
    activeCarouselNumber =
        activeCarouselNumber >= 3 ? 0 : activeCarouselNumber + 1;
    getNewCarouselElement();
};

const startCarousel = () => {
    progressBar.classList.add("progress-bar");
    document.getElementById("iconList").classList.remove("invisible");
    document.getElementById("iconList").classList.remove("opacity-0");
    for (const child of carousel) {
        child.classList.remove("custom-box-shadow");
        if (!child.classList.contains("absolute")) {
            continue;
        }
        child.classList.add("opacity-none");
    }
};

const iconHandler = event => {
    let indexOfIcon = 0;
    for (const icon of iconList) {
        if (
            icon === event.currentTarget &&
            indexOfIcon != activeCarouselNumber
        ) {
            startCarouselTransition(true, indexOfIcon);
            clearInterval(carouselIntervel);
            carouselIntervel = setInterval(startCarouselTransition, 7000);
            break;
        }
        indexOfIcon++;
    }
};

addListenerIcons();
carouselIntervel = setInterval(startCarouselTransition, 7000);
setTimeout(startCarousel, 2000);
