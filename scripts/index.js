// @todo: Темплейт карточки

const placesList = document.querySelector('.places__list');

function createCard (cardData) {
    const template = document.querySelector('#card-template').content; // нашел шаблон
    const cardElement = template.cloneNode(true); //склонировал шаблон

    cardElement.querySelector('.card__title').textContent = cardData.name; // в склонированном шаблоне нашел элемент .card_title и добавил текст из шаблонной карточки
    cardElement.querySelector('.card__image').src = cardData.link; // в склонированном шаблоне нашел элемент картинку и задал атрибут срц из шаблонной карточки



    return cardElement;
}

function renderCards (cards, container) {
    cards.forEach (function(card) {
        const cardRendered = createCard(card, null);
        container.append(cardRendered);
    })
}

renderCards(initialCards, placesList);


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
