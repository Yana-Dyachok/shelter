import '../main/popup.js';
import './pagination.js';

const body = document.querySelector('body'),
    overlay = document.querySelector('.overlay'),
    burgerMenu = document.querySelector('.burger'),
    menuNav = document.querySelector('.nav'),
    navLink = document.querySelectorAll('.nav-link');

function toggleClasses() {
    burgerMenu.classList.toggle('-active');
    menuNav.classList.toggle('-active');
    overlay.classList.toggle('-active');
    body.classList.toggle('-active');
}

burgerMenu.addEventListener('click', toggleClasses);
overlay.addEventListener('click', toggleClasses);

navLink.forEach((el) => {
    el.addEventListener('click', ()=> {
        if(overlay.classList.contains('-active'))toggleClasses()});
});