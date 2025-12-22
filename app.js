let cards = [
  {"number":1,"text":"بیت شماره یک","meaning":"توضیح کوتاه بیت یک"},
  {"number":2,"text":"بیت شماره دو","meaning":"توضیح کوتاه بیت دو"},
  {"number":3,"text":"بیت شماره سه","meaning":"توضیح کوتاه بیت سه"},
  {"number":4,"text":"بیت شماره چهار","meaning":"توضیح کوتاه بیت چهار"},
  {"number":5,"text":"بیت شماره پنج","meaning":"توضیح کوتاه بیت پنج"},
  {"number":6,"text":"بیت شماره شش","meaning":"توضیح کوتاه بیت شش"},
  {"number":7,"text":"بیت شماره هفت","meaning":"توضیح کوتاه بیت هفت"},
  {"number":8,"text":"بیت شماره هشت","meaning":"توضیح کوتاه بیت هشت"},
  {"number":9,"text":"بیت شماره نه","meaning":"توضیح کوتاه بیت نه"},
  {"number":10,"text":"بیت شماره ده","meaning":"توضیح کوتاه بیت ده"}
];

let currentIndex = 0;
let autoPlay = false;
let pauseTime = 5000;
let timer = null;

const cardContainer = document.getElementById('card-container');
const selectDafar = document.getElementById('select-dafar');
const searchInput = document.getElementById('search');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const autoPlayCheckbox = document.getElementById('auto-play');
const pauseTimeInput = document.getElementById('pause-time');
const swipeCheckbox = document.getElementById('swipe');
const themeSelect = document.getElementById('theme-select');

function displayCards(cardsArray) {
    cardContainer.innerHTML = '';
    cardsArray.forEach((card, index) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.dataset.index = index;
        div.innerHTML = `
            <div class="card-text">${card.text}</div>
            <div class="card-meaning">${card.meaning}</div>
        `;
        cardContainer.appendChild(div);
    });
}

function showCard(index) {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((c, i) => {
        c.style.display = (i === index) ? 'block' : 'none';
    });
}

function startAutoPlay() {
    stopAutoPlay();
    if (autoPlay && cards.length > 0) {
        timer = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        }, pauseTime);
    }
}

function stopAutoPlay() {
    if (timer) clearInterval(timer);
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

selectDafar.addEventListener('change', () => {
    showCard(0);
});

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = cards.filter(c => 
        c.text.toLowerCase().includes(query) || c.number.toString() === query
    );
    displayCards(filtered);
    currentIndex = 0;
    showCard(currentIndex);
});

settingsBtn.addEventListener('click', () => {
    settingsPanel.style.display = (settingsPanel.style.display === 'block') ? 'none' : 'block';
});

autoPlayCheckbox.addEventListener('change', () => {
    autoPlay = autoPlayCheckbox.checked;
    resetAutoPlay();
});

pauseTimeInput.addEventListener('change', () => {
    const val = parseInt(pauseTimeInput.value);
    if (!isNaN(val) && val > 0) {
        pauseTime = val * 1000;
        resetAutoPlay();
    }
});

themeSelect.addEventListener('change', () => {
    document.body.dataset.theme = themeSelect.value;
});

let startX = 0;
let isSwiping = false;

cardContainer.addEventListener('touchstart', (e) => {
    if (!swipeCheckbox.checked) return;
    startX = e.touches[0].clientX;
    isSwiping = true;
});

cardContainer.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const deltaX = e.touches[0].clientX - startX;
    if (deltaX > 50) {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
        isSwiping = false;
    } else if (deltaX < -50) {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
        isSwiping = false;
    }
});

cardContainer.addEventListener('touchend', () => { isSwiping = false; });

displayCards(cards);
showCard(0);
