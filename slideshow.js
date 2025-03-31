// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('slideshow-container');
//     const slides = container ? container.querySelectorAll('img') : [];
//     if (slides.length > 0) {
//         slides.forEach((slide, index) => {
//             slide.classList.remove('slide-active', 'slide-prev', 'slide-next');
//             slide.style.transform = `translateX(${index === 0 ? 0 : 100}%)`;
//             slide.style.zIndex = 1;
//             if (index === 0) {
//                 slide.classList.add('slide-active');
//                 slide.style.zIndex = 2;
//             }
//         });
//         const rectContainer = document.getElementById('rectangle-container');
//         const rects = rectContainer ? rectContainer.querySelectorAll('.rectangle') : [];
//         if (rects.length > 0) {
//             rects.forEach((rect, index) => rect.classList.toggle('active', index === 0));
//         }
//         if (slides.length > 1) startSlideshow();
//     }
// });

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
    nextSlide.classList.add('slide-active'); // Add active to incoming

    const isLastToFirst = outgoingIndex === imagesElements.length - 1 && nextIndex === 0;
    const isFirstToLast = outgoingIndex === 0 && nextIndex === imagesElements.length - 1;

    if (isLastToFirst) {
        // Last to First: Incoming from right, outgoing to left
        nextSlide.style.transform = 'translateX(100%)';
        outgoingSlide?.style.transform = 'translateX(-100%)';
    } else if (isFirstToLast) {
        // First to Last: Incoming from left, outgoing to right
        nextSlide.style.transform = 'translateX(-100%)';
        outgoingSlide?.style.transform = 'translateX(100%)';
    } else {
        // Normal navigation
        if (direction === 'next' || nextIndex > outgoingIndex) {
            // Next: Incoming from right, outgoing to left
            nextSlide.style.transform = 'translateX(100%)';
            outgoingSlide?.style.transform = 'translateX(-100%)';
        } else {
            // Prev: Incoming from left, outgoing to right
            nextSlide.style.transform = 'translateX(-100%)';
            outgoingSlide?.style.transform = 'translateX(100%)';
        }
    }

    nextSlide.style.zIndex = 2; // Bring incoming slide to front
    outgoingSlide.style.zIndex = 1;

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
