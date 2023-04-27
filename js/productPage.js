import { addToCart } from "./component/cartInteractions.js";
const container = document.querySelector(".product-wrapper");
const loader = document.querySelector("#loading");
const pageTitle = document.querySelector("title");
const featuredContainer = document.querySelector(".featured-section");

const fetchID = document.location.search;
const param = new URLSearchParams(fetchID);
const ID = param.get("id");

const productListBaseURL = "https://sindrederaas.no/";
const productListPath = "wordpress/wp-json/wc/v3/products/";
const productListKeys = "/?consumer_key=ck_4d7972ed5d4ca2cdfe859b5e29b6fa1e81cc1f03&consumer_secret=cs_4ca32af479559814cc8057f9059968429c4dd959"
const singleAPIURL = productListBaseURL + productListPath + ID + productListKeys;
const APIURL = productListBaseURL + productListPath + productListKeys;

async function getSingleProduct() {
  try {

    const response = await fetch(singleAPIURL);
    const product = await response.json();
    return product;
  
  } catch (error) {

    console.log(error);
    const errorHTML = document.createElement("h1");
    errorHTML.classList.add("error-message");
    errorHTML.innerText = "Oops, something went wrong!"
    container.append(errorHTML);
  
  }

}

async function getFeaturedProducts() {
  try {

    const response = await fetch(APIURL);
    const products = await response.json();
    return products;
  
  } catch (error) {

    console.log(error);
    const errorHTML = document.createElement("h1");
    errorHTML.classList.add("error-message");
    errorHTML.innerText = "Oops, something went wrong!"
    container.append(errorHTML);
  
  }

}

function createHTML(product) {

  pageTitle.innerText = product.name

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
    
  const productPrice = document.createElement("h2");
  productPrice.innerText = "kr " + product.price;
  buttonWrap.appendChild(productPrice);
    
  const buyButton = document.createElement("button");
  buyButton.title = "Buy the product";
  buyButton.classList.add("product-page-buy-button");
  buyButton.innerText = "Buy Now";
  buyButton.onclick = () => addToCart(ID.toString(), product.price);
  buttonWrap.appendChild(buyButton);
}

function createFeatured(products){
  const featuredTitle = document.createElement("h1");
  featuredTitle.classList.add("featured-title");
  featuredTitle.innerText = "Featured Products:";
  featuredContainer.append(featuredTitle);

  const featuredWrapper = document.createElement("div");
      featuredWrapper.classList.add("featured-container");
      featuredContainer.append(featuredWrapper);

  products.forEach(({id, featured, name, price, images}) => {
    const image = images[0].src;

    if(featured === true && id != Number(ID)) {

      const featuredProduct = document.createElement("a");
      featuredProduct.classList.add("featured-product");
      featuredProduct.href = "/product-page.html?id="+id;
      featuredWrapper.append(featuredProduct);

      const featuredProductImage = document.createElement("img");
      featuredProductImage.src = image;
      featuredProductImage.alt = name;
      featuredProduct.append(featuredProductImage);

      const featuredHeader = document.createElement("p");
      featuredHeader.classList.add("featured-header");
      featuredHeader.innerText = name;
      featuredProduct.append(featuredHeader);

      const featuredPrice = document.createElement("p");
      featuredPrice.classList.add("featured-price");
      featuredPrice.innerText = "kr " + price;
      featuredProduct.append(featuredPrice);
    }
  });
}


async function createPage() {
const apiFetch = await getFeaturedProducts();
const singleAPIFetch = await getSingleProduct();

loader.style.display = "none";

createHTML(singleAPIFetch);
createFeatured(apiFetch);
}

createPage();
