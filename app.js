/* ===============================
   DATA (موقت – بعداً عوض می‌شود)
================================ */
let cards = [
  { number: 1, text: "بیت شماره یک", meaning: "توضیح نمونه برای بیت یک" },
  { number: 2, text: "بیت شماره دو", meaning: "توضیح نمونه برای بیت دو" },
  { number: 3, text: "بیت شماره سه", meaning: "توضیح نمونه برای بیت سه" },
  { number: 4, text: "بیت شماره چهار", meaning: "توضیح نمونه برای بیت چهار" }
];

let currentIndex = 0;
let autoPlay = false;
let pauseTime = 5000;
let timer = null;

/* ===============================
   ELEMENTS
================================ */
const cardContainer = document.getElementById("card-container");

const settingsBtn = document.getElementById("settings-btn");
const settingsPanel = document.getElementById("settings-panel");
const overlay = document.getElementById("overlay");

const autoPlayCheckbox = document.getElementById("auto-play");
const pauseTimeInput = document.getElementById("pause-time");
const swipeCheckbox = document.getElementById("swipe");
const themeSelect = document.getElementById("theme-select");

/* ===============================
   CARD RENDER
================================ */
function renderCard(index) {
  const card = cards[index];
  cardContainer.innerHTML = `
    <div class="card">
      <div class="card-text">${card.text}</div>
      <div class="card-meaning">${card.meaning}</div>
    </div>
  `;
}

/* ===============================
   SETTINGS PANEL LOGIC
================================ */
function openSettings() {
  settingsPanel.classList.add("active");
  overlay.classList.add("active");
}

function closeSettings() {
  settingsPanel.classList.remove("active");
  overlay.classList.remove("active");
}

settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openSettings();
});

overlay.addEventListener("click", closeSettings);

/* بستن تنظیمات با لمس هر جای صفحه */
document.body.addEventListener("click", () => {
  if (settingsPanel.classList.contains("active")) {
    closeSettings();
  }
});

/* جلوگیری از بسته شدن وقتی داخل تنظیمات لمس می‌شود */
settingsPanel.addEventListener("click", (e) => {
  e.stopPropagation();
});

/* ===============================
   SETTINGS BEHAVIOR
================================ */
autoPlayCheckbox.addEventListener("change", () => {
  autoPlay = autoPlayCheckbox.checked;
  resetAutoPlay();
  closeSettings();
});

pauseTimeInput.addEventListener("change", () => {
  pauseTime = parseInt(pauseTimeInput.value) * 1000;
  resetAutoPlay();
  closeSettings();
});

swipeCheckbox.addEventListener("change", () => {
  closeSettings();
});

themeSelect.addEventListener("change", () => {
  document.body.dataset.theme = themeSelect.value;
  closeSettings();
});

/* ===============================
   AUTOPLAY
================================ */
function startAutoPlay() {
  stopAutoPlay();
  if (!autoPlay) return;

  timer = setInterval(() => {
    nextCard();
  }, pauseTime);
}

function stopAutoPlay() {
  if (timer) clearInterval(timer);
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

/* ===============================
   CARD NAVIGATION
================================ */
function nextCard() {
  currentIndex = (currentIndex + 1) % cards.length;
  renderCard(currentIndex);
}

function prevCard() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  renderCard(currentIndex);
}

/* ===============================
   SWIPE (معکوس‌شده طبق خواسته تو)
================================ */
let startX = 0;
let swiping = false;

cardContainer.addEventListener("touchstart", (e) => {
  if (!swipeCheckbox.checked) return;
  startX = e.touches[0].clientX;
  swiping = true;
});

cardContainer.addEventListener("touchend", (e) => {
  if (!swiping) return;

  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > 50) {
    nextCard(); // چپ به راست → بعدی
  } else if (diff < -50) {
    prevCard(); // راست به چپ → قبلی
  }

  swiping = false;
});

/* ===============================
   INIT
================================ */
renderCard(currentIndex);
