function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
})
};

function toggleButtonState (inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
} else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
}
};

function isValid(formElement, inputElement, config) {
if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
}
else {
    inputElement.setCustomValidity("");
};
if (!inputElement.validity.valid) {
    console.log(inputElement.validationMessage);
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
} else {
    hideInputError(formElement, inputElement, config);
}
};

function showInputError(formElement, inputElement, errorMessage, config) {
const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
inputElement.classList.add(config.inputErrorClass);
errorElement.textContent = errorMessage;
errorElement.classList.add(config.errorClass);
};

function hideInputError(formElement, inputElement, config) {
const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
inputElement.classList.remove(config.inputErrorClass);
errorElement.classList.remove(config.errorClass);
errorElement.textContent = '';
inputElement.setCustomValidity('');
};

function setEventListeners(formElement, config) {
const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
const buttonElement = formElement.querySelector(config.submitButtonSelector);
toggleButtonState(inputList, buttonElement, config);
inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() { 
    isValid(formElement, inputElement, config);
    toggleButtonState(inputList, buttonElement, config);
    });
});
};

function enableValidation(config) {
const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formElement) => {
    setEventListeners(formElement, config);
});
};

function clearValidation (form, config) {
    const formInput = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);
    formInput.forEach((inputElement) => {
        hideInputError(form, inputElement, config);
        buttonElement.classList.add(config.inactiveButtonClass);
    });
    toggleButtonState(formInput, buttonElement, config);
}

export {enableValidation, clearValidation, toggleButtonState}