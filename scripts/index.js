// @todo: Темплейт карточки

const placesList = document.querySelector('.places__list');

function createCard (cardData, deleteCard) {
    const template = document.querySelector('#card-template').content;
    const cardElement = template.cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;

    deleteCard = deleteCardpls ()
    removeButton.addEventListener('click', deleteCardpls)

    return cardElement;
}

function deleteCardpls () {
    console.log('Мы кликнули по элементу');
    
}

function renderCards (cards, container) {
    cards.forEach (function(card) {
        const cardRendered = createCard(card);
        container.append(cardRendered);
    })
}

renderCards(initialCards, placesList);


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
