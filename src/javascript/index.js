import "../styles/index.css";

const submitFormButton = document.querySelector("button.form_submit");

const emailObj = {
  selector: document.querySelector("input#email"),
  errorSelector: document.querySelector(".error_field.email"),
  regExp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  errorMessage: "Email requires: x@y.z",
};

const countryObj = {
  selector: document.querySelector("input#country"),
  errorSelector: document.querySelector(".error_field.country"),
  regExp: /^[A-Za-z\s]{1,50}$/,
  errorMessage:
    "Country requires: uppercase or lowercase alphabets, up to 50 characters",
};

const zipCodeObj = {
  selector: document.querySelector("input#zip_code"),
  errorSelector: document.querySelector(".error_field.zip_code"),
  regExp: /^\d{5}(?:[-\s]\d{4})?$/,
  errorMessage:
    "ZIP code requires: five digits, optionally followed by hyphen or space then four digits",
};

const passwordObj = {
  selector: document.querySelector("input#password"),
  errorSelector: document.querySelector(".error_field.password"),
  regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  errorMessage:
    "Password requires: at least one lowercase letter, one uppercase letter, one digit, and is at least 8 characters long",
};

const passwordConfirmObj = {
  selector: document.querySelector("input#password_confirm"),
  errorSelector: document.querySelector(".error_field.password_confirm"),
  regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  errorMessage:
    "Password confirmation requires: The passwords should be the same",
};

const formFieldObjList = [
  emailObj,
  countryObj,
  zipCodeObj,
  passwordObj,
  passwordConfirmObj,
];

function isValidFunc(inputObj) {
  const isValid =
    // inputObj.selector.value.length === 0 ||
    inputObj.regExp.test(inputObj.selector.value);
  return isValid;
}

function isConfirmPasswordValid() {
  return (
    passwordObj.selector.value === passwordConfirmObj.selector.value &&
    isValidFunc(passwordConfirmObj)
  );
}

function inputEventListenerFunction(inputObj) {
  if (inputObj.selector === passwordConfirmObj.selector) {
    const isValid = isConfirmPasswordValid();

    if (isValid) {
      inputObj.selector.className = "valid";
      inputObj.errorSelector.innerHTML = "";
    } else {
      inputObj.selector.className = "invalid";
      inputObj.errorSelector.innerHTML = inputObj.errorMessage;
    }

    return;
  }

  const isValid = isValidFunc(inputObj);
  if (isValid) {
    inputObj.selector.className = "valid";
    inputObj.errorSelector.innerHTML = "";
  } else {
    inputObj.selector.className = "invalid";
    inputObj.errorSelector.innerHTML = inputObj.errorMessage;
  }
}

formFieldObjList.forEach((formFieldObj) => {
  formFieldObj.selector.addEventListener("input", () => {
    inputEventListenerFunction(formFieldObj);
  });
});

submitFormButton.addEventListener("click", (event) => {
  event.preventDefault();

  let isEverythingValid = true;

  formFieldObjList.forEach((formFieldObj) => {
    inputEventListenerFunction(formFieldObj);
    if (!isValidFunc(formFieldObj)) {
      isEverythingValid = false;
    }
  });

  if (isEverythingValid) {
    alert("your form is good to go");
    formFieldObjList.forEach((formFieldObj) => {
      formFieldObj.selector.value = "";
      formFieldObj.selector.className = "";
    });
  }
});
