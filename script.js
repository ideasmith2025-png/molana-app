// =========================
// متغیرهای برنامه
// =========================
let currentBook = 1;
let currentVerseIndex = -1; // -1 برای مقدمه
let autoPlayInterval = null;

// DOM ها
const verseText = document.getElementById("verseText");
const verseNumber = document.getElementById("verseNumber");
const verseExplanation = document.getElementById("verseExplanation");
const verseBox = document.getElementById("verseBox");
const explanationBox = document.getElementById("explanationBox");
const settingsIcon = document.getElementById("settingsIcon");
const settingsPanel = document.getElementById("settingsPanel");
const themeSelect = document.getElementById("themeSelect");
const autoPlayCheck = document.getElementById("autoPlay");
const tapNextCheck = document.getElementById("tapNext");
const searchInput = document.getElementById("searchInput");
const booksElems = document.querySelectorAll(".book");

// =========================
// نمایش بیت
// =========================
function showVerse() {
  const book = books[currentBook];

  if (currentVerseIndex === -1) {
    // مقدمه
    verseText.textContent = book.introduction;
    verseNumber.textContent = `دفتر ${currentBook} - مقدمه`;
    verseExplanation.textContent = "";
  } else {
    const verse = book.verses[currentVerseIndex];
    verseText.textContent = verse.text;
    verseNumber.textContent = `دفتر ${currentBook} - بیت ${currentVerseIndex + 1}`;
    verseExplanation.textContent = verse.explanation;
  }
}

// =========================
// رفتن به بیت بعد
// =========================
function nextVerse() {
  const book = books[currentBook];

  if (currentVerseIndex < book.verses.length - 1) {
    currentVerseIndex++;
  } else {
    // رفتن به مقدمه دفتر بعد
    if (currentBook < 6) {
      currentBook++;
      currentVerseIndex = -1;
    } else {
      currentVerseIndex = book.verses.length - 1; // آخرین بیت دفتر ۶
    }
  }
  showVerse();
}

// =========================
// رفتن به بیت قبل (سوایپ برگشت)
// =========================
function prevVerse() {
  if (currentVerseIndex > -1) {
    currentVerseIndex--;
  } else {
    if (currentBook > 1) {
      currentBook--;
      currentVerseIndex = books[currentBook].verses.length - 1;
    }
  }
  showVerse();
}

// =========================
// انتخاب دفتر
// =========================
booksElems.forEach(bookElem => {
  bookElem.addEventListener("click", () => {
    currentBook = parseInt(bookElem.dataset.book);
    currentVerseIndex = -1; // مقدمه
    showVerse();
    hideSettings();
  });
});

// =========================
// تنظیمات
// =========================
settingsIcon.addEventListener("click", () => {
  settingsPanel.classList.toggle("hidden");
});

function hideSettings() {
  settingsPanel.classList.add("hidden");
}

// تغییر تم
themeSelect.addEventListener("change", () => {
  document.body.className = `theme-${themeSelect.value}`;
  hideSettings();
});

// =========================
// حرکت خودکار بیت‌ها
// =========================
function startAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  if (autoPlayCheck.checked) {
    autoPlayInterval = setInterval(nextVerse, 5000); // ۵ ثانیه بین بیت‌ها
  }
}

autoPlayCheck.addEventListener("change", startAutoPlay);

// =========================
// لمس برای بیت بعد
// =========================
verseBox.addEventListener("click", () => {
  if (tapNextCheck.checked) {
    nextVerse();
  }
});

// =========================
// سوایپ چپ/راست برای حرکت بیت‌ها
// =========================
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  if (touchEndX < touchStartX - 30) {
    // کشیدن به چپ → بیت بعد
    nextVerse();
  }
  if (touchEndX > touchStartX + 30) {
    // کشیدن به راست → بیت قبل
    prevVerse();
  }
}

verseBox.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

verseBox.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

// =========================
// جستجو بیت یا شماره
// =========================
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (!query) return;

  for (let b = 1; b <= 6; b++) {
    const book = books[b];
    if (query.includes("بیت")) {
      const num = parseInt(query.replace(/[^\d]/g, ""));
      if (!isNaN(num) && num <= book.verses.length) {
        currentBook = b;
        currentVerseIndex = num - 1;
        showVerse();
        break;
      }
    } else {
      // جستجوی متن
      const idx = book.verses.findIndex(v => v.text.includes(query));
      if (idx !== -1) {
        currentBook = b;
        currentVerseIndex = idx;
        showVerse();
        break;
      }
    }
  }
});
  
// =========================
// شروع برنامه
// =========================
showVerse();
startAutoPlay();
