import {openImgModal} from "../index";

function createCard (cardData, openImgHandler) {
    const template = document.querySelector('#card-template').content;
    const cardElement = template.cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const photoImg = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    removeButton.addEventListener('click', function() {
        deleteCard(removeButton);
    });
    likeButton.addEventListener('click', function () {
    likeCard(likeButton);
    });
    photoImg.addEventListener('click', function () {
        openImgHandler (cardData.link, cardData.name);
    });
    return cardElement;
};

function deleteCard (element) {
    const removeItem = element.closest('.places__item');
    removeItem.remove();
};

function likeCard (element) {
    const likeElement = element.closest('.card__like-button');
    likeElement.classList.toggle('card__like-button_is-active');
};

export  {createCard};