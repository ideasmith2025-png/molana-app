const verses = [
  {
    daftar: 1,
    number: 1,
    text: "بشنو از نی چون حکایت می‌کند\nاز جدایی‌ها شکایت می‌کند",
    explain: "این بیت آغاز مثنوی است و دعوت به شنیدن سخن جان است."
  },
  {
    daftar: 1,
    number: 2,
    text: "کز نیستان تا مرا ببریده‌اند\nدر نفیرم مرد و زن نالیده‌اند",
    explain: "نی نماد روح جداافتاده از اصل خویش است."
  },
  {
    daftar: 1,
    number: 3,
    text: "سینه خواهم شرحه شرحه از فراق\nتا بگویم شرح درد اشتیاق",
    explain: "فراق سبب پیدایش شوق و درد عاشقانه است."
  }
];

let currentIndex = 0;

const verseMeta = document.getElementById("verse-meta");
const verseText = document.getElementById("verse-text");
const explainBox = document.getElementById("explain-box");

const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");

function renderVerse() {
  const v = verses[currentIndex];
  verseText.innerText = v.text;
  verseMeta.textContent = `دفتر ${v.daftar} · بیت ${v.number}`;
  explainBox.innerText = v.explain;
}

// رندر اولیه
renderVerse();

// ==========================
// سوییپ کل صفحه
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
  const diff = touchStartX - touchEndX;
  if (diff > threshold) {
    if (currentIndex < verses.length - 1) currentIndex++;
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

// لمس صفحه → تنظیمات بسته شود
document.body.addEventListener("click", () => {
  settingsPanel.style.display = "none";
});

// لمس خود پنل → بسته نشود
settingsPanel.addEventListener("click", (e) => {
  e.stopPropagation();
});

// بعد از هر انتخاب → بسته شود
document.querySelectorAll(".setting-item").forEach(item => {
  item.addEventListener("click", () => {
    settingsPanel.style.display = "none";
  });
});
