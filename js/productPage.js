import { productList } from "./productList.js";
const container = document.querySelector(".product-wrapper");

const fetchID = document.location.search;
const param = new URLSearchParams(fetchID);
const ID = param.get("id");

const product = productList.find(product => product.id === ID);

const imageContainer = document.createElement("div");
imageContainer.classList.add("product-page-image-container");
container.appendChild(imageContainer);

const image = document.createElement("img");
image.src = product.image;
image.alt = product.name;
imageContainer.appendChild(image);

const contentContainer = document.createElement("section");
contentContainer.classList.add("product-text-container");
container.appendChild(contentContainer);

const header = document.createElement("h1");
header.innerText = product.name;
contentContainer.appendChild(header);

const content = document.createElement("p");
content.innerText = product.description;
contentContainer.appendChild(content);

const buttonWrap = document.createElement("div");
buttonWrap.classList.add("price-button-wrap");
contentContainer.appendChild(buttonWrap);

const price = document.createElement("h2");
price.innerText = "kr " + product.price;
buttonWrap.appendChild(price);

const buyButton = document.createElement("a");
buyButton.href = "/cart.html";
buyButton.title = "Buy the product";
buyButton.classList.add("product-page-buy-button");
buyButton.innerText = "Buy Now"
buttonWrap.appendChild(buyButton);