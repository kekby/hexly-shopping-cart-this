const shoppingCart = require('./index');

beforeEach(() => {
  shoppingCart.clearCart();
});

describe('shopping cart', () => {
  it('should add items to cart', () => {
    shoppingCart.addItem({
      name: 'apple',
      price: 10,
      quantity: 5,
    });

    expect(shoppingCart.items).toMatchInlineSnapshot(`
[
  {
    "name": "apple",
    "price": 10,
    "quantity": 5,
  },
]
`);
    expect(shoppingCart.total).toEqual(50);

    shoppingCart.addItem({
      name: 'banana',
      price: 8,
      quantity: 10,
    });

    expect(shoppingCart.items).toMatchInlineSnapshot(`
[
  {
    "name": "apple",
    "price": 10,
    "quantity": 5,
  },
  {
    "name": "banana",
    "price": 8,
    "quantity": 10,
  },
]
`);

    expect(shoppingCart.total).toEqual(130);
  });

  it('should throw error if item is not valid', () => {
    expect(() => shoppingCart.addItem({
      name: 'apple',
      price: 10,
    })).toThrow();
  });

  it('should remove item from cart', () => {
    shoppingCart.addItem({
      name: 'apple',
      price: 10,
      quantity: 5,
    });

    shoppingCart.addItem({
      name: 'banana',
      price: 8,
      quantity: 10,
    });

    shoppingCart.removeItem('banana');

    expect(shoppingCart.items).toMatchInlineSnapshot(`
[
  {
    "name": "apple",
    "price": 10,
    "quantity": 5,
  },
]
`);
    expect(shoppingCart.total).toEqual(50);
  });

  it('should update quantity by item name', () => {
    shoppingCart.addItem({
      name: 'apple',
      price: 10,
      quantity: 5,
    });

    shoppingCart.addItem({
      name: 'banana',
      price: 8,
      quantity: 10,
    });

    shoppingCart.updateQuantity('apple', 20);

    expect(shoppingCart.items).toMatchInlineSnapshot(`
[
  {
    "name": "apple",
    "price": 10,
    "quantity": 20,
  },
  {
    "name": "banana",
    "price": 8,
    "quantity": 10,
  },
]
`);
    expect(shoppingCart.total).toEqual(280);
  });
});
