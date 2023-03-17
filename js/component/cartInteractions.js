const cart = JSON.parse(localStorage.getItem("cart"));

// Function for adding items to the cart.
export function addToCart(id, price) {
  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const totalPrice = Number(cart.totalPrice) + price;
    cart.totalPrice = totalPrice;
    const itemCount = Number(cart.itemCount) + 1;
    cart.itemCount = itemCount;
    const productAmount = Number(cart.cartItems[id] ?? 0) + 1;
    cart.cartItems[id] = productAmount;
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    const cartObject = {
      totalPrice: price,
      itemCount: 1,
      cartItems: {},
    };
    cartObject.cartItems[id] = 1;
    localStorage.setItem("cart", JSON.stringify(cartObject));
  }
  window.location.reload();
}

// Function for removing items in the cart.
export function removeItem(id, price) {
  const totalPrice = Number(cart.totalPrice) - price;
  cart.totalPrice = totalPrice;
  const itemCount = Number(cart.itemCount) - 1;
  cart.itemCount = itemCount;
  const productAmount = Number(cart.cartItems[id] ?? 1) - 1;
  cart.cartItems[id] = productAmount;
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}
