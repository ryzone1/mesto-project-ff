const cohortId = 'wff-cohort-42';
const token = '97973811-dc29-406f-aaec-08ad8ee54de0';

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

export const getCardDataFromServer = () => {
    return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
})
    .then(getResponseData)
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

export const updateUserAvatar = (src) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
        headers: config.headers,
    body: JSON.stringify({
        avatar: src.value
})})
    .then(getResponseData)
};
