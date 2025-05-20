// @todo: Темплейт карточки

const placesList = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;

function createCard (cardData, del) {
    const cardElement = template.cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    removeButton.addEventListener('click', () => deleteCardpls(del, removeButton));
    
    return cardElement;
    
}

function deleteCardpls (del, element) {
    const removeItem = element.closest('.places__item');
    removeItem.remove()
    
}

function renderCards(cards, container) {
    cards.forEach((card, del) => {
        const cardRendered = createCard(card, del);
        container.append(cardRendered);
    });
}

renderCards(initialCards, placesList);


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
