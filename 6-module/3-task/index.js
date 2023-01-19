import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.currentSlideIndex = 0;
    this.slides = slides;
    this.elem = this.render(slides);
  }

  render(slides) { //создаем слайд в DOM
    let carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.getSlidesList(slides)}
        </div>
      </div>`
    );
    // задаем через DOM стрелки карусели
    let carouselArrowRight = carousel.querySelector(".carousel__arrow_right");
    let carouselArrowLeft = carousel.querySelector(".carousel__arrow_left");

    this.setArrow(this.currentSlideIndex, carouselArrowRight, carouselArrowLeft, this.slides.length);
    // реализация прокрутки картинок
    carouselArrowRight.addEventListener( "click", () => {
      let carouselInnerWidth = carousel.querySelector(".carousel__inner").offsetWidth;
      this.currentSlideIndex++;
      document.querySelector(".carousel__inner").style.transform = `translateX(-${this.currentSlideIndex * carouselInnerWidth}px)`;
      this.setArrow(this.currentSlideIndex, carouselArrowRight, carouselArrowLeft, this.slides.length);
    });

    carouselArrowLeft.addEventListener( "click", () => {
      let carouselInnerWidth = carousel.querySelector(".carousel__inner").offsetWidth;
      this.currentSlideIndex--;
      document.querySelector(".carousel__inner").style.transform = `translateX(-${this.currentSlideIndex * carouselInnerWidth}px)`;
      this.setArrow(this.currentSlideIndex, carouselArrowRight, carouselArrowLeft, this.slides.length);
    });

    let addButton = carousel.getElementsByClassName('carousel__button');
    // кнопка добавления в корзину
    for (let button of addButton) {
      button.addEventListener('click', () => {
        carousel.dispatchEvent(new CustomEvent("product-add", {
          detail: button.closest('.carousel__slide').dataset.id,
          bubbles: true
        }))
      });
    }

    return carousel;
  }
  // отрисовка отображения стрелок в крайних позициях карусели
  getSlidesList(slides) {
    return slides.reduce((resultList, item) => {
      return resultList + `
        <div class="carousel__slide" data-id=${item.id}>
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`;
    }, '');
  }
  // отрисовка отображения стрелок в крайних позициях карусели
  setArrow(currentSlideIndex, carouselArrowRight, carouselArrowLeft, countSlide) {
    if (currentSlideIndex === 0) {
      carouselArrowLeft.style.display = 'none';
    } else {
      carouselArrowLeft.style.display = '';
    }

    if (currentSlideIndex >= countSlide -1) {
      carouselArrowRight.style.display = 'none';
    } else {
      carouselArrowRight.style.display = '';
    }
  }
}
