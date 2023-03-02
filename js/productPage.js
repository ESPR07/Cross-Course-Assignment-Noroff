import { productList } from "./productList.js";

const fetchID = document.location.search;
const param = new URLSearchParams(fetchID);
const ID = param.get("id");

let product = productList.find(id => ID);

console.log(product);