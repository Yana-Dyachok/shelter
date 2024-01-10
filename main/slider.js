import { showModal } from '../main/popup.js';
const sliderContainer = document.querySelector('.slider-wraper');
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let amount = calculateAmount(); 
function calculateAmount() {
  return Math.floor(slider.clientWidth / 270);
}

function updateAmountOnResize() {
  amount = calculateAmount();
}

window.addEventListener('resize', updateAmountOnResize);

async function changeCards(cardIndex, i) {
    const res = await fetch('../main/pets.json');
    const data = await res.json();
    const card = data[cardIndex];
    document.querySelectorAll('.img-friends')[i].setAttribute('src', card.img);
    document.querySelectorAll('.img-friends')[i].id = `${i}${cardIndex}${i}${i}`;
    document.querySelectorAll('.figcaption-friends')[i].textContent = card.name;
    document.querySelectorAll('.figcaption-friends').id = `${i}${cardIndex}${i}`;
    document.querySelectorAll('.btn-learn-more')[i].id = `${i}${cardIndex}`;
}

async function createCards(cardIndex, i) {
    const res = await fetch('../main/pets.json');
    const data = await res.json();
    const card = data[cardIndex];
    const figureFriends = document.createElement('div');
    figureFriends.classList.add('figure-friends');
    slider.append(figureFriends);
    const img = document.createElement('img');
    img.classList.add('img-friends');
    img.setAttribute('src', card.img);
    img.setAttribute('width', '270');
    img.setAttribute('height', '270');
    img.setAttribute('id', `0${cardIndex}`);
    figureFriends.append(img);
    const name = document.createElement('p');
    name.classList.add('figcaption-friends');
    name.textContent = card.name;
    name.setAttribute('id', `1${cardIndex}`);
    figureFriends.append(name);
    const btnLearn = document.createElement('button');
    btnLearn.classList.add('btn-learn-more');
    btnLearn.textContent = `Learn more`;
    btnLearn.setAttribute('id', `2${cardIndex}`);
    figureFriends.append(btnLearn);
    document.querySelectorAll('.figure-friends').forEach((btn) => {
      btn.addEventListener('click', showModal);
  });
}

function getRandomCards(array, element) {
    for (let i = 0; i < amount; i++) {
        element(array[i], i);
    }
}

let currentCards = getUniqueArray();
let prevCards = getUniqueArray();
let nextCards = getUniqueArray();

getRandomCards(currentCards, createCards);

function getUniqueArray() {
    let array = [];
    while (array.length < amount) {
        let numb = ~~(Math.random() * 8);
        if (!array.includes(numb)) {
            array.push(numb);
        }
    }
    return array;
}

function getAnimation(anim) {
  slider.style.animation =anim;
  slider.addEventListener('animationend', () => {
    slider.style.animation = '';
  });
}

function getPreviousSlide() {
getAnimation('prevSlide 0.5s ease-out')
    currentCards.length = 0;
    currentCards = [...nextCards];
    nextCards.length = 0;
    nextCards = getUniqueArray();
   setTimeout(()=>getRandomCards(currentCards, changeCards),400);
}

function getNextSlide() {
  getAnimation('nextSlide 0.5s ease-out')
  currentCards.length = 0;
  currentCards = [...prevCards];
  prevCards.length = 0;
  prevCards = getUniqueArray();
  setTimeout(()=>getRandomCards(currentCards, changeCards), 400);
}

prevButton.addEventListener('click', getPreviousSlide);
nextButton.addEventListener('click', getNextSlide);
