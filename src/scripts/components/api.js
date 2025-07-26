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

export const deleteCardFromServer = (cardId) => {
    fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
})
};

export const GetUserDataFromServer = (domElements) => {
return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
})
    .then(res => {
    if (res.ok) {
        return res.json();
    }
    Promise.reject(res.status);
    })
    .then ((res) => {
        domElements.user_Name.textContent = res.name;
        domElements.user_About.textContent = res.about;
        domElements.user_Avatar.style.backgroundImage = `url(${res.avatar})`;
    } )
    .catch((err) => {
    console.log(err);
})
};

export const getCardDataFromServer = (container, createCard, openImgModal, userId, deleteCardFromServer) => {
    return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
})
    .then(res => {
    if (res.ok) {
        return res.json();
    }
    Promise.reject(res.status);
    })
    .then((res) => {
        res.forEach(card => {
            const cardRendered = createCard(card, openImgModal, userId, deleteCardFromServer, likeToggleIntegratedWithServer);
            container.appendChild(cardRendered);
        });
    })
        .catch((err) => {
    console.log(err);
})
};

export const editUserProfile = (name, about, domElements) => {
    fetch(`${config.baseUrl}//users/me`, {
    method: 'PATCH',
        headers: config.headers,
    body: JSON.stringify({
        name: name,
        about: about
})})
    .then(res => res.json())
    .then((res) => {
        domElements.user_Name.textContent = res.name;
        domElements.user_About.textContent = res.about;
});
};

export const addCardOnServer = (cardName, cardLink) => {
    fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: cardName,
        link: cardLink
    })})
};

export const likeToggleIntegratedWithServer = (cardId) => {
    const likeButton = cardId.querySelector('.card__like-button');
    const likeNumber = cardId.querySelector('.card__like_namber');

    if (!likeButton.classList.contains('card__like-button_is-active')) {
            fetch(`${config.baseUrl}/cards/likes/${cardId.id}`, {
    method: 'PUT',
    headers: config.headers})
    .then(res => res.json())
    .then((res) => {
        likeNumber.textContent = res.likes.length;
    })
    } 
    else {
    fetch(`${config.baseUrl}/cards/likes/${cardId.id}`, {
    method: 'DELETE',
    headers: config.headers})
    .then(res => res.json())
    .then((res) => {
        likeNumber.textContent = res.likes.length;
    })
    };
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
