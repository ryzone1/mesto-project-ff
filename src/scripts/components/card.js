function createCard (cardData, openImgHandler, userId, deleteFromServerCallback, dislikeServeCallback, likeServerCallback) {
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

    if (currentUserLiked(cardData.likes, userId)) {
        likeButton.classList.add('card__like-button_is-active');
    };

    removeButton.addEventListener('click', function() {
        deleteCard(removeButton, deleteFromServerCallback);
    });
    likeButton.addEventListener('click', function () {
        likeCard(likeButton, dislikeServeCallback, likeServerCallback);
    });
    photoImg.addEventListener('click', function () {
        openImgHandler (cardData.link, cardData.name);
    });
    return cardElement;
};

function deleteCard (element, deleteFromServerCallback) {
    const removeItem = element.closest('.places__item');
    deleteFromServerCallback(removeItem.id)
    .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
        removeItem.remove();
}); 
};

function likeCard (element, dislike, like) {
    const likeElement = element.closest('.card__like-button');
    const cardElement = element.closest('.places__item');
    const likeNumber = cardElement.querySelector('.card__like_namber');
    if (!likeElement.classList.contains('card__like-button_is-active')) {
        like(cardElement.id)
        .then((data) => {
            likeNumber.textContent = data.likes.length;
            likeElement.classList.add('card__like-button_is-active');
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }
    else {
        dislike(cardElement.id)
        .then((data) => {
            likeNumber.textContent = data.likes.length;
            likeElement.classList.remove('card__like-button_is-active');
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }
};

function currentUserLiked (array, id) {
    let isLiked = false;
    array.forEach(obj => {
        if (obj._id === id) {
            isLiked = true;
        }
    })
    return isLiked;
};

export  {createCard};