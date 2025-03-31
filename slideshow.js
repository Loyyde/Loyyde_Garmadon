document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.getElementById('slideshow-container');
    const imagesElements = slideshowContainer ? slideshowContainer.querySelectorAll('img') : [];
    const rectangleContainer = document.getElementById('rectangle-container');
    const rectangles = rectangleContainer ? rectangleContainer.querySelectorAll('.rectangle') : [];
    let currentIndex = 0;
    const intervalTime = 5000;
    let slideshowInterval;

    if (!slideshowContainer || imagesElements.length === 0) {
        console.log("Slideshow container or images not found.");
        return;
    }

    function updateRectangles() {
        rectangles.forEach((rect, index) => {
            rect.classList.remove('active');
            if (index === currentIndex) {
                rect.classList.add('active');
            }
        });
    }

    function showImage(index) {
        if (index < 0 || index >= imagesElements.length || index === currentIndex) {
            return;
        }

        stopSlideshow();

        const prevIndex = currentIndex;
        currentIndex = index;

        imagesElements.forEach((img, i) => {
            img.classList.remove('slide-active', 'slide-prev', 'slide-next');
            if (i === currentIndex) {
                img.classList.add('slide-active');
                img.style.transform = 'translateX(0%)';
            } else if (i === prevIndex) {
                img.classList.add('slide-prev');
                img.style.transform = 'translateX(-100%)';
            } else if (i > currentIndex) {
                img.classList.add('slide-next');
                img.style.transform = 'translateX(100%)';
            } else {
                img.classList.add('slide-prev');
                img.style.transform = 'translateX(-100%)';
            }
        });

        updateRectangles();
        startSlideshow();
    }

    function nextSlide() {
        const prevIndex = currentIndex;
        currentIndex = (currentIndex + 1) % imagesElements.length;

        imagesElements.forEach((img, i) => {
            img.classList.remove('slide-active', 'slide-prev', 'slide-next');
            if (i === currentIndex) {
                img.classList.add('slide-active');
                img.style.transform = 'translateX(0%)';
            } else if (i === prevIndex) {
                img.classList.add('slide-prev');
                img.style.transform = 'translateX(-100%)';
            } else if (i === (currentIndex + 1) % imagesElements.length) {
                img.classList.add('slide-next');
                img.style.transform = 'translateX(100%)';
            } else {
                img.classList.add('slide-next');
                img.style.transform = 'translateX(100%)';
            }
        });

        updateRectangles();
    }

    function prevSlide() {
        const prevIndex = currentIndex;
        currentIndex = (currentIndex - 1 + imagesElements.length) % imagesElements.length;

        imagesElements.forEach((img, i) => {
            img.classList.remove('slide-active', 'slide-prev', 'slide-next');
            if (i === currentIndex) {
                img.classList.add('slide-active');
                img.style.transform = 'translateX(0%)';
            } else if (i === prevIndex) {
                img.classList.add('slide-next');
                img.style.transform = 'translateX(100%)';
            } else if (i === (currentIndex - 1 + imagesElements.length) % imagesElements.length) {
                img.classList.add('slide-prev');
                img.style.transform = 'translateX(-100%)';
            } else {
                img.classList.add('slide-prev');
                img.style.transform = 'translateX(-100%)';
            }
        });

        updateRectangles();
    }

    function startSlideshow() {
        if (!slideshowInterval) {
            slideshowInterval = setInterval(nextSlide, intervalTime);
        }
    }

    function stopSlideshow() {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }

    // Initialize slideshow
    if (imagesElements.length > 0) {
        if (rectangles.length > 0) {
            updateRectangles();
        }
        startSlideshow();
    }
});
