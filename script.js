document.addEventListener("DOMContentLoaded", () => {
  // Burger menu toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
  });

  // Slider functionality
  const leftArrow = document.querySelector(".fa-chevron-left");
  const rightArrow = document.querySelector(".fa-chevron-right");
  const sliderContainer = document.querySelector(".slider-container");
  const sliderWrappers = document.querySelectorAll(".slider-wrapper");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  let scrollAmount = 0;
  let startX = 0;
  let endX = 0;
  let autoSlideInterval;

  const updateSlider = () => {
    let containerWidth = sliderContainer.offsetWidth;
    scrollAmount = currentIndex * containerWidth;
    sliderContainer.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  };

  const showNextSlide = () => {
    if (currentIndex < sliderWrappers.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; 
    }
    updateSlider();
  };

  const showPreviousSlide = () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = sliderWrappers.length - 1; 
    }
    updateSlider();
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(showNextSlide, 3000);
  };

  rightArrow.addEventListener("click", () => {
    showNextSlide();
    resetAutoSlide();
  });

  leftArrow.addEventListener("click", () => {
    showPreviousSlide();
    resetAutoSlide();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
      resetAutoSlide();
    });
  });

  // Touch functionality
  sliderContainer.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
    clearInterval(autoSlideInterval);
  });

  sliderContainer.addEventListener("touchmove", (event) => {
    endX = event.touches[0].clientX;
  });

  sliderContainer.addEventListener("touchend", () => {
    if (startX - endX > 50) {
      showNextSlide(); 
    } else if (endX - startX > 50) {
      showPreviousSlide(); 
    }
    resetAutoSlide();
  });

  autoSlideInterval = setInterval(showNextSlide, 3000);

  updateSlider();

  // Accordion functionality
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-item__header');
    header.addEventListener('click', () => {
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.display = 'none';
          const otherHeader = otherItem.querySelector('.accordion-item__header');
          if (otherHeader) {
            otherHeader.classList.remove('no-border');
            const otherIcon = otherHeader.querySelector('i');
            if (otherIcon) {
              otherIcon.classList.remove('fa-chevron-up');
              otherIcon.classList.add('fa-chevron-down');
            }
          } 
        }
      });

      item.classList.toggle('active');
      const content = item.querySelector('.accordion-content');
      content.style.display = content.style.display === 'block' ? 'none' : 'block';

      const icon = header.querySelector('i');
      if (icon) {
        if (content.style.display === 'block') {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
          header.classList.add('no-border');
        } else {
          icon.classList.remove('fa-chevron-up');
          icon.classList.add('fa-chevron-down');
          header.classList.remove('no-border');
        }
      }
    });
  });
});
