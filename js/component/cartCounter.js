const cartCounter = document.querySelector(".cart-counter");

const cart = JSON.parse(localStorage.getItem("cart"));

if (!cart || cart.itemCount === 0) {
  cartCounter.innerText = 0;
} else {
  cartCounter.innerText = cart.itemCount;
}
