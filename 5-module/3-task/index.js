function initCarousel() {
  // инициализируем переменные из DOM
  const carousel = document.querySelector(".carousel");
  const carouselInner = document.querySelector(".carousel__inner");
  const carouselArrowRight = document.querySelector(".carousel__arrow_right");
  const carouselArrowLeft = document.querySelector(".carousel__arrow_left");
  const carouselSLide = document.querySelector(".carousel__slide");
  const slideQuantity = carouselInner.children.length;
  let counter = 1;
  // не отображаем левую стрелку, когда находится в крайнем положении
  if (counter === 1) {
    carouselArrowLeft.setAttribute("style", "display: none");
  }
  carousel.addEventListener("click", function (event) {
    const slideWidth = carouselSLide.offsetWidth; // получаем ширину слайдера

    if (event.target.closest(".carousel__arrow_right")) {
      carouselInner.setAttribute(
        "style",
        `transform: translateX(${-slideWidth * counter}px)`
      ); // реализация переключения слайда вправо

      counter++;

      if (counter === slideQuantity) {
        carouselArrowRight.setAttribute("style", "display: none");
        counter--;
      } // скрываем кнопку переключения при достижении крайних слайдов

      carouselArrowLeft.removeAttribute("style");
    }

    if (event.target.closest(".carousel__arrow_left")) {
      counter--;
      carouselInner.setAttribute(
        "style",
        `transform: translateX(${-slideWidth * counter}px)`
      ); // реализация переключения слайда вправо

      carouselArrowRight.removeAttribute("style");
    }

    if (counter === 0) {
      carouselArrowLeft.setAttribute("style", "display: none");
      counter++
    }
  });
}
