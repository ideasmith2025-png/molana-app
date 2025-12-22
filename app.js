// ==================== Data ====================
let cards = [
  { dafar: 1, number: 1, text: "به نام خداوند جان و خرد\nکزین برتر اندیشه برنگذرد", meaning: "توضیح نمونه برای بیت یک" },
  { dafar: 1, number: 2, text: "هر که او ز روزگار بی‌خبر است\nخاموش و بیدار و پایبند سر است", meaning: "توضیح نمونه برای بیت دو" },
  { dafar: 1, number: 3, text: "عقل گوید که جان را پاس دار\nتا در هر کار کنی راه و دار", meaning: "توضیح نمونه برای بیت سه" }
];

let currentIndex = 0;
let autoPlay = false;
let pauseTime = 5000;
let timer = null;

// ==================== Elements ====================
const cardBox = document.querySelector(".bit-box");
const bitNumber = document.querySelector(".bit-number");
const bitText = document.querySelector(".bit-text");
const descBox = document.querySelector(".desc-box");

// ==================== Render ====================
function renderCard(index) {
  const card = cards[index];
  bitNumber.textContent = `دفتر ${card.dafar} – بیت شماره ${card.number}`;
  bitText.textContent = card.text;
  descBox.textContent = card.meaning;
}

// ==================== Navigation ====================
function nextCard() {
  currentIndex = (currentIndex + 1) % cards.length;
  renderCard(currentIndex);
}

function prevCard() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
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
  if(!swiping) return;
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

// ==================== Init ====================
renderCard(currentIndex);
