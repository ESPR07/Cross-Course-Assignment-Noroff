const searchForm = document.querySelector("form");
const searchButton = document.querySelector(".search-icon");
const browseURL = "/browse-page.html";

searchForm.addEventListener("submit", (updateValue));

function updateValue(event) {
    const searchValue = event.target.querySelector("#search-bar").value;
    searchForm.action = browseURL + "?search=" + searchValue;
}