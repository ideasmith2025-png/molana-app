// ==================== داده‌ها ====================
let cards = [
  { dafar: 1, number: 1, text: "به نام خداوند جان و خرد\nکزین برتر اندیشه برنگذرد", meaning: "توضیح نمونه برای بیت یک" },
  { dafar: 1, number: 2, text: "هر که او ز روزگار بی‌خبر است\nخاموش و بیدار و پایبند سر است", meaning: "توضیح نمونه برای بیت دو" },
  { dafar: 1, number: 3, text: "عقل گوید که جان را پاس دار\nتا در هر کار کنی راه و دار", meaning: "توضیح نمونه برای بیت سه" },
  { dafar: 2, number: 1, text: "دفتر دوم بیت اول نمونه", meaning: "توضیح نمونه دفتر دوم" }
];

let filteredCards = [...cards];
let currentIndex = 0;
let autoPlay = false;
let pauseTime = 5000;
let timer = null;

// ==================== المان‌ها ====================
const cardBox = document.querySelector(".bit-box");
const bitNumber = document.querySelector(".bit-number");
const bitText = document.querySelector(".bit-text");
const descBox = document.querySelector(".desc-box");
const topBar = document.getElementById("top-bar");
const readerArea = document.getElementById("reader-area");
const settingsBtn = document.getElementById("settings-btn");
const settingsPanel = document.getElementById("settings-panel");
const selectDafar = document.getElementById("select-dafar");
const searchInput = document.getElementById("search");
const autoPlayToggle = document.getElementById("auto-play-toggle");
const swipeToggle = document.getElementById("swipe-toggle");

// ==================== رندر کارت ====================
function renderCard(index) {
  if(filteredCards.length === 0) return;
  const card = filteredCards[index];
  bitNumber.textContent = `دفتر ${card.dafar} – بیت شماره ${card.number}`;
  bitText.textContent = card.text;
  descBox.textContent = card.meaning;
}

// ==================== ناوبری ====================
function nextCard() {
  if(filteredCards.length === 0) return;
  currentIndex = (currentIndex + 1) % filteredCards.length;
  renderCard(currentIndex);
}

function prevCard() {
  if(filteredCards.length === 0) return;
  currentIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length;
  renderCard(currentIndex);
}

// ==================== Auto-play ====================
function startAutoPlay() {
  stopAutoPlay();
  if(!autoPlay) return;
  timer = setInterval(nextCard, pauseTime);
}

function stopAutoPlay() {
  if(timer) clearInterval(timer);
}

// ==================== Swipe ====================
let startX = 0;
let swiping = false;

cardBox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  swiping = true;
});

cardBox.addEventListener("touchend", (e) => {
  if(!swiping || !swipeToggle.checked) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  // جهت معکوس: چپ → راست = بعدی
  if(diff > 50) {
    nextCard();
  } else if(diff < -50) {
    prevCard();
  }
  swiping = false;
});

// ==================== نوار بالا ====================
let topBarVisible = false;

function toggleTopBar() {
  topBarVisible ? topBar.classList.remove("visible") : topBar.classList.add("visible");
  topBarVisible = !topBarVisible;
}

// لمس صفحه → نوار بالا
readerArea.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleTopBar();
});

// جلوگیری از بسته شدن وقتی روی نوار بالا لمس می‌شود
topBar.addEventListener("click", (e) => e.stopPropagation());

// ==================== تنظیمات دکمه ⚙️ ====================
settingsBtn.addEventListener("click", () => {
  settingsPanel.classList.toggle("hidden");
});

// بستن پنل بعد از هر تغییر
autoPlayToggle.addEventListener("change", () => {
  autoPlay = autoPlayToggle.checked;
  if(autoPlay) startAutoPlay(); else stopAutoPlay();
  settingsPanel.classList.add("hidden");
});

swipeToggle.addEventListener("change", () => {
  settingsPanel.classList.add("hidden");
});

// ==================== انتخاب دفتر ====================
selectDafar.addEventListener("change", () => {
  const dafar = parseInt(selectDafar.value);
  filteredCards = cards.filter(c => c.dafar === dafar);
  currentIndex = 0;
  renderCard(currentIndex);
  topBar.classList.remove("visible");
  topBarVisible = false;
});

// ==================== جستجو ====================
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim();
  filteredCards = cards.filter(c => 
    c.text.includes(keyword) || c.meaning.includes(keyword)
  );
  currentIndex = 0;
  renderCard(currentIndex);
  topBar.classList.remove("visible");
  topBarVisible = false;
});

// ==================== Init ====================
renderCard(currentIndex);
