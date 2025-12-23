const verses = [
  // دفتر 1
  {daftar:1, number:1, text:"بشنو از نی چون حکایت می‌کند\nاز جدایی‌ها شکایت می‌کند", explain:"این بیت آغاز مثنوی است."},
  {daftar:1, number:2, text:"کز نیستان تا مرا ببریده‌اند\nدر نفیرم مرد و زن نالیده‌اند", explain:"نی نماد روح جداافتاده از اصل خویش است."},
  {daftar:1, number:3, text:"سینه خواهم شرحه شرحه از فراق\nتا بگویم شرح درد اشتیاق", explain:"فراق سبب پیدایش شوق و درد عاشقانه است."},

  // دفتر 2
  {daftar:2, number:1, text:"ای دل بیا تا درس عشق بگیریم", explain:"دعوت به یادگیری عشق است."},
  {daftar:2, number:2, text:"در طلب حق باش و صبر پیشه کن", explain:"صبر برای رسیدن به حقیقت لازم است."},
  {daftar:2, number:3, text:"عشق آنست که جان تو را بسوزاند\nو از دل شمعی روشن سازد", explain:"عشق واقعی سبب روشنایی و رشد روح است."},

  // دفتر 3
  {daftar:3, number:1, text:"هر کسی را بهر کاری ساختند", explain:"هر انسان برای کاری آفریده شده است."},
  {daftar:3, number:2, text:"پس نقش خود را در دنیا بشناس", explain:"آگاهی از نقش خویش در زندگی."},
  {daftar:3, number:3, text:"بی‌هوده مباش و با دل خود سخن گو", explain:"با خود صادق باش و وقت خود را هدر نده."}
];

let filteredVerses = [...verses];
let currentIndex = 0;

const verseMeta = document.getElementById("verse-meta");
const verseText = document.getElementById("verse-text");
const explainBox = document.getElementById("explain-box");

const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const searchInput = document.getElementById("searchInput");
const daftarButtons = document.querySelectorAll(".daftar-btn");

function renderVerse() {
  if(filteredVerses.length === 0) {
    verseText.innerText = "هیچ بیتی یافت نشد.";
    verseMeta.innerText = "";
    explainBox.innerText = "";
    return;
  }
  const v = filteredVerses[currentIndex];
  verseText.innerText = v.text;
  verseMeta.textContent = `دفتر ${v.daftar} · بیت ${v.number}`;
  explainBox.innerText = v.explain;
}

// رندر اولیه
renderVerse();

// ==========================
// سوییپ کل صفحه – جهت اصلاح
// ==========================
let touchStartX = 0;
let touchEndX = 0;
const threshold = 50;
const swipeArea = document.getElementById("app");

swipeArea.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

swipeArea.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  const diff = touchEndX - touchStartX;
  if (diff > threshold) {
    if (currentIndex < filteredVerses.length - 1) currentIndex++;
  } else if (diff < -threshold) {
    if (currentIndex > 0) currentIndex--;
  }
  renderVerse();
}

// ==========================
// تنظیمات باز/بسته شدن
// ==========================
settingsBtn.addEventListener("click", e => {
  e.stopPropagation();
  settingsPanel.style.display = settingsPanel.style.display === "block" ? "none" : "block";
});

document.body.addEventListener("click", () => {
  settingsPanel.style.display = "none";
});

settingsPanel.addEventListener("click", e => {
  e.stopPropagation();
});

// ==========================
// انتخاب دفتر
// ==========================
daftarButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const n = parseInt(btn.getAttribute("data-daftar"));
    filteredVerses = verses.filter(v => v.daftar === n);
    currentIndex = 0;
    renderVerse();
    settingsPanel.style.display = "none";
  });
});

// ==========================
// جستجو
// ==========================
searchInput.addEventListener("input", () => {
  const term = searchInput.value.trim();
  // فقط در دفتر فعلی جستجو شود
  const currentDaftar = filteredVerses.length ? filteredVerses[0].daftar : 1;
  filteredVerses = verses.filter(v => {
    return v.daftar === currentDaftar && (v.text.includes(term) || v.number.toString() === term);
  });
  currentIndex = 0;
  renderVerse();
});
