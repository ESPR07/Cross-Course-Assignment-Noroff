const fullNameValue = document.querySelector("#name");
const fullNameError = document.querySelector("#cart-name-error");

const addressValue = document.querySelector("#address");
const addressError = document.querySelector("#cart-address-error");

const countryValue = document.querySelector("#country");
const countryError = document.querySelector("#cart-country-error");

const cityValue = document.querySelector("#city");
const cityError = document.querySelector("#cart-city-error");

const postalValue = document.querySelector("#postal");
const postalError = document.querySelector("#cart-postal-error");

const cardValue = document.querySelector("#card-number");
const cardError = document.querySelector("#cart-card-error");

const monthValue = document.querySelector("#month");
const monthError = document.querySelector("#cart-month-error");

const yearValue = document.querySelector("#year");
const yearError = document.querySelector("#cart-year-error");

const cvvValue = document.querySelector("#cvv");
const cvvError = document.querySelector("#cart-cvv-error");

const submitButton = document.querySelector(".contact-submit-button");

function validator(value, compareValue) {
  return value.trim().length > compareValue;
}

function emailCheck(email) {
  const pattern = /\S+@\S+\.\S+/;
  const patternMatch = pattern.test(email);
  return patternMatch;
}

submitButton.addEventListener("click", cartValidationEvent);

function cartValidationEvent(event) {
  event.preventDefault();
  if (validator(fullNameValue.value, 0)) {
    fullNameError.style.display = "none";
  } else {
    fullNameError.style.display = "block";
  }

  if (validator(addressValue.value, 0)) {
    addressError.style.display = "none";
  } else {
    addressError.style.display = "block";
  }

  if (validator(countryValue.value, 0)) {
    countryValue.style.display = "none";
  } else {
    countryError.style.display = "block";
  }

  if (validator(cityValue.value, 0)) {
    cityError.style.display = "none";
  } else {
    cityError.style.display = "block";
  }

  if (validator(postalValue.value, 0)) {
    postalError.style.display = "none";
  } else {
    postalError.style.display = "block";
  }

  if (validator(cardValue.value, 0)) {
    cardError.style.display = "none";
  } else {
    cardError.style.display = "block";
  }

  if (validator(monthValue.value, 0)) {
    monthError.style.display = "none";
  } else {
    monthError.style.display = "block";
  }

  if (validator(yearValue.value, 0)) {
    yearError.style.display = "none";
  } else {
    yearError.style.display = "block";
  }

  if (validator(cvvValue.value, 0)) {
    cvvError.style.display = "none";
  } else {
    cvvError.style.display = "block";
  }

  if (
    validator(fullNameValue.value, 0) &&
    validator(addressValue.value, 0) &&
    validator(countryValue.value, 0) &&
    validator(cityValue.value, 0) &&
    validator(postalValue.value, 0) &&
    validator(cardValue.value, 0) &&
    validator(monthValue.value, 0) &&
    validator(yearValue.value, 0) &&
    validator(cvvValue.value, 0) === true
  ) {
    location.href = "/purchase-success.html";
  }
}
