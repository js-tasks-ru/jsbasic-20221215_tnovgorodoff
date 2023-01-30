import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  // корневой DOM-элемент списка товаров
  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.products.forEach((product) => {
      const { elem } = new ProductCard(product);
      this.elem.firstElementChild.append(elem);
    });
  }

  // функция фильтрации товаров по условиям фильтров
  updateCards() {
    const cardsContainer = this.elem.firstElementChild;
    cardsContainer.innerHTML = "";

    const { noNuts, vegeterianOnly, maxSpiciness, category } = this.filters;

    for (const product of this.products) {
      if (noNuts && product.nuts)
        continue;

      if (vegeterianOnly && !product.vegeterian)
        continue;

      if (maxSpiciness && product.spiciness > maxSpiciness)
        continue;

      if (category && product.category !== category)
        continue;

      const {elem} = new ProductCard(product);
      cardsContainer.append(elem);
    }
  }

  updateFilter(filters) {
    // получаем список объектов и копируем в первый target свойства из остальных
    Object.assign(this.filters, filters);
    // вызываем функцию фильтрации
    this.updateCards();
  }
}
