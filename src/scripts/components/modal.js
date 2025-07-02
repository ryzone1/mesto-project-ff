function openModal (domElement) {
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

export {openModal, closeModal, closeModalByEsc,}