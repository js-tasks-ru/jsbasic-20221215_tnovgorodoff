import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.initRibbonMenu();
  }

  initRibbonMenu() {
    this.initRibbonMenu();
    this.scrolling();
    this.selectCategory();
  }
  // создаем меню ленты
  createRibbonMenu() {
    this.elem.classList.add('ribbon');
    this.elem.insertAdjacentHTML('afterbegin', this.createButton().buttonArrowLeft);
    this.elem.insertAdjacentElement('beforeend', this.createRibbonInner());
    this.elem.insertAdjacentHTML('beforeend', this.createButton().buttonArrowRight);
  }
  // создаем класс ленты, в котором находятся все категории
  createRibbonInner() {
    const ribbonInnerElement = document.createElement('nav');
    ribbonInnerElement.classList.add('ribbon__inner');

    this.categories.forEach((category) => {
      const ribbonItemTemplate = this.createRibbonItem(category);
      ribbonInnerElement.insertAdjacentHTML('beforeend', ribbonItemTemplate)
    });
    return ribbonInnerElement;
  }
  // ссылки на категории товаров в ленте
  createRibbonItem({ id, name }) {
    const ribbonItemTemplate = `
    <a href="#" class="ribbon__item" data-id="${id}">${name}</a>`
    return ribbonItemTemplate;
  }
  // кнопки прокрутки влево-вправо самой ленты
  createButton() {
    const buttons = {};
    const buttonArrowLeft = `<button class="ribbon__arrow ribbon__arrow_left
    ">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`;
    const buttonArrowRight = `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`

    buttons.buttonArrowLeft = buttonArrowLeft;
    buttons.buttonArrowRight = buttonArrowRight;

    return buttons;
  }

  scrolling() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const buttonArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    const buttonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');

    function calculateScrolling() {
      const scroll = {};
      const scrollLeft = ribbonInner.scrollLeft; // ширина оставшейся невидимой области слева
      const scrollWidth = ribbonInner.scrollWidth; // общая ширина прокрутки
      const clientWidth = ribbonInner.clientWidth; // видимая ширина элемента
      const scrollRight = scrollWidth - scrollLeft - clientWidth; // ширина оставшейся невидимой области справа

      scroll.scrollLeft = scrollLeft;
      scroll.scrollWidth = scrollWidth;
      scroll.clientWidth = clientWidth;
      scroll.scrollRight = scrollRight;

      return scroll;
    }
    // прописываем логику работы левого и правого скроллов
    this.elem.addEventListener('click', function (event) {

      function rightScroll() {
        if (event.closest('.ribbon__arrow_right')) {

          ribbonInner.scrollBy(350, 0);

          ribbonInner.addEventListener('scroll', function () {
            const scrollRight = calculateScrolling().scrollRight;

            if (scrollRight !== 0) {
              buttonArrowLeft.classList.add('ribbon__arrow_visible');
            };

            if (scrollRight === 0) {
              buttonArrowRight.classList.remove('ribbon__arrow_visible');
            };

          })
        };
      };

      function leftScroll() {
        if (event.target.closest('.ribbon__arrow_left')) {

          ribbonInner.scrollBy(-350, 0);

          ribbonInner.addEventListener('scroll', function () {
            const scrollLeft = calculateScrolling().scrollLeft;

            if (scrollLeft !== 0) {
              buttonArrowRight.classList.add('ribbon__arrow_visible');
            };

            if (scrollLeft === 0) {
              buttonArrowLeft.classList.remove('ribbon__arrow_visible');
            };
          })
        };
      }

      rightScroll();
      leftScroll();
      calculateScrolling();
    });
  }
  // выбор конкретной категории
  selectCategory() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const ribbonItem = this.elem.querySelectorAll('.ribbon__item');

    ribbonInner.addEventListener('click', (event) => {
      ribbonItem.forEach(item => {
        item.classList.remove('ribbon__item_active');
      });

      event.classList.add('ribbon__item_active');

      this.elem.dispatchEvent(new CustomEvent("ribbon-select", {
        detail: event.dataset.id,
        bubbles: true,
      }))
    })
  }
}
