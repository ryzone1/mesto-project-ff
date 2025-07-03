function openModal (domElement) {
    domElement.addEventListener('click', function (evt) {
        if (evt.target === evt.currentTarget) {
            closeModal(domElement);
        };
    }, { once: true });
    if (!domElement.classList.contains('popup_is-opened')) {
        domElement.classList.add('popup_is-opened');};
        if (domElement.classList.contains('popup_is-opened')) {
            closeModalByEsc(domElement);
        };
    const closeButton = domElement.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
        closeModal(domElement);
    }, { once: true })
};

function closeModalByEsc (domElement) {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal(domElement);
        }
    }, { once: true });
}

function closeModal (domElement) {
    domElement.classList.remove('popup_is-opened');
};

function openImgModal (src, name) {
    const popUp = document.querySelector('.popup_type_image');
    const img = popUp.querySelector('.popup__image');
    const text = popUp.querySelector('.popup__caption');
    const closeButton = popUp.querySelector('.popup__close');
    popUp.classList.add('popup_is-animated', 'popup_is-opened');
    img.src = src;
    text.textContent = name;
    closeButton.addEventListener('click', function () {
        closeModal(popUp);
    })
    if (popUp.classList.contains('popup_is-opened')) {
        closeModalByEsc(popUp);
    };
    popUp.addEventListener('click', function (evt) {
        if (evt.target === evt.currentTarget) {
            closeModal(popUp);
        };
    })
};

export {openModal, closeModal, openImgModal}