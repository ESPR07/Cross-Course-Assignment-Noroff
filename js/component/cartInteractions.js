const cart = JSON.parse(localStorage.getItem("cart"));
const cartAddedMessage = document.querySelector(".cart-message");
const cartAddedArrow = document.querySelector(".cart-message-arrow");

// Function for adding items to the cart.
export function addToCart(id, price) {
  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const totalPrice = Number(cart.totalPrice) + Number(price);
    cart.totalPrice = totalPrice;
    const itemCount = Number(cart.itemCount) + 1;
    cart.itemCount = itemCount;
    const productAmount = Number(cart.cartItems[id] ?? 0) + 1;
    cart.cartItems[id] = productAmount;
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
  cartAddedMessage.style.opacity = 1;
  cartAddedArrow.style.opacity = 1;

  setTimeout(() => {
    cartAddedMessage.style.opacity = 0;
    cartAddedArrow.style.opacity = 0;
  }, "1500");

  setTimeout(() => {
    window.location.reload();
  }, "1500");
}

// Function for removing items in the cart.
export function removeItem(id, price) {
  const totalPrice = Number(cart.totalPrice) - Number(price);
  cart.totalPrice = totalPrice;
  const itemCount = Number(cart.itemCount) - 1;
  cart.itemCount = itemCount;
  const productAmount = Number(cart.cartItems[id] ?? 1) - 1;
  cart.cartItems[id] = productAmount;
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}
