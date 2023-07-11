let dotSelectors = document.querySelectorAll(".dots");
let carouselSlides = document.querySelectorAll(".slide");
let carousel = document.querySelector(".carousel");
const slideArray = ["one", "two", "three"];
// current slide counter
let currentSlide = 0;

// loop through slides and set each slides translateX property to index * 100% 
carouselSlides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}vw)`;
});

for (let dotSelector of dotSelectors) {
    dotSelector.addEventListener("click", () => {
        let slideOwner = dotSelector.classList[1];

        // to clear selected dot styling then add to new current dot
        for (let dotSelector of dotSelectors) {
            dotSelector.classList.remove("selected");
        }
        dotSelector.classList.add("selected");

        // to clear selected slide styling then add to new current slide
        for (let slide of carouselSlides) {
            slide.classList.remove("selected");
            if (slideOwner === slide.classList[1]) {
                slide.classList.add("selected");
            }
        }
        let slideNum = dotSelector.classList[1];
        let slideIndex = slideArray.indexOf(`${slideNum}`)
        currentSlide = slideIndex
        carouselSlides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}vw)`;
        });
    });
}

let slideContainer = document.querySelector(".slider-container");
let isDragStart = false, prevPageX, prevScrollLeft;

const dragStart = (e) => {
    // updating global event variable on mouse down event
    isDragStart = true;
    prevPageX = e.pageX;
    // console.log(prevPageX);
    prevScrollLeft = slideContainer.scrollLeft
}

const dragging = (e) => {
    // scrolling images to left according to mouse point   

    if (!isDragStart) return;
    e.preventDefault();
    let positionDiff = e.pageX - prevPageX
    if ((prevScrollLeft - positionDiff) > 0) {
        if (currentSlide < 2) {
            currentSlide++
        }
        for (let dotSelector of dotSelectors) {
            dotSelector.classList.remove("selected");
        }
        dotSelectors[currentSlide].classList.add("selected");
        carouselSlides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}vw)`;
            isDragStart = false;
        });
    } else {
        if (currentSlide > 0) {
            currentSlide--
        }
        for (let dotSelector of dotSelectors) {
            dotSelector.classList.remove("selected");
        }

        dotSelectors[currentSlide].classList.add("selected");
        carouselSlides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}vw)`;
            isDragStart = false;
        });
    }       
}

const dragStop = () => {
    isDragStart = false;
}

slideContainer.addEventListener("mousedown", dragStart)
slideContainer.addEventListener("mousemove", dragging)
slideContainer.addEventListener("mouseup", dragStop)


