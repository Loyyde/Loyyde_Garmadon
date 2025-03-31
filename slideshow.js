const slideshowContainer = document.getElementById('slideshow-container');
const rectangleContainer = document.getElementById('rectangle-container');
let imagesElements = [];
let rectangles = [];
let currentIndex = 0;
const intervalTime = 5000;
let slideshowInterval;
const preloadedImages = [];
let isAnimating = false; // Flag to prevent rapid clicks

const showImage = (index, direction) => {
    if (isAnimating || imagesElements.length <= 1) return;
    isAnimating = true;

    const previousIndex = currentIndex;
    currentIndex = index;
    const currentImage = imagesElements[previousIndex];
    const nextImage = imagesElements[currentIndex];

    nextImage.classList.remove('active');
    currentImage.classList.remove('active');
    nextImage.classList.remove('slide-from-right', 'slide-to-left', 'slide-from-left', 'slide-to-right');
    currentImage.classList.remove('slide-from-right', 'slide-to-left', 'slide-from-left', 'slide-to-right');

    if (direction === 'next') {
        nextImage.classList.add('slide-from-right');
        currentImage.classList.add('slide-to-left');
    } else if (direction === 'prev') {
        nextImage.classList.add('slide-from-left');
        currentImage.classList.add('slide-to-right');
    }

    // Force reflow to trigger the animation
    void nextImage.offsetWidth;

    nextImage.classList.add('active');

    setTimeout(() => {
        currentImage.classList.remove('slide-to-left', 'slide-to-right');
        nextImage.classList.remove('slide-from-right', 'slide-from-left');
        isAnimating = false;
    }, 500); // Duration of the transition
};

const updateRectangles = () => {
    rectangles.forEach((rect, index) => {
        rect.classList.remove('active');
        if (index === currentIndex) rect.classList.add('active');
    });
};

const startSlideshow = () => {
    clearInterval(slideshowInterval);
    slideshowInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % imagesElements.length;
        showImage(nextIndex, 'next');
        updateRectangles();
    }, intervalTime);
};

const loadSlides = (filenames) => {
    slideshowContainer.innerHTML = '';
    rectangleContainer.innerHTML = '';
    imagesElements = [];
    rectangles = [];
    currentIndex = 0;
    preloadedImages.length = 0;

    filenames.forEach(filename => {
        const img = new Image();
        img.src = filename;
        preloadedImages.push(img);
    });

    filenames.forEach((filename, index) => {
        const img = document.createElement('img');
        img.src = filename;
        slideshowContainer.appendChild(img);
        imagesElements.push(img);

        const rectangle = document.createElement('div');
        rectangle.className = 'rectangle';
        rectangle.dataset.index = index;
        rectangle.addEventListener('click', () => {
            if (index > currentIndex) {
                showImage(index, 'next');
            } else if (index < currentIndex) {
                showImage(index, 'prev');
            }
            updateRectangles();
            startSlideshow();
        });
        rectangleContainer.appendChild(rectangle);
        rectangles.push(rectangle);
    });

    if (imagesElements.length > 0) {
        imagesElements[0].classList.add('active');
        updateRectangles();
        console.log("First image should be active."); // Added console log
        setTimeout(() => {
            startSlideshow();
        }, 100); // Slight delay to ensure first image is visible before auto-sliding
        setTimeout(() => {
            slideshowContainer.style.height = 'auto';
            slideshowContainer.style.maxHeight = 'none';
        }, 100);
    } else {
        slideshowContainer.textContent = "No images found for the slideshow.";
    }
};

// Auto start slideshow and add rectangle click listener
function initSlideshow() {
    if (imagesElements.length > 0) {
        rectangleContainer.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('rectangle')) {
                const index = parseInt(target.dataset.index);
                if (!isNaN(index)) {
                    if (index > currentIndex) {
                        showImage(index, 'next');
                    } else if (index < currentIndex) {
                        showImage(index, 'prev');
                    }
                    updateRectangles();
                    startSlideshow(); // Restart interval on manual click
                }
            }
        });
    }
}
