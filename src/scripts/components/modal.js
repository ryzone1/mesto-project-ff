function openModal (domElement) {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal(domElement);
        }
    }, { once: true }); //должно работать как удаление при закрытии модального окна, по крайней мере, девтулс тоже так считает
    if (!domElement.classList.contains('popup_is-opened')) {
        domElement.classList.add('popup_is-opened');

        const closeButton = domElement.querySelector('.popup__close');
        closeButton.addEventListener ('click', function () {
            closeModal(domElement);
        }, { once: true })
}};

function closeModal (domElement) {
    if (domElement.classList.contains('popup_is-opened')) {
    domElement.classList.remove('popup_is-opened');
}
};


export {openModal}