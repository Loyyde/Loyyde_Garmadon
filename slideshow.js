function showImage(index, direction = 'next') {
    if (index === currentIndex && imagesElements?.[index]?.classList.contains('slide-active')) return;
    if (!imagesElements?.length) return;

    const nextIndex = index;
    const outgoingIndex = currentIndex;
    currentIndex = nextIndex;

    const nextSlide = imagesElements[nextIndex];
    const outgoingSlide = imagesElements[outgoingIndex];

    if (!nextSlide) return;

    // Reset z-index for all slides
    imagesElements.forEach(img => img.style.zIndex = 1);

    nextSlide.classList.remove('slide-prev', 'slide-next');
    outgoingSlide?.classList.remove('slide-active'); // Remove active from outgoing

    const isLastToFirst = outgoingIndex === imagesElements.length - 1 && nextIndex === 0;
    const isFirstToLast = outgoingIndex === 0 && nextIndex === imagesElements.length - 1;

    if (isLastToFirst) {
        // Last to First: Incoming from right, outgoing to left
        nextSlide.style.transform = 'translateX(100%)';
        nextSlide.classList.add('slide-active');
        outgoingSlide?.classList.add('slide-prev');
    } else if (isFirstToLast) {
        // First to Last: Incoming from left, outgoing to right
        nextSlide.style.transform = 'translateX(-100%)';
        nextSlide.classList.add('slide-active');
        outgoingSlide?.classList.add('slide-next');
    } else {
        // Normal navigation
        nextSlide.style.transform = (direction === 'next' || nextIndex > outgoingIndex) ? 'translateX(100%)' : 'translateX(-100%)';
        nextSlide.classList.add('slide-active');
        outgoingSlide?.classList.add(direction === 'next' || nextIndex > outgoingIndex ? 'slide-prev' : 'slide-next');
    }

    nextSlide.style.zIndex = 2; // Bring incoming slide to front

    updateRectangles();
}

function updateRectangles() {
    rectangles.forEach((rect, index) => rect.classList.toggle('active', index === currentIndex));
}

function nextSlide() {
    if (imagesElements.length) showImage((currentIndex + 1) % imagesElements.length, 'next');
}

function prevSlide() {
    if (imagesElements.length) showImage((currentIndex - 1 + imagesElements.length) % imagesElements.length, 'prev');
}

function startSlideshow() {
    clearInterval(slideshowInterval);
    if (imagesElements.length > 1) slideshowInterval = setInterval(nextSlide, intervalTime);
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
}
