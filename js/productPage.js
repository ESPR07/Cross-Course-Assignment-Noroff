import { addToCart } from "./component/cartInteractions.js";
const container = document.querySelector(".product-wrapper");
const loader = document.querySelector("#loading");
const pageTitle = document.querySelector("title");

const fetchID = document.location.search;
const param = new URLSearchParams(fetchID);
const ID = param.get("id");

const productListURL =
  "https://sindrederaas.no/wordpress/wp-json/wc/v3/products/" + ID + "/?consumer_key=ck_4d7972ed5d4ca2cdfe859b5e29b6fa1e81cc1f03&consumer_secret=cs_4ca32af479559814cc8057f9059968429c4dd959";

async function getProduct() {
  const response = await fetch(productListURL);
  const product = await response.json();

  loader.style.display = "none";

  pageTitle.innerText = product.name;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("product-page-image-container");
  container.appendChild(imageContainer);

  const image = document.createElement("img");
  image.src = product.images[0].src;
  image.alt = product.name;
  imageContainer.appendChild(image);

  const contentContainer = document.createElement("section");
  contentContainer.classList.add("product-text-container");
  container.appendChild(contentContainer);

  const header = document.createElement("h1");
  header.innerText = product.name;
  contentContainer.appendChild(header);

  const content = document.createElement("p");
  content.innerText = product.description.replace(/<\/?[^>]+(>|$)/g, "");
  contentContainer.appendChild(content);

  const buttonWrap = document.createElement("div");
  buttonWrap.classList.add("price-button-wrap");
  contentContainer.appendChild(buttonWrap);

  const price = document.createElement("h2");
  price.innerText = "kr " + product.price;
  buttonWrap.appendChild(price);

  const buyButton = document.createElement("button");
  buyButton.title = "Buy the product";
  buyButton.classList.add("product-page-buy-button");
  buyButton.innerText = "Buy Now";
  buyButton.onclick = () => addToCart(ID.toString(), product.price);
  buttonWrap.appendChild(buyButton);
}

getProduct();
