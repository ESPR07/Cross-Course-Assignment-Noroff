import { productList } from "./productList.js";
const browseContainer = document.querySelector(".browse-container");

for (let i = 0; i < productList.length; i++) {
    function createHTML() {
        let productBox = document.createElement("div");
        productBox.classList.add("browse-product-box");
        browseContainer.appendChild(productBox);

        let link = document.createElement("a");
        link.href = "/product-page.html?id=" + productList[i].id;
        link.title = "Read more about the " + productList[i].name;
        link.classList.add("browse-product-link");
        productBox.appendChild(link);

        let imageBox = document.createElement("div");
        imageBox.classList.add("browse-product-image");
        link.appendChild(imageBox);

        let image = document.createElement("img");
        image.src = productList[i].image;
        image.alt = productList[i].name;
        imageBox.appendChild(image);

        let title = document.createElement("h1");
        title.innerText = productList[i].name;
        link.appendChild(title);

        let color = document.createElement("p");
        color.innerText = productList[i].color;
        link.appendChild(color);

        let price = document.createElement("h2");
        price.innerText = "kr " + productList[i].price;
        link.appendChild(price);

        let cartIcon = document.createElement("a");
        cartIcon.href = "/cart.html";
        cartIcon.title = "Buy " + productList[i].name + "now";
        cartIcon.classList.add("browse-cart-icon");
        productBox.appendChild(cartIcon);

    }
    console.log(productList[i]);
    createHTML();
}

