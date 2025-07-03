import '../pages/index.css';
import {initialCards, createCard} from './cards.js'; 
import {openModal, closeModal} from './components/modal.js'; 

const placesList = document.querySelector('.places__list');

const allPage = document.querySelector('body');
const editButton = allPage.querySelector('.profile__edit-button');
const popUpEdit = allPage.querySelector('.popup_type_edit');
const addButton = allPage.querySelector('.profile__add-button');
const popUpNewCard = allPage.querySelector('.popup_type_new-card');
const formElement = allPage.querySelector("form[name='edit-profile']");
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const cardInputForm = allPage.querySelector("form[name='new-place']");
const cardInputName = cardInputForm.querySelector('.popup__input_type_card-name');
const cardInputSrc = cardInputForm.querySelector('.popup__input_type_url');

function renderCards(cards, container) {
    cards.forEach(function(card) {
        const cardRendered = createCard(card);
        container.appendChild(cardRendered);
    });
}

renderCards(initialCards, placesList);

function addAnimatedPopUp (page) {
    let popUpElements = page.querySelectorAll('.popup');
    popUpElements.forEach(function (elem) {
        elem.classList.add('popup_is-animated');
    })
};
addAnimatedPopUp(allPage);

editButton.addEventListener('click', function() {
    openModal(popUpEdit);
});

addButton.addEventListener('click', function() {
    openModal(popUpNewCard); 
});


function getTitleAndDescription (page) {
    const name = page.querySelector('.profile__title');
    const description = page.querySelector('.profile__description');
    let NamePopUp = page.querySelector('.popup__input_type_name');
    let descriptionPopUp = page.querySelector('.popup__input_type_description');
    NamePopUp.value = name.textContent;
    descriptionPopUp.value = description.textContent;
}
getTitleAndDescription(allPage);



function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    const name = allPage.querySelector('.profile__title');
    const description = allPage.querySelector('.profile__description');
    name.textContent = nameValue;
    description.textContent = jobValue;
    closeModal(popUpEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

function manualAddCard (evt) {
    evt.preventDefault();
    const dataStorage = [];
    const dataAdd = {
        name:  '',
        link: ''
    };
    dataAdd.name = cardInputName.value;
    dataAdd.link = cardInputSrc.value;
    dataStorage.push(dataAdd);
    renderManualCards(dataStorage, placesList);
    closeModal(popUpNewCard);
    cardInputName.value = '';
    cardInputSrc.value = '';
}

function renderManualCards(cards, container) {
    cards.forEach(function(card) {
    const cardRendered = createCard(card);
    container.insertBefore(cardRendered, container.firstChild);
    });
}

cardInputForm.addEventListener('submit', manualAddCard);