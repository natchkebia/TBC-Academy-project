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

  rightArrow.addEventListener("click", () => {
    clearInterval(autoSlideInterval); 
    showNextSlide();
    autoSlideInterval = setInterval(showNextSlide, 3000); 
  });

  leftArrow.addEventListener("click", () => {
    clearInterval(autoSlideInterval); 
    showPreviousSlide();
    autoSlideInterval = setInterval(showNextSlide, 3000); 
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(autoSlideInterval); 
      currentIndex = index;
      updateSlider();
      autoSlideInterval = setInterval(showNextSlide, 3000);
    });
  });

  let autoSlideInterval = setInterval(showNextSlide, 3000);

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
