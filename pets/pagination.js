import { showModal } from '../main/popup.js';
document.addEventListener('DOMContentLoaded', function () {
    const firstButton = document.querySelector('.pagin-first');
    const lastButton = document.querySelector('.pagin-last');
    const prevButton = document.querySelector('.pagin-prev');
    const nextButton = document.querySelector('.pagin-next');
    const currentPage = document.querySelector('.now-pagination');
    const petsBlock = document.querySelector('.example-pets');
    window.addEventListener("resize", () => updateCardsOnResize(window.innerWidth));
    let amount =
        window.innerWidth > 1200 ? 6 : window.innerWidth > 767 ? 8 : 16;

    let numberPage = 1;

    function getUniqueArray() {
        let array = [];
        for (let i = 0; i < 8; i++) {
            array.push(i);
        }
        return array.sort(() => Math.random() - 0.5);
    }

    async function createCards() {
        const res = await fetch('../main/pets.json');
        const data = await res.json();
        const card = data;
        for (let i = 0; i < amount; i++) {
            const slider = document.createElement('div');
            slider.className = 'slider';
            let uniqueArray = getUniqueArray();
            uniqueArray.forEach((el) => {
                const figureFriends = document.createElement('div');
                figureFriends.classList.add('figure-friends');
                const img = document.createElement('img');
                img.classList.add('img-friends');
                img.setAttribute('src', card[el].img);
                img.setAttribute('width', '270');
                img.setAttribute('height', '270');
                img.setAttribute('id', `${i}${el}${i}`);
                figureFriends.append(img);
                const name = document.createElement('p');
                name.classList.add('figcaption-friends');
                name.textContent = card[el].name;
                name.setAttribute('id', `${i}${el}${i}${i}`);
                figureFriends.append(name);
                const btnLearn = document.createElement('button');
                btnLearn.classList.add('btn-learn-more');
                btnLearn.setAttribute('id', `${i}${el}`);
                btnLearn.textContent = `Learn more`;
                figureFriends.append(btnLearn);
                slider.append(figureFriends);
            });
            document.querySelectorAll('.figure-friends').forEach((btn) => {
                btn.addEventListener('click', showModal);
            });
            petsBlock.append(slider);
        }
    }

    createCards();

    function updateCardsOnResize(width) {
        amount =
            width > 1200 ? 6 : width > 767 ? 8 : 16;
        createCards();
        changeCountCards(width);
    }

    function changeCountCards(width) {
        const sliders = document.querySelectorAll(".slider");
      
        sliders.forEach((slider) => {
          const children = slider.children;
     
          if (width <= 1200) {
            children[6].classList.add("hidden");
            children[7].classList.add("hidden");
          } else if (width > 1200) {
            children[6].classList.remove("hidden");
            children[7].classList.remove("hidden");
          }
          else if (width < 768) {
            children[4].classList.add("hidden");
            children[5].classList.add("hidden");
          } else if (width >=768) {
            children[4].classList.remove("hidden");
            children[5].classList.remove("hidden");
          }
        });
      }
      

    nextButton.addEventListener('click', () => {
        if (numberPage != amount) {
            numberPage++;
            firstButton.classList.add('active');
            prevButton.classList.add('active');
            currentPage.innerHTML = numberPage;
            petsBlock.scrollBy(petsBlock.children[0].offsetWidth, 0);
        }
        if (numberPage > 2) {
            nextButton.classList.add('active');
            lastButton.classList.add('active');
        }
        if (numberPage == amount) {
            nextButton.classList.remove('active');
            lastButton.classList.remove('active');
        }
    });

    prevButton.addEventListener('click', () => {
        if (numberPage > 1) {
            numberPage--;
            currentPage.innerHTML = numberPage;
            petsBlock.scrollBy(-petsBlock.children[0].offsetWidth, 0);
        }
        if (numberPage > 2) {
            nextButton.classList.add('active');
            lastButton.classList.add('active');
        }

        if (numberPage == 1) {
            prevButton.classList.remove('active');
            firstButton.classList.remove('active');
        }
    });

    lastButton.addEventListener('click', () => {
        if (numberPage !== amount) {
            numberPage = amount;
            currentPage.innerHTML = numberPage;
            nextButton.classList.remove('active');
            lastButton.classList.remove('active');
            firstButton.classList.add('active');
            prevButton.classList.add('active');

            petsBlock.scrollBy(petsBlock.scrollWidth, 0);
        }
    });

    firstButton.addEventListener('click', () => {
        if (numberPage !== 1) {
            numberPage = 1;
            currentPage.innerHTML = numberPage;
            firstButton.classList.remove('active');
            prevButton.classList.remove('active');
            nextButton.classList.add('active');
            lastButton.classList.add('active');
            petsBlock.scrollBy(-petsBlock.scrollWidth, 0);
        }
    });
});
