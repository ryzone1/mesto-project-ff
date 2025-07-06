function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
})
};

function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_inactive');
} else {
        buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_inactive');
}
};

function isValid(formElement, inputElement) {
if (!inputElement.validity.valid) {
    console.log(inputElement.validationMessage);
    showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
    hideInputError(formElement, inputElement);
}
};

function showInputError(formElement, inputElement, errorMessage) {
const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
inputElement.classList.add('popup__input_error');
errorElement.textContent = errorMessage;
errorElement.classList.add('popup__input_text_error_active');
};

function hideInputError(formElement, inputElement) {
const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
inputElement.classList.remove('popup__input_error');
errorElement.classList.remove('popup__input_text_error_active');
errorElement.textContent = '';
};

function setEventListeners(formElement) {
const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
const buttonElement = formElement.querySelector('.popup__button');
toggleButtonState(inputList, buttonElement);
inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() { 
    isValid(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
    });
});
};

function enableValidation() {
const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
    setEventListeners(formElement);
});
};


export {enableValidation}