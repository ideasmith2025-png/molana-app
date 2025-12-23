const verses = [
  {daftar:1, number:1, text:"بشنو از نی چون حکایت می‌کند\nاز جدایی‌ها شکایت می‌کند", explain:"این بیت آغاز مثنوی است."},
  {daftar:1, number:2, text:"کز نیستان تا مرا ببریده‌اند\nدر نفیرم مرد و زن نالیده‌اند", explain:"نی نماد روح جداافتاده از اصل خویش است."},
  {daftar:2, number:1, text:"ای دل بیا تا درس عشق بگیریم", explain:"دعوت به یادگیری عشق است."},
  {daftar:2, number:2, text:"در طلب حق باش و صبر پیشه کن", explain:"صبر برای رسیدن به حقیقت لازم است."},
  {daftar:3, number:1, text:"هر کسی را بهر کاری ساختند", explain:"هر انسان برای کاری آفریده شده است."},
  {daftar:3, number:2, text:"پس نقش خود را در دنیا بشناس", explain:"آگاهی از نقش خویش در زندگی."}
];

let filteredVerses = [...verses];
let currentIndex = 0;

const verseMeta = document.getElementById("verse-meta");
const verseText = document.getElementById("verse-text");
const explainBox = document.getElementById("explain-box");

const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");

function renderVerse() {
  if(filteredVerses.length === 0) {
    verseText.innerText = "هیچ بیتی برای این دفتر یا جستجو یافت نشد.";
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
  const diff = touchEndX - touchStartX; // جهت اصلاح
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
settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  settingsPanel.style.display = settingsPanel.style.display === "block" ? "none" : "block";
});

document.body.addEventListener("click", () => {
  settingsPanel.style.display = "none";
});

settingsPanel.addEventListener("click", (e) => {
  e.stopPropagation();
});

// ==========================
// اعمال انتخاب دفتر
// ==========================
document.querySelectorAll(".setting-item").forEach(item => {
  item.addEventListener("click", () => {
    const action = item.getAttribute("data-action");
    if(action === "daftar") {
      const number = prompt("شماره دفتر را وارد کنید (1 تا 6):");
      const n = parseInt(number);
      if(!isNaN(n) && n>=1 && n<=6) {
        filteredVerses = verses.filter(v => v.daftar === n);
        currentIndex = 0;
        renderVerse();
      }
    } else if(action === "search") {
      const term = prompt("متن یا شماره بیت را وارد کنید:");
      if(term) {
        const t = term.trim();
        filteredVerses = verses.filter(v => v.text.includes(t) || v.number == t);
        currentIndex = 0;
        renderVerse();
      }
    }
    // بعد از انتخاب خودکار پنل بسته شود
    settingsPanel.style.display = "none";
  });
});
