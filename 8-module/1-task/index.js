import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  // Отрисовать пустую иконку корзины
  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  // Заполнить её данными из объекта cart
  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  // позиционировать иконку корзины на экране
  updatePosition() {
    // проверяем, что корзина видима через метрику offsetWidth
    const { offsetWidth } = this.elem;
    if (!offsetWidth) return;

    if (window.scrollY > 50 && window.innerWidth > 767) { // если проскроллили вниз и устройство не мобильное
      const container = document.querySelector(".container"); // будем мерить расстояние от края документа этого самого первого элемента с классом container
      const { clientWidth } = document.documentElement; // ширина содержимого страницы
      const { right } = container.getBoundingClientRect(); // X-координата правой границы прямоугольника

      // вычисляем отступ по горизонтали
      const cartPosition =
        clientWidth - 10 > right + 20 + offsetWidth ? right + 20 : clientWidth - offsetWidth - 10;

      // фиксируем позиционирование по условию задачи
      this.elem.style.position = 'fixed';
      this.elem.style.top = '50px';
      this.elem.style.zIndex = 1e3;
      this.elem.style.right = '10px';
      this.elem.style.left = `${cartPosition}px`;
    } else { // Если условие не выполняется, обнуляем стили к исходным
      this.elem.style = "";
    }
  }
}
