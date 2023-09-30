const body = document.querySelector('body');
const cards = document.querySelectorAll(".figure-friends");
const btnLearn = document.querySelectorAll(".btn-learn-more");
const closePopupBtn = document.querySelector('.close-popup-btn');
const modalPopup = document.querySelector('.modal-popup');
const modalWindow = document.querySelector('.modal-window');
const imgPopup = document.querySelector('.img-popup');
const typeBreed = document.querySelector('.type-breed');
const modalName = document.querySelector('.name');
const modalDescription = document.querySelector('.description');
const modalAge = document.querySelector('.age');
const modalInoculations = document.querySelector('.inoculations');
const modalDiseases = document.querySelector('.diseases');
const modalParasites = document.querySelector('.parasites');

async function getCardInfo(cardIndex) {
    const res = await fetch("../main/pets.json");
    const data = await res.json();
    const card = data[cardIndex]
    imgPopup.innerHTML = `<img src=${card.img} width=350 height=350>`
    modalName.textContent = card.name;
    typeBreed.textContent = `${card.type} - ${card.breed}`;
    modalDescription.textContent = card.description;
    modalAge.textContent = card.age;
    modalInoculations.textContent = card.inoculations.join(', ');
    modalDiseases.textContent = card.diseases.join(', ');
    modalParasites.textContent = card.parasites.join(', ');
}

function closeModal(event) {
    event.addEventListener('click', () => {
        modalWindow.style.display = 'none';
        body.classList.remove('-active');
    })
}

function showModal(event) {
    event.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            modalWindow.style.display = 'block';
            body.classList.add('-active');
            getCardInfo(i);
        });
    });
}

showModal(btnLearn)
showModal(cards)
closeModal(closePopupBtn)
closeModal(modalWindow)
modalPopup.addEventListener('click', (e) => {
    e.stopPropagation();
});