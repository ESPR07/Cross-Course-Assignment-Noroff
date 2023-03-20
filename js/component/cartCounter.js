const cartCounter = document.querySelector(".cart-counter");
const cartCounterMobile = document.querySelector(".cart-counter-mobile");

const cart = JSON.parse(localStorage.getItem("cart"));

if (!cart || cart.itemCount === 0) {
  cartCounter.innerText = 0;
  cartCounterMobile.innerText = 0;
} else {
  cartCounter.innerText = cart.itemCount;
  cartCounterMobile.innerText = cart.itemCount;
}
