// Error validation for the contact page.
const emailValue = document.querySelector("#email");
const emailError = document.querySelector(".email-form-error");

const subjectValue = document.querySelector("#subject");
const subjectError = document.querySelector(".subject-form-error");

const messageValue = document.querySelector("#message");
const messageError = document.querySelector(".message-form-error");

const formError = document.querySelector(".form-error");
const submitButton = document.querySelector(".contact-submit-button");

submitButton.addEventListener("click", contactValidationEvent);

function letterValidator(value, compareValue) {
  return value.trim().length > compareValue;
}

function numberValidator(value, limit) {
  return value === Number && value === limit;
}

function emailCheck(email) {
  const pattern = /\S+@\S+\.\S+/;
  const patternMatch = pattern.test(email);
  return patternMatch;
}

function contactValidationEvent(event) {
  event.preventDefault();
  if (emailCheck(emailValue.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (letterValidator(subjectValue.value, 0)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (letterValidator(messageValue.value, 0)) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  if (
    emailCheck(emailValue.value) &&
    letterValidator(subjectValue.value, 5) &&
    letterValidator(messageValue.value, 15) === true
  ) {
    location.href = "/contact-submit-success.html";
  }
}
