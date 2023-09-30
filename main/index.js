import './popup.js';
import './slider.js';
// burger menu

const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const burgerMenu = document.querySelector('.burger');
const menuNav = document.querySelector('.nav');
const navLink = document.querySelectorAll('.nav-link');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('-active');
  menuNav.classList.toggle('-active');
  overlay.classList.toggle('-active');
  body.classList.toggle('-active');
});

overlay.addEventListener('click', () => {
  burgerMenu.classList.remove('-active');
  menuNav.classList.remove('-active');
  overlay.classList.remove('-active');
  body.classList.toggle('-active');
});

navLink.forEach(el => {
  el.addEventListener('click', () => {
    burgerMenu.classList.remove('-active');
    menuNav.classList.remove('-active');
    overlay.classList.remove('-active');
    body.classList.remove('-active');
  });
});