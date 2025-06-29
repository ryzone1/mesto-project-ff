import '../pages/index.css';
import {initialCards, createCard} from './cards.js'; 
import {openModal} from './components/modal.js'; 

const placesList = document.querySelector('.places__list');

const allPage = document.querySelector('body');
const editButton = allPage.querySelector('.profile__edit-button');
const popUpEdit = allPage.querySelector('.popup_type_edit');
const addButton = allPage.querySelector('.profile__add-button');
const popUpNewCard = allPage.querySelector('.popup_type_new-card');
const formElement = allPage.querySelector("form[name='edit-profile']");
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function renderCards(cards, container) {
    cards.forEach(function(card) {
        const cardRendered = createCard(card);
        container.appendChild(cardRendered);
    });
}

renderCards(initialCards, placesList);

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
}

formElement.addEventListener('submit', handleFormSubmit);
