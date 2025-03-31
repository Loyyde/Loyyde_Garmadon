function showImage(index, direction = 'next') {
    if (index === currentIndex && imagesElements?.[index]?.classList.contains('slide-active')) return;
    if (!imagesElements?.length) return;

    const nextIndex = index;
    const outgoingIndex = currentIndex;
    currentIndex = nextIndex;

    const nextSlide = imagesElements[nextIndex];
    const outgoingSlide = imagesElements[outgoingIndex];

    if (!nextSlide) return;

    imagesElements.forEach((img, i) => {
        img.classList.remove('slide-active', 'slide-prev', 'slide-next');
        img.style.transition = 'transform 0.5s ease-in-out';
        img.style.zIndex = 1;
        img.style.transform = i < currentIndex ? 'translateX(-100%)' : i > currentIndex ? 'translateX(100%)' : '';
        if (i < currentIndex) img.classList.add('slide-prev');
        if (i > currentIndex) img.classList.add('slide-next');
    });

    const isLastToFirst = outgoingIndex === imagesElements.length - 1 && nextIndex === 0;
    const isFirstToLast = outgoingIndex === 0 && nextIndex === imagesElements.length - 1;

    nextSlide.classList.remove('slide-prev', 'slide-next');
    nextSlide.style.zIndex = 2;
    nextSlide.style.transform = isLastToFirst ? 'translateX(100%)' : isFirstToLast ? 'translateX(-100%)' : (direction === 'next' || nextIndex > outgoingIndex) ? 'translateX(100%)' : 'translateX(-100%)';

    setTimeout(() => {
        nextSlide.classList.add('slide-active');
        nextSlide.style.transform = 'translateX(0)';
    }, 10);

    if (outgoingSlide) outgoingSlide.style.zIndex = 1;

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
