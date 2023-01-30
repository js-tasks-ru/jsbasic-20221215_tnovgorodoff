import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  carousel = null;
  ribbonMenu = null;
  stepSlider = null;
  cartIcon = null;
  cart = null;
  products = [];
  body = document.documentElement.lastElementChild;

  constructor() {
  }

  // рендерим основные компоненты
  async render() {
    this.renderCarousel();
    this.renderRibbonMenu();
    this.renderStepSlider();
    this.renderCartIcon();
    this.renderCart();

    // получаем данные с сервера
    await this.fetchProducts();

    // инициализация карточек товаров и фильтров
    this.renderCards();
    this.initFilters();

    // инициализация событий
    this.eventListeners();
  }

  // вспомогательная функция для доступа к DOM-элементам
  sub(ref, elem) {
    document.querySelector(`[data-${ref}-holder]`).append(elem);
  }

  renderCarousel() {
    this.carousel = new Carousel(slides);
    this.sub("carousel", this.carousel.elem);
  }

  renderRibbonMenu() {
    this.ribbonMenu = new RibbonMenu(categories);
    this.sub("ribbon", this.ribbonMenu.elem);
  }

  renderStepSlider() {
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    this.sub("slider", this.stepSlider.elem);
  }

  renderCartIcon() {
    this.cartIcon = new CartIcon();
    this.sub("cart-icon", this.cartIcon.elem);
  }

  renderCart() {
    this.cart = new Cart(this.cartIcon);
  }

  async fetchProducts() {
    const response = await fetch("products.json");
    this.products = await response.json();
  }

  renderCards() {
    this.productsGrid = new ProductsGrid(this.products);

    const wrapper = document.querySelector("[data-products-grid-holder]");

    wrapper.innerHTML = "";
    wrapper.append(this.productsGrid.elem);
  }

  initFilters() {
    this.productsGrid.updateFilter( {
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    } );
  }

  // события пользовательских действий
  eventListeners() {
    this.productAddEvent();
    this.sliderChangeEvent();
    this.ribbonSelectEvent();
    this.changeEvent();
  }

  productAddEvent() {
    this.body.addEventListener("product-add", ({ detail }) => {
      const productId = detail;
      const product = this.productsGrid.products.find(
        ({ id }) => id === productId
      );

      this.cart.addProduct(product);
    });
  }

  sliderChangeEvent() {
    this.stepSlider.elem.addEventListener("slider-change", ({ detail }) => {
      this.productsGrid.updateFilter( {
        maxSpiciness: detail,
      } );
    } );
  }

  ribbonSelectEvent() {
    this.ribbonMenu.elem.addEventListener("ribbon-select", ({ detail }) => {
      this.productsGrid.updateFilter( {
        category: detail,
      } );
    } );
  }

  // фильтрация по изменению чекбоксов
  changeEvent() {
    this.body.addEventListener("change", ({ target }) => {
      if (target.closest("#nuts-checkbox")) {
        this.productsGrid.updateFilter({
          noNuts: target.checked,
        });
      }

      if (target.closest("#vegeterian-checkbox")) {
        this.productsGrid.updateFilter({
          vegeterianOnly: target.checked,
        });
      }
    });
  }
}
