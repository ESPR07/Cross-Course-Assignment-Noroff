import { productList } from "./productList.js";
const browseContainer = document.querySelector(".browse-container");
const searchParams = new URLSearchParams(window.location.search);
const searchValue = searchParams.get("search");
let productListFiltered = productList;

if (searchValue != "" && searchValue != null) {
  productListFiltered = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.color.toLowerCase().includes(searchValue.toLowerCase())
  );
}
productListFiltered.forEach(({ id, name, color, price, image }) => {
  function createHTML() {
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
  createHTML();
});

function addToCart(id, price) {
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
