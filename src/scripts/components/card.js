function createCard (cardData, openImgHandler, userId, deleteFromServerCallback) {
    const template = document.querySelector('#card-template').content;
    const cardElement = template.cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const photoImg = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__like_namber').textContent = cardData.likes.length;
    cardElement.querySelector('.card').id = cardData._id;

    if (cardData.owner._id == userId) {
        removeButton.classList.add('card__delete-button_active');
    };

    removeButton.addEventListener('click', function() {
        deleteCard(removeButton, deleteFromServerCallback);
    });
    likeButton.addEventListener('click', function () {
    likeCard(likeButton);
    });
    photoImg.addEventListener('click', function () {
        openImgHandler (cardData.link, cardData.name);
    });
    return cardElement;
};

function deleteCard (element, deleteFromServerCallback) {
    const removeItem = element.closest('.places__item');
    deleteFromServerCallback(removeItem.id);
    removeItem.remove();
};

function likeCard (element) {
    const likeElement = element.closest('.card__like-button');
    likeElement.classList.toggle('card__like-button_is-active');
    dele
};

export  {createCard};