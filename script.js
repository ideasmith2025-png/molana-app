// =========================
// متغیرها
// =========================
let currentBook = 1;
let currentIndex = -1; // -1 برای مقدمه، >=0 برای بخش/بیت
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
// گرفتن تمام صفحات شامل مقدمه، بخش‌ها و بیت‌ها
// =========================
function getAllPages(book) {
  let pages = [];
  pages.push({ type: "intro", text: book.introduction });
  book.sections.forEach(sec => pages.push({ type: "section", text: sec.text }));
  book.verses.forEach(verse => pages.push({ type: "verse", text: verse.text, explanation: verse.explanation }));
  return pages;
}

// =========================
// نمایش صفحه فعلی
// =========================
function showPage() {
  const book = books[currentBook];
  const pages = getAllPages(book);
  const page = pages[currentIndex + 1]; // because -1 = مقدمه

  if (!page) return;

  verseText.textContent = page.text;
  verseExplanation.textContent = page.explanation || "";

  if (page.type === "verse") {
    verseNumber.textContent = `دفتر ${currentBook} - بیت ${currentIndex + 1}`;
  } else {
    verseNumber.textContent = ""; // مقدمه و بخش بدون شماره
  }
}

// =========================
// رفتن به صفحه بعد
// =========================
function nextPage() {
  const book = books[currentBook];
  const pages = getAllPages(book);

  if (currentIndex < pages.length - 1) {
    currentIndex++;
  } else {
    if (currentBook < 6) {
      currentBook++;
      currentIndex = -1; // مقدمه دفتر بعد
    }
  }
  showPage();
}

// =========================
// رفتن به صفحه قبل
// =========================
function prevPage() {
  if (currentIndex > -1) {
    currentIndex--;
  } else {
    if (currentBook > 1) {
      currentBook--;
      const pages = getAllPages(books[currentBook]);
      currentIndex = pages.length - 1;
    }
  }
  showPage();
}

// =========================
// انتخاب دفتر
// =========================
booksElems.forEach(bookElem => {
  bookElem.addEventListener("click", () => {
    currentBook = parseInt(bookElem.dataset.book);
    currentIndex = -1; // مقدمه
    showPage();
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
// حرکت خودکار صفحات
// =========================
function startAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  if (autoPlayCheck.checked) {
    autoPlayInterval = setInterval(nextPage, 5000); // ۵ ثانیه بین صفحات
  }
}

autoPlayCheck.addEventListener("change", startAutoPlay);

// =========================
// لمس برای رفتن به صفحه بعد
// =========================
verseBox.addEventListener("click", () => {
  if (tapNextCheck.checked) {
    nextPage();
  }
});

// =========================
// سوایپ چپ/راست
// =========================
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  if (touchEndX < touchStartX - 30) nextPage();
  if (touchEndX > touchStartX + 30) prevPage();
}

verseBox.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX);
verseBox.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

// =========================
// جستجو بر اساس متن یا شماره بیت
// =========================
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (!query) return;

  for (let b = 1; b <= 6; b++) {
    const pages = getAllPages(books[b]);
    if (query.includes("بیت")) {
      const num = parseInt(query.replace(/[^\d]/g, ""));
      const verseIndex = pages.findIndex(p => p.type === "verse");
      if (!isNaN(num) && num <= pages.filter(p => p.type === "verse").length) {
        currentBook = b;
        currentIndex = pages.findIndex((p, idx) => p.type === "verse" && idx === num - 1);
        showPage();
        break;
      }
    } else {
      const idx = pages.findIndex(p => p.text.includes(query));
      if (idx !== -1) {
        currentBook = b;
        currentIndex = idx - 1; // چون -1 = مقدمه
        showPage();
        break;
      }
    }
  }
});

// =========================
// شروع برنامه
// =========================
showPage();
startAutoPlay();
