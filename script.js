// Grab all slides and prev and next buttons
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

// Clone the first and last slide banners for infinite loop effect
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// Append clone of first slide to end
// Prepend clone of last slide to beginning
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Total slides which includes the clones
const allSlides = document.querySelectorAll('.carousel-slide');

// For tracking the current visible slide
// Start at idx 1, skipping the cloneed last slide at index 0
let currentIndex = 1;

// Function to show a specific slide
// Shift the track based on target index
function showSlide(index, animate=true) {
    if (!animate) {
        track.style.transition = 'none';
    } else {
        track.style.transition = 'transform 0.5s ease-in-out';
    }
    track.style.transform = `translateX(-${index * 100}%)`;
}

// Show first real slide on load
showSlide(currentIndex, false);

// Pagination dots update functionality
const dots = document.querySelectorAll('.dot');
function updatePDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    // Adjust for clones. Real slides start at index 1
    const realIndex = (index - 1 + dots.length) % dots.length;
    dots[realIndex].classList.add('active');
}

// For disabling buttons during transition to prevent rapid clicking
function disableButtons() {
    nextBtn.disabled = true;
    prevBtn.disabled = true;
}

// For enabling the buttons
function enableButtons() {
    nextBtn.disabled = false;
    prevBtn.disabled = false;
}

// Next button click
nextBtn.addEventListener('click', function() {
    currentIndex++;
    showSlide(currentIndex);
    updatePDots(currentIndex)
    disableButtons();
});

// Previous button click
prevBtn.addEventListener('click', function() {
    currentIndex--;
    showSlide(currentIndex);
    updatePDots(currentIndex);
    disableButtons();
});

// Re-enable buttons after transition ends
track.addEventListener('transitionend', function() {
    enableButtons();
    if (currentIndex === allSlides.length-1) {
        currentIndex = 1;
        showSlide(currentIndex, false);
        updatePDots(currentIndex);
    }
    if (currentIndex === 0) {
        currentIndex = allSlides.length-2;
        showSlide(currentIndex, false);
        updatePDots(currentIndex);
    }
});

// Toggle the hamburger menu at a certain screen width
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', function() {
    nav.classList.toggle('open');
});

// Fun Fact Modal
const modal = document.getElementById('funFactModal');
const readMoreBtn = document.querySelector('.btn-read-more');
const closeBtn = document.querySelector('.modal-close');

const funFact = "Fun Fact About Student: Although I now work in digital marketing and study computer science, my original degree was in Aircraft Maintenance Technology at FEATI University.";

// Open modal on Read More click
readMoreBtn.addEventListener('click', function() {
    document.getElementById('modal-text').textContent = funFact;
    modal.classList.add('active');
});

// Close modal on Close button click
closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
});

// Close modal when clicking outside the box
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});