function showImage(index, direction = 'next') {
    if (index === currentIndex && imagesElements[index]?.classList.contains('slide-active')) {
        return;
    }
    if (imagesElements.length === 0) return;

    const nextIndex = index;
    const outgoingIndex = currentIndex;
    currentIndex = nextIndex;

    const nextSlide = imagesElements[nextIndex];
    const outgoingSlide = imagesElements[outgoingIndex];

    if (!nextSlide) return;

    imagesElements.forEach((img, i) => {
        img.classList.remove('slide-active', 'slide-prev', 'slide-next');
        img.style.transition = 'transform 0.5s ease-in-out';
        img.style.zIndex = 1; // Reset z-index
        if (i < currentIndex) {
            img.classList.add('slide-prev');
            img.style.transform = 'translateX(-100%)';
        } else if (i > currentIndex) {
            img.classList.add('slide-next');
            img.style.transform = 'translateX(100%)';
        }
    });

    // Handle the exceptions for circular navigation
    if (outgoingIndex === imagesElements.length - 1 && nextIndex === 0) {
        // Last to First: Incoming should appear from the right
        nextSlide.classList.remove('slide-prev', 'slide-next');
        nextSlide.style.transform = 'translateX(100%)';
        nextSlide.style.zIndex = 2; // Bring to front immediately
        setTimeout(() => {
            nextSlide.classList.add('slide-active');
            nextSlide.style.transform = 'translateX(0)';
        }, 10); // Shortened timeout
    } else if (outgoingIndex === 0 && nextIndex === imagesElements.length - 1) {
        // First to Last: Incoming should appear from the left
        nextSlide.classList.remove('slide-prev', 'slide-next');
        nextSlide.style.transform = 'translateX(-100%)';
        nextSlide.style.zIndex = 2; // Bring to front immediately
        setTimeout(() => {
            nextSlide.classList.add('slide-active');
            nextSlide.style.transform = 'translateX(0)';
        }, 10); // Shortened timeout
    } else {
        // Normal navigation
        nextSlide.classList.remove('slide-prev', 'slide-next');
        nextSlide.style.transform = (direction === 'next' || nextIndex > outgoingIndex) ? 'translateX(100%)' : 'translateX(-100%)';
        nextSlide.style.zIndex = 2; // Bring to front immediately
        setTimeout(() => {
            nextSlide.classList.add('slide-active');
            nextSlide.style.transform = 'translateX(0)';
        }, 10); // Shortened timeout
    }

    // Ensure the outgoing slide is behind the incoming one during transition
    if (outgoingSlide) {
        outgoingSlide.style.zIndex = 1;
    }

    updateRectangles();
}

function updateRectangles() {
    rectangles.forEach((rect, index) => {
        // Use the specific 'active' class for rectangles
        rect.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    if (imagesElements.length === 0) return;
    const nextIndex = (currentIndex + 1) % imagesElements.length;
    showImage(nextIndex, 'next');
}

function prevSlide() { // Function to go back
    if (imagesElements.length === 0) return;
    const prevIndex = (currentIndex - 1 + imagesElements.length) % imagesElements.length;
    showImage(prevIndex, 'prev');
}

function startSlideshow() {
    clearInterval(slideshowInterval); // Clear existing interval
    if (imagesElements.length > 1) { // Only start if more than one slide
        slideshowInterval = setInterval(nextSlide, intervalTime);
    }
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
}
