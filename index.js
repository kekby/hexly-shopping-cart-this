const validateItem = (item) => {
  const keys = ['name', 'price', 'quantity'];

  return keys.every((key) => key in item);
};

const shoppingCart = {
  items: [],
  total: 0,
  addItem(item) {
    const isValidItem = validateItem(item);

    if (!isValidItem) {
      throw new Error('item is not valid');
    }

    // метод removeItem должен принимать name товара,
    // соответственно нужно убедиться, что name должен быть уникальным (типа primary key)
    const itemIndex = this.items.findIndex((itemInCart) => itemInCart.name === item.name);

    if (itemIndex !== -1) {
      const cartItem = this.items[itemIndex];
      if (item.price !== cartItem.price) console.warn(`price doesnt match with item in cart, overriding current price: ${cartItem.price} with ${item.price}`);

      const newItem = {
        name: cartItem.name,
        price: item.price,
        quantity: cartItem.quantity + item.quantity,
      };

      this.items[itemIndex] = newItem;
    } else {
      this.items.push(item);
    }

    this.calculateTotal();
  },

  removeItem(name) {
    const itemToRemoveIndex = this.items.findIndex((item) => item.name === name);

    if (itemToRemoveIndex === -1) {
      console.error('item with given name is not found in cart');
      return;
    }

    this.items.splice(itemToRemoveIndex, 1);
    this.calculateTotal();
  },

  updateQuantity(name, newQuantity) {
    const itemToUpdateIndex = this.items.findIndex((item) => item.name === name);

    if (itemToUpdateIndex === -1) {
      console.error('item with given name is not found in cart');
      return;
    }

    this.items[itemToUpdateIndex] = {
      ...this.items[itemToUpdateIndex],
      quantity: newQuantity,
    };

    this.calculateTotal();
  },

  clearCart() {
    this.items = [];
    this.total = 0;
  },

  calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
};

module.exports = shoppingCart;
