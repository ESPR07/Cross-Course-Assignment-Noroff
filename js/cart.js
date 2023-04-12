const productListBaseURL = "https://sindrederaas.no/";
const productListPath = "wordpress/wp-json/wc/v3/products/";
const productListKeys = "?consumer_key=ck_4d7972ed5d4ca2cdfe859b5e29b6fa1e81cc1f03&consumer_secret=cs_4ca32af479559814cc8057f9059968429c4dd959";
const APIURL = productListBaseURL + productListPath + productListKeys;

import { removeItem } from "./component/cartInteractions.js";
const productContainer = document.querySelector(".product-container");
const priceContainer = document.querySelector("#cart-price");
const totalPriceContainer = document.querySelector("#total-price");
var totalPrice = 0


const cart = JSON.parse(localStorage.getItem("cart"));

async function getProducts() {
  try {

    const response = await fetch(APIURL);
    const products = await response.json();
  
    return products;

  } catch (error) {

    console.log(error);
    const errorHTML = document.createElement("h1");
    errorHTML.classList.add("error-message");
    errorHTML.innerText = "Oops, something went wrong!"
    productContainer.append(errorHTML);

  }

}

function createProductsHTML(products) {
  if (!cart || cart.totalPrice === 0 || cart === null) {
    productContainer.innerHTML = `<p class="empty-cart">Your cart is empty</>`;
  } else {
    totalPrice = cart.totalPrice;
    products.forEach(
      ({ id, description, name, attributes, price, images }) => {
        if (cart.cartItems[id] > 0) {
          function createProductCards() {
            const cartProduct = document.createElement("div");
            cartProduct.classList.add("cart-product");
            productContainer.appendChild(cartProduct);

            const productImage = document.createElement("img");
            productImage.src = images[0].src;
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
            productColor.innerText = attributes[0].options[0];
            infoContainer.appendChild(productColor);

            const productDescription = document.createElement("p");
            productDescription.classList.add("cart-product-description");
            productDescription.innerText = description.replace(
              /<\/?[^>]+(>|$)/g,
              ""
            );
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
            deleteButton.onclick = () =>
              removeItem(id.toString(), price);
            cartProduct.appendChild(deleteButton);
          }

          createProductCards();
        }
      }
    );
  }
}


function totalPriceHTML() {
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

async function createPage() {
  const fetchProducts = await getProducts();

  createProductsHTML(fetchProducts);
  totalPriceHTML();
}

createPage();
