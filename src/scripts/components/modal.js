function openModal (domElement) {
    domElement.addEventListener('click', function (evt) {
        if (evt.target === evt.currentTarget) {
            closeModal(domElement);
        };
    }, { once: true });
        domElement.classList.add('popup_is-opened');
            setCloseByEscListener(domElement);
    const closeButton = domElement.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
        closeModal(domElement);
    }, { once: true })
};

function setCloseByEscListener (domElement) {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal(domElement);
        }
    }, { once: true });
}

function closeModal (domElement) {
    domElement.classList.remove('popup_is-opened');
};

export {openModal, closeModal}