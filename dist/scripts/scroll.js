const scrollSection = document.querySelector(".scroll-section");
const scrollElements = document.querySelectorAll(".fixed-section>div");
const screenHeight = document
    .querySelector(".fixed-section")
    .getClientRects()[0].height;
let ticking = false;

function scrollHandler() {
    const scrollPercentage =
        ((screenHeight - scrollSection.getClientRects()[0].top) /
            (screenHeight * 2)) *
        100;
    console.log(scrollPercentage);
    scrollElements[3].style = `transform: translateY(${
        50 > scrollPercentage && scrollPercentage > 0
            ? 100 - scrollPercentage * 2
            : 50 < scrollPercentage
            ? 0
            : 100
    }%);`;
    scrollElements[2].style = `transform: translateY(-${
        100 > scrollPercentage && scrollPercentage > 50
            ? 100 - (scrollPercentage - 50) * 2
            : 100 < scrollPercentage
            ? 0
            : 100
    }%);`;
    scrollElements[1].style = `transform: translateY(${
        150 > scrollPercentage && scrollPercentage > 100
            ? 100 - (scrollPercentage - 100) * 2
            : 150 < scrollPercentage
            ? 0
            : 100
    }%);`;
    scrollElements[0].style = `transform: translateY(-${
        200 > scrollPercentage && scrollPercentage > 150
            ? 100 - (scrollPercentage - 150) * 2
            : 200 < scrollPercentage
            ? 0
            : 100
    }%);`;
    if (scrollPercentage > 210) {
        document.querySelector(".fixed-section").classList.add("opacity-0");
        document.querySelector(".after-scroll-section").classList.remove("opacity-0");
    } else {
        document.querySelector(".fixed-section").classList.remove("opacity-0");
        document.querySelector(".after-scroll-section").classList.add("opacity-0");
    }
}

document.addEventListener("scroll", event => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            scrollHandler();
            ticking = false;
        });

        ticking = true;
    }
});
