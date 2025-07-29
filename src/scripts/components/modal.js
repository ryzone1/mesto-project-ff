function openModal (domElement) {
    domElement.addEventListener('click', closeModalByClick);

    domElement.classList.add('popup_is-opened');
        setCloseByEscListener(domElement);

    const closeButton = domElement.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
        closeModal(domElement);
    }, { once: true })
};

const closeModalByClick = function (evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target);
    };
};

function setCloseByEscListener (domElement) {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal(domElement);
        }
    }, { once: true });
};

function closeModal (domElement) {
    domElement.classList.remove('popup_is-opened');
    domElement.removeEventListener('click', closeModalByClick);
};

export {openModal, closeModal}