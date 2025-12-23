let index = 0;

const verseText = document.getElementById("verseText");
const explainText = document.getElementById("explainText");
const infoText = document.getElementById("infoText");

const settingsToggle = document.getElementById("settingsToggle");
const settingsPanel = document.getElementById("settingsPanel");
const closeSettings = document.getElementById("closeSettings");

const autoNextCheckbox = document.getElementById("autoNext");
const showSearchCheckbox = document.getElementById("showSearch");
const enableSwipeCheckbox = document.getElementById("enableSwipe");

let autoNextEnabled = false;
let swipeEnabled = true;

function render() {
  const item = verses[index];

  verseText.innerText = "";
  explainText.innerText = "";
  infoText.innerText = "";

  if (item.type === "intro") {
    verseText.innerText = item.text;
    infoText.innerText = `دفتر ${item.daftar} · مقدمه`;
  }

  if (item.type === "section") {
    verseText.innerText = item.text;
    explainText.innerText = item.explain || "";
    infoText.innerText = `دفتر ${item.daftar} · بخش`;
  }

  if (item.type === "verse") {
    verseText.innerText = item.text;
    explainText.innerText = item.explain || "";
    infoText.innerText = `دفتر ${item.daftar} · بیت ${item.number}`;
  }
}

// ===== رفتن بعدی/قبلی =====
function next() {
  if (index < verses.length - 1) {
    index++;
    render();
  }
}

function prev() {
  if (index > 0) {
    index--;
    render();
  }
}

// ===== سوییپ =====
let startX = null;

document.body.addEventListener("touchstart", e => {
  if (!swipeEnabled) return;
  startX = e.touches[0].clientX;
});

document.body.addEventListener("touchend", e => {
  if (!swipeEnabled || startX === null) return;

  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  startX = null;

  if (Math.abs(diff) < 60) return;

  if (diff > 0) next();   // چپ → راست
  else prev();             // راست → چپ
});

// ===== تنظیمات =====
settingsToggle.addEventListener("click", () => {
  settingsPanel.style.display = "flex";
});

closeSettings.addEventListener("click", () => {
  settingsPanel.style.display = "none";
});

autoNextCheckbox.addEventListener("change", () => {
  autoNextEnabled = autoNextCheckbox.checked;
  settingsPanel.style.display = "none";
});

showSearchCheckbox.addEventListener("change", () => {
  // اینجا بعداً نوار جستجو اضافه میشه
  settingsPanel.style.display = "none";
});

enableSwipeCheckbox.addEventListener("change", () => {
  swipeEnabled = enableSwipeCheckbox.checked;
  settingsPanel.style.display = "none";
});

// لمس صفحه برای بستن تنظیمات
document.body.addEventListener("touchstart", () => {
  if (settingsPanel.style.display === "flex") {
    settingsPanel.style.display = "none";
  }
});

// شروع
render();
