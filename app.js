// ====== متغیرهای اصلی ======
let cards = [];
let currentIndex = 0;
let autoPlay = false;
let pauseTime = 5000;
let timer = null;

// ====== المان‌ها ======
const cardContainer = document.getElementById('card-container');
const selectDafar = document.getElementById('select-dafar');
const searchInput = document.getElementById('search');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const autoPlayCheckbox = document.getElementById('auto-play');
const pauseTimeInput = document.getElementById('pause-time');
const swipeCheckbox = document.getElementById('swipe');
const themeSelect = document.getElementById('theme-select');

// ====== بارگذاری دفتر ======
function loadDaf(file) {
    fetch('data/' + file)
        .then(res => res.json())
        .then(data => {
            cards = data;
            currentIndex = 0;
            displayCards(cards);
            showCard(0); // نمایش کارت اول هنگام بارگذاری
            resetAutoPlay();
        });
}

// ====== نمایش کارت‌ها ======
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

// ====== حرکت بین کارت‌ها ======
function showCard(index) {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((c, i) => {
        c.style.display = (i === index) ? 'block' : 'none';
    });
}

// ====== پخش خودکار ======
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

// ====== انتخاب دفتر ======
selectDafar.addEventListener('change', () => {
    loadDaf(selectDafar.value);
});

// ====== جستجو ======
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = cards.filter(c => 
        c.text.toLowerCase().includes(query) || c.number.toString() === query
    );
    displayCards(filtered);
    currentIndex = 0;
    showCard(currentIndex);
});

// ====== تنظیمات ======
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

// ====== Swipe ساده ======
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
    if (deltaX > 50) { // راست → بیت قبلی
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
        isSwiping = false;
    } else if (deltaX < -50) { // چپ → بیت بعد
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
        isSwiping = false;
    }
});

cardContainer.addEventListener('touchend', () => { isSwiping = false; });

// ====== بارگذاری اولیه ======
loadDaf(selectDafar.value);
