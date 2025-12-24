// تم پیش‌فرض
document.body.className = "theme-dark";

// تغییر تم
const themeSelect = document.getElementById("themeSelect");

themeSelect.addEventListener("change", function () {
  document.body.className = this.value;
});
