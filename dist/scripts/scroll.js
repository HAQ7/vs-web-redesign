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
    document.body.style = `background-color: hsl(0, 0%, ${
        750 > scrollPercentage && scrollPercentage > 25
            ? scrollPercentage - 17
            : scrollPercentage > 100
            ? 58
            : 8
    }%);`;
    scrollElements[3].style = `transform: translate(${
        150 > scrollPercentage && scrollPercentage > 120
            ? (scrollPercentage - 120) * (10 / 3)
            : scrollPercentage > 150
            ? 100
            : 0
    }%,-${
        50 > scrollPercentage && scrollPercentage > 0
            ? 100 - scrollPercentage * 2
            : 50 < scrollPercentage
            ? 0
            : 100
    }%);`;
    scrollElements[2].style = `transform: translate(${
        150 > scrollPercentage && scrollPercentage > 120
            ? (scrollPercentage - 120) * (20 / 3)
            : scrollPercentage > 150
            ? 200
            : 0
    }%,${
        100 > scrollPercentage && scrollPercentage > 50
            ? 100 - (scrollPercentage - 50) * 2
            : 100 < scrollPercentage
            ? 0
            : 100
    }%);`;
    scrollElements[1].style = `transform: translate(-${
        150 > scrollPercentage && scrollPercentage > 120
            ? (scrollPercentage - 120) * (20 / 3)
            : scrollPercentage > 150
            ? 200
            : 0
    }%,-${
        100 > scrollPercentage && scrollPercentage > 50
            ? 100 - (scrollPercentage - 50) * 2
            : 100 < scrollPercentage
            ? 0
            : 100
    }%);`;
    scrollElements[0].style = `transform: translate(-${
        150 > scrollPercentage && scrollPercentage > 120
            ? (scrollPercentage - 120) * (10 / 3)
            : scrollPercentage > 150
            ? 100
            : 0
    }%,${
        50 > scrollPercentage && scrollPercentage > 0
            ? 100 - scrollPercentage * 2
            : 50 < scrollPercentage
            ? 0
            : 100
    }%);`;
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
