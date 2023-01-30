export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  // добавляем товар в корзину, если такой товар уже есть, увеличиваем кол-во
  addProduct(product) {
    if (!product)
      return;

    const { id } = product;
    let cartItem = this.cartItems.find(({ product }) => product.id === id);

    if (cartItem) {
      cartItem.count += 1;
    } else {
      cartItem = {
        product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  // изменение кол-ва товаров по кнопкам внутри самой корзины
  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(
      ({ product }) => product.id === productId
    );

    if (!cartItem)
      return;

    cartItem.count += amount;

    if (!cartItem.count) {
      this.cartItems = this.cartItems.filter(
        ({ product: { id } }) => productId !== id
      );
    }

    this.onProductUpdate(cartItem);
  }

  // Возвращает true если корзина пустая и false если в корзине есть хотя бы один товар
  isEmpty() {
    return !this.cartItems.length;
  }

  // Возвращает общее количество товаров в корзине
  getTotalCount() {
    return this.cartItems.reduce((acc, { count }) => acc + count, 0);
  }

  // Возвращает стоимость всех товаров в корзине
  getTotalPrice() {
    return this.cartItems.reduce(
      (acc, { product: { price }, count }) => acc + price * count,
      0
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

