import '../pages/index.css';
import {
    createCard
} from './components/card.js';
import {
    openModal,
    closeModal
} from './components/modal.js';
import {
    enableValidation,
    clearValidation
} from './components/validation.js'
import {
    getUserDataFromServer,
    getCardDataFromServer,
    editUserProfile,
    addCardOnServer,
    deleteCardFromServer,
    updateUserAvatar,
    likeServerRequest,
    dislikeServerRequest
} from './components/api.js';

// Переменные и объекты

const placesList = document.querySelector('.places__list');

const allPage = document.querySelector('body');
const editButton = allPage.querySelector('.profile__edit-button');
const popUpEdit = allPage.querySelector('.popup_type_edit');
const addButton = allPage.querySelector('.profile__add-button');
const popUpNewCard = allPage.querySelector('.popup_type_new-card');
const formEditProfile = allPage.querySelector("form[name='edit-profile']");
const formEditAvatar = allPage.querySelector("form[name='edit-avatar']")
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const avatarInput = formEditAvatar.querySelector('.popup__input_type_avatar');
const cardInputForm = allPage.querySelector("form[name='new-place']");
const cardInputName = cardInputForm.querySelector('.popup__input_type_card-name');
const cardInputSrc = cardInputForm.querySelector('.popup__input_type_url');
const avatarEditButton = allPage.querySelector('.avatar_edit');
const avatarEditPopUp = allPage.querySelector('.popup_type_edit_avatar');

const userDataConfig = {
    user_Name: allPage.querySelector('.profile__title'),
    user_About: allPage.querySelector('.profile__description'),
    user_Avatar: allPage.querySelector('.profile__image'),
    user_Id: ''
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

// Функции

const renderProfileData = () => {
    getUserDataFromServer()
        .then((data) => {
            userDataConfig.user_Name.textContent = data.name;
            userDataConfig.user_About.textContent = data.about;
            userDataConfig.user_Avatar.style.backgroundImage = `url(${data.avatar})`;
            userDataConfig.user_Id = data._id;
        })
        .catch(err => console.log(`Ошибка: ${err}`))
};

const renderCards = () => {
    Promise.all([getCardDataFromServer(), getUserDataFromServer()])
        .then((data) => {
            data[0].forEach(card => {
                const cardRendered = createCard(card, openImgModal, data[1]._id, deleteCardFromServer, dislikeServerRequest, likeServerRequest);
                placesList.appendChild(cardRendered);
            });
        })
        .catch(err => console.log(`Ошибка: ${err}`));
};

function openImgModal(src, name) {
    const popUp = document.querySelector('.popup_type_image');
    const img = popUp.querySelector('.popup__image');
    const text = popUp.querySelector('.popup__caption');
    openModal(popUp);
    img.src = src;
    img.alt = name;
    text.textContent = name;
};

function addAnimatedPopUp(page) {
    let popUpElements = page.querySelectorAll('.popup');
    popUpElements.forEach(function(elem) {
        elem.classList.add('popup_is-animated');
    })
};

function savingProgressCaption(element) {
    let button = element.querySelector('.popup__button');
    button.textContent = 'Сохранение...'
};

function savedCaption(element) {
    let button = element.querySelector('.popup__button');
    button.textContent = 'Сохранить'
};

function submitAvatar(evt) {
    evt.preventDefault();
    savingProgressCaption(evt.target);
    updateUserAvatar(avatarInput)
    .then((data) => {
        userDataConfig.user_Avatar.style.backgroundImage = `url(${inputConfig.profileDescriptionInput.value})`;
    })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
            closeModal(avatarEditPopUp);
            savedCaption(evt.target);
        });
}

function fillInputFields(page) {
    const name = page.querySelector('.profile__title');
    const description = page.querySelector('.profile__description');
    nameInput.value = name.textContent;
    jobInput.value = description.textContent;
};


function submitEditProfileForm(evt) {
    evt.preventDefault();
    savingProgressCaption(evt.target);
    editUserProfile(inputConfig.profileNameInput.value, inputConfig.profileDescriptionInput.value)
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
        evt.target.reset;
        clearValidation(evt.target);
        closeModal(popUpEdit);
        savedCaption(evt.target);
    });
};

function manualAddCard(evt) {
    evt.preventDefault();
    savingProgressCaption(evt.target);
    addCardOnServer(cardInputName.value, cardInputSrc.value)
        .then((data) => {
            placesList.prepend(createCard(data, openImgModal, userDataConfig.user_Id, deleteCardFromServer, dislikeServerRequest, likeServerRequest))
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
            closeModal(popUpNewCard);
            savedCaption(evt.target);
            cardInputForm.reset();
            clearValidation(cardInputForm, ValidationConfig);
        });
};

// лисинеры

avatarEditButton.addEventListener('click', function() {
    openModal(avatarEditPopUp);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);

formEditAvatar.addEventListener('submit', submitAvatar);

editButton.addEventListener('click', function() {
    clearValidation(formEditProfile, ValidationConfig);
    fillInputFields(allPage);
    openModal(popUpEdit);
});

addButton.addEventListener('click', function() {
    openModal(popUpNewCard);
});

cardInputForm.addEventListener('submit', manualAddCard);

//вызовы 

renderCards();

renderProfileData();

addAnimatedPopUp(allPage);

enableValidation(ValidationConfig);