import {openModal} from './components/modal.js';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

function createCard (cardData) {
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
  })
  photoImg.addEventListener('click', function () {
    openModal();
  })
  
  return cardElement;
}

function deleteCard (element) {
  const removeItem = element.closest('.places__item');
  removeItem.remove()
}

function likeCard (element) {
  const likeElement = element.closest('.card__like-button');
  likeElement.className += ' card__like-button_is-active';

}

export {initialCards, createCard};