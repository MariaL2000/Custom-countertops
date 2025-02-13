
 // Initialize all carousels
 document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.carousel-wrapper').forEach(initializeCarousel);
});

function initializeCarousel(carouselWrapper) {
  const container = carouselWrapper.querySelector('.products-container');
  const wrapper = carouselWrapper.querySelector('.products-wrapper');
  const leftBtn = carouselWrapper.querySelector('.arrow-left');
  const rightBtn = carouselWrapper.querySelector('.arrow-right');
  const cardWidth = 300; // Width of each card plus gap
  const scrollAmount = cardWidth + 24; // Card width plus gap

  // Function to scroll left
  function scrollLeft() {
      const currentScroll = container.scrollLeft;
      container.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: 'smooth'
      });
      updateButtonStates();
  }

  // Function to scroll right
  function scrollRight() {
      const currentScroll = container.scrollLeft;
      container.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: 'smooth'
      });
      updateButtonStates();
  }

  // Update button states based on scroll position
  function updateButtonStates() {
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      leftBtn.style.opacity = currentScroll <= 0 ? '0.5' : '1';
      leftBtn.style.cursor = currentScroll <= 0 ? 'default' : 'pointer';
      
      rightBtn.style.opacity = currentScroll >= maxScroll ? '0.5' : '1';
      rightBtn.style.cursor = currentScroll >= maxScroll ? 'default' : 'pointer';
  }

  leftBtn.addEventListener('click', scrollLeft);
  rightBtn.addEventListener('click', scrollRight);

  container.addEventListener('scroll', updateButtonStates);

  updateButtonStates();

 
  let isDown = false;
  let startX;
  let initialScrollPos;

  container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      initialScrollPos = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
  });

  container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
  });

  container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = initialScrollPos - walk;
      updateButtonStates();
  });
}




















document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animated');

    function checkVisibility() {
        const windowHeight = window.innerHeight;

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight * 0.8) { // 80% del viewport
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Ejecutar al cargar la página
});



















function moveSlide(direction, carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.children.length;
    let index = parseInt(carousel.dataset.index || 0);
    index = (index + direction + slides) % slides;
    carousel.dataset.index = index;
    carousel.style.transform = `translateX(${-index * 100}%)`;
}