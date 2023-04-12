// Global elements used in the code.
import { addToCart } from "./component/cartInteractions.js";
const browseContainer = document.querySelector(".browse-container");
const loader = document.querySelector("#loading");
const searchParams = new URLSearchParams(window.location.search);
const searchValue = searchParams.get("search");

// The URL for the API in sections.
const productListBaseURL = "https://sindrederaas.no/";
const productListPath = "wordpress/wp-json/wc/v3/products/"
const productListKeys = "?consumer_key=ck_4d7972ed5d4ca2cdfe859b5e29b6fa1e81cc1f03&consumer_secret=cs_4ca32af479559814cc8057f9059968429c4dd959"

const APIURL = productListBaseURL + productListPath + productListKeys

async function getProducts() {
  try {
    const response = await fetch(APIURL);
    const result = await response.json();
  
    return result;
  } catch (error) {
    console.log(error);
    const errorHTML = document.createElement("h1");
    errorHTML.classList.add("error-message");
    errorHTML.innerText = "Oops, something went wrong!"
    browseContainer.append(errorHTML);
  }

}

function searchFilter(searchValue, result) {
  if (searchValue != "" && searchValue != null) {
    return result.filter(
      (product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.attributes[0].options[0]
          .toLowerCase()
          .includes(searchValue.toLowerCase())
    );
  }
  return result;
}

function createHTML(productListFiltered) {
  productListFiltered.forEach(({ id, name, images, attributes, price }) => {
    const image = images[0].src;
    const color = attributes[0].options[0];

    function createProductCards() {
      let productBox = document.createElement("div");
      productBox.classList.add("browse-product-box");
      browseContainer.appendChild(productBox);

      let link = document.createElement("a");
      link.href = "/product-page.html?id=" + id;
      link.title = "Read more about the " + name;
      link.classList.add("browse-product-link");
      productBox.appendChild(link);

      let imageBox = document.createElement("div");
      imageBox.classList.add("browse-product-image");
      link.appendChild(imageBox);

      let imageElement = document.createElement("img");
      imageElement.src = image;
      imageElement.alt = name;
      imageBox.appendChild(imageElement);

      let title = document.createElement("h1");
      title.innerText = name;
      link.appendChild(title);

      let colorElement = document.createElement("p");
      colorElement.innerText = color;
      link.appendChild(colorElement);

      let priceElement = document.createElement("h2");
      priceElement.innerText = "kr " + price;
      link.appendChild(priceElement);

      let cartIcon = document.createElement("button");
      cartIcon.title = "Buy " + name + "now";
      cartIcon.classList.add("browse-cart-icon");
      cartIcon.onclick = () => addToCart(id.toString(), price);
      productBox.appendChild(cartIcon);
    }
    createProductCards();
  });
}

async function createBrowsePage() {
const products = await getProducts()

loader.style.display = "none";
browseContainer.style.display = "grid";

const searchResult = searchFilter(searchValue, products);
createHTML(searchResult);
}

createBrowsePage();
