const emailValue = document.querySelector("#email");
const emailError = document.querySelector(".email-form-error");

const subjectValue = document.querySelector("#subject");
const subjectError = document.querySelector(".subject-form-error");

const messageValue = document.querySelector("#message");
const messageError = document.querySelector(".message-form-error");

const formError = document.querySelector(".form-error");
const contactButton = document.querySelector(".contact-submit-button");

contactButton.addEventListener("click", validationEvent);

function validator(value, compareValue) {
  return value.trim().length > compareValue;
}

function emailCheck(email) {
  const pattern = /\S+@\S+\.\S+/;
  const patternMatch = pattern.test(email);
  return patternMatch;
}

function validationEvent(event) {
  event.preventDefault();
  if (emailCheck(emailValue.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (validator(subjectValue.value, 0)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (validator(messageValue.value, 0)) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  if (
    emailCheck(emailValue.value) &&
    validator(subjectValue.value, 5) &&
    validator(messageValue.value, 15) === true
  ) {
    location.href = "/contact-submit-success.html";
  }
}
