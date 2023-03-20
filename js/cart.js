import { productList } from "./productList.js";
import { removeItem } from "./component/cartInteractions.js";
const productContainer = document.querySelector(".product-container");
const priceContainer = document.querySelector("#cart-price");
const totalPriceContainer = document.querySelector("#total-price");

const cart = JSON.parse(localStorage.getItem("cart"));

try {
  if (!cart || cart.totalPrice === 0 || cart === null) {
    var totalPrice = 0;
    productContainer.innerHTML = `<p class="empty-cart">Your cart is empty</>`;
  } else {
    totalPrice = cart.totalPrice;
    productList.forEach(({ id, description, name, color, price, image }) => {
      if (cart.cartItems[id] > 0) {
        function createProductCards() {
          const cartProduct = document.createElement("div");
          cartProduct.classList.add("cart-product");
          productContainer.appendChild(cartProduct);

          const productImage = document.createElement("img");
          productImage.src = image;
          productImage.alt = name;
          productImage.classList.add("cart-product-image");
          cartProduct.appendChild(productImage);

          const infoContainer = document.createElement("div");
          infoContainer.classList.add("cart-product-info");
          cartProduct.appendChild(infoContainer);

          const productHeader = document.createElement("h2");
          productHeader.classList.add("cart-product-header");
          productHeader.innerText = name;
          infoContainer.appendChild(productHeader);

          const productColor = document.createElement("h3");
          productColor.classList.add("cart-product-color");
          productColor.innerText = color;
          infoContainer.appendChild(productColor);

          const productDescription = document.createElement("p");
          productDescription.classList.add("cart-product-description");
          productDescription.innerText = description;
          infoContainer.appendChild(productDescription);

          const productAmount = document.createElement("p");
          productAmount.classList.add("cart-product-amount");
          productAmount.innerText = "Qty: " + cart.cartItems[id];
          infoContainer.appendChild(productAmount);

          const productPrice = document.createElement("p");
          productPrice.classList.add("cart-product-price");
          productPrice.innerText = "kr " + price;
          infoContainer.appendChild(productPrice);

          const deleteButton = document.createElement("button");
          deleteButton.classList.add("delete-button");
          deleteButton.onclick = () => removeItem(id.toString(), price);
          cartProduct.appendChild(deleteButton);
        }

        createProductCards();
      }
    });
  }
} catch (error) {
  console.log(error);
}

function createTotalPriceHTML() {
  const priceTitle = document.createElement("p");
  priceTitle.innerText = "Subtotal";
  priceContainer.appendChild(priceTitle);

  const priceValue = document.createElement("p");
  priceValue.innerText = "kr " + totalPrice;
  priceContainer.appendChild(priceValue);

  const totalPriceTitle = document.createElement("p");
  totalPriceTitle.classList.add("cart-form-total");
  totalPriceTitle.innerText = "Total";
  totalPriceContainer.appendChild(totalPriceTitle);

  const totalPriceValue = document.createElement("p");
  totalPriceValue.classList.add("cart-form-total");
  totalPriceValue.innerText = "kr " + totalPrice;
  totalPriceContainer.appendChild(totalPriceValue);
}
try {
  createTotalPriceHTML();
} catch (error) {
  console.log(error);
}
