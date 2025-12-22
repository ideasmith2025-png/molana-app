// ==================== Variables ====================
const topBar = document.getElementById("top-bar");
const readerArea = document.getElementById("reader-area");
const settingsBtn = document.getElementById("settings-btn");

// وضعیت نوار بالا
let topBarVisible = false;

// ==================== Functions ====================
function showTopBar() {
  topBar.classList.add("visible");
  topBarVisible = true;
}

function hideTopBar() {
  topBar.classList.remove("visible");
  topBarVisible = false;
}

function toggleTopBar() {
  if(topBarVisible) hideTopBar();
  else showTopBar();
}

// ==================== Event Listeners ====================

// لمس هر جای صفحه برای نمایش نوار بالا
readerArea.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleTopBar();
});

// جلوگیری از بسته شدن وقتی روی نوار بالا لمس می‌شود
topBar.addEventListener("click", (e) => {
  e.stopPropagation();
});

// دکمه تنظیمات ⚙️ (مثال: می‌تواند بعداً پنل تنظیمات را باز کند)
settingsBtn.addEventListener("click", () => {
  alert("پنل تنظیمات اینجا باز می‌شود (بعداً اضافه خواهد شد)");
  hideTopBar();
});
