import '../pages/index.css';

const placesList = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;

function createCard (cardData) {
    const cardElement = template.cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    removeButton.addEventListener('click', function() {
        deleteCard(removeButton);
    });
    
    return cardElement;
    
}

function deleteCard (element) {
    const removeItem = element.closest('.places__item');
    removeItem.remove()
    
}

function renderCards(cards, container) {
    cards.forEach(function(card) {
        const cardRendered = createCard(card);
        container.appendChild(cardRendered);
    });
}

renderCards(initialCards, placesList);


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
