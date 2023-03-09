const emailValue = document.querySelector("#email");
const emailError = document.querySelector(".email-form-error");

const subjectValue = document.querySelector("#subject")
const subjectError = document.querySelector(".subject-form-error");

const messageValue = document.querySelector("#message");
const messageError = document.querySelector(".message-form-error");

const formError = document.querySelector(".form-error");
const contactButton = document.querySelector(".contact-submit-button");

contactButton.addEventListener("click", validator);

function validator() {
    if(emailValue. < 0) {
        emailError.style.display = block;
    }   else {
        emailError.style.display = none;
    }
}

