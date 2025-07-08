import '../pages/index.css';
import {initialCards} from './cards.js'; 
import {createCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js'; 
import {enableValidation, clearValidation} from './components/validation.js'
import {GetUserDataFromServer} from './components/api.js';

const placesList = document.querySelector('.places__list');

const allPage = document.querySelector('body');
const editButton = allPage.querySelector('.profile__edit-button');
const popUpEdit = allPage.querySelector('.popup_type_edit');
const addButton = allPage.querySelector('.profile__add-button');
const popUpNewCard = allPage.querySelector('.popup_type_new-card');
const formEditProfile = allPage.querySelector("form[name='edit-profile']");
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const cardInputForm = allPage.querySelector("form[name='new-place']");
const cardInputName = cardInputForm.querySelector('.popup__input_type_card-name');
const cardInputSrc = cardInputForm.querySelector('.popup__input_type_url');


const userDataConfig = {
    user_Name: allPage.querySelector('.profile__title'),
    user_About: allPage.querySelector('.profile__description'),
    user_Avatar: allPage.querySelector('.profile__image'),
};

const inputConfig = {
    profileNameInput: allPage.querySelector('.popup__input_type_name'),
    profileDescriptionInput: allPage.querySelector('.popup__input_type_description'),
};

const ValidationConfig = {
formSelector: '.popup__form',
inputSelector: '.popup__input',
submitButtonSelector: '.popup__button',
inactiveButtonClass: 'popup__button_inactive',
inputErrorClass: 'popup__input_error',
errorClass: 'popup__input_text_error_active'
};

GetUserDataFromServer(userDataConfig);


function renderCards(cards, container) {
    cards.forEach(function(card) {
        const cardRendered = createCard(card, openImgModal);
        container.appendChild(cardRendered);
    });
};

renderCards(initialCards, placesList);

function openImgModal (src, name) {
    const popUp = document.querySelector('.popup_type_image');
    const img = popUp.querySelector('.popup__image');
    const text = popUp.querySelector('.popup__caption');
    openModal(popUp);
    img.src = src;
    img.alt = name;
    text.textContent = name;
};

function addAnimatedPopUp (page) {
    let popUpElements = page.querySelectorAll('.popup');
    popUpElements.forEach(function (elem) {
        elem.classList.add('popup_is-animated');
    })
};

    addAnimatedPopUp(allPage);

    editButton.addEventListener('click', function() {
    clearValidation(formEditProfile, ValidationConfig);
    fillInputFields(allPage);
    openModal(popUpEdit);
});

addButton.addEventListener('click', function() {
    openModal(popUpNewCard); 
});


function fillInputFields (page) {
    const name = page.querySelector('.profile__title');
    const description = page.querySelector('.profile__description');
    nameInput.value = name.textContent;
    jobInput.value = description.textContent;
};

function submitEditProfileForm(evt) {
    evt.preventDefault();
    const nameValue = inputConfig.profileNameInput.value;
    const jobValue = inputConfig.profileDescriptionInput.value;
    const name = userDataConfig.user_Name;
    const description = userDataConfig.user_About;
    name.textContent = nameValue;
    description.textContent = jobValue;
    closeModal(popUpEdit);
};

formEditProfile.addEventListener('submit', submitEditProfileForm);

function manualAddCard (evt) {
    evt.preventDefault();
    const dataAdd = {
        name:  '',
        link: ''
    };
    dataAdd.name = cardInputName.value;
    dataAdd.link = cardInputSrc.value;
    renderManualCards([dataAdd], placesList);
    closeModal(popUpNewCard);
    cardInputForm.reset();
    clearValidation(cardInputForm, ValidationConfig);
};

function renderManualCards(cards, container) {
    cards.forEach(function(card) {
    const cardRendered = createCard(card, openImgModal);
    container.insertBefore(cardRendered, container.firstChild);
    });
};

cardInputForm.addEventListener('submit', manualAddCard);

enableValidation(ValidationConfig);
