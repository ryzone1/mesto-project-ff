const cohortId = 'wff-cohort-42';
const token = '97973811-dc29-406f-aaec-08ad8ee54de0';
export const userId = '7e7d247302222c81991c19dd';

const config = {
baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
headers: {
    authorization: token,
    'Content-Type': 'application/json'
}
};

function getResponseData (res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

export const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
})
    .then(getResponseData)
};

export const getUserDataFromServer = () => {
return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
})
    .then(getResponseData)
};

export const getCardDataFromServer = (container, createCard, openImgModal, userId, deleteCardFromServer, dislikeCallback, likeCallback) => {
    return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
})
    .then(getResponseData)
    .then((res) => {
        res.forEach(card => {
            const cardRendered = createCard(card, openImgModal, userId, deleteCardFromServer, dislikeCallback, likeCallback);
            container.appendChild(cardRendered);
        });
    })
};

export const editUserProfile = (name, about) => {
    return fetch(`${config.baseUrl}//users/me`, {
    method: 'PATCH',
        headers: config.headers,
    body: JSON.stringify({
        name: name,
        about: about
})})
    .then(getResponseData)
};

export const addCardOnServer = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: cardName,
        link: cardLink
    })})
    .then(getResponseData)
};

export const likeServerRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers})
    .then(getResponseData)
};


export const dislikeServerRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers})
    .then(getResponseData)
};

export const submitUserAvatar = (src, page) => {
    const avatar = page.querySelector('.profile__image');
    fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
        headers: config.headers,
    body: JSON.stringify({
        avatar: src.value
})})
    .then(res => res.json())
    .then((res) => {
        avatar.style.backgroundImage =`url(${src.value})`
});
}
