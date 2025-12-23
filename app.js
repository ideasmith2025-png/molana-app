let index = 0;

const verseBox = document.getElementById("verseText");
const explainBox = document.getElementById("explainText");
const infoBox = document.getElementById("infoText");

function render() {
  const item = verses[index];

  verseBox.innerText = "";
  explainBox.innerText = "";
  infoBox.innerText = "";

  if (item.type === "intro") {
    verseBox.innerText = item.text;
    infoBox.innerText = `دفتر ${item.daftar} · مقدمه`;
  }

  if (item.type === "section") {
    verseBox.innerText = item.text;
    explainBox.innerText = item.explain || "";
    infoBox.innerText = `دفتر ${item.daftar} · بخش`;
  }

  if (item.type === "verse") {
    verseBox.innerText = item.text;
    explainBox.innerText = item.explain || "";
    infoBox.innerText = `دفتر ${item.daftar} · بیت ${item.number}`;
  }
}

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

/* ===== سوییپ واقعی ===== */

let startX = 0;
let startY = 0;
let isMoving = false;

document.body.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  isMoving = false;
});

document.body.addEventListener("touchmove", e => {
  isMoving = true;
});

document.body.addEventListener("touchend", e => {
  if (!isMoving) return; // فقط ضربه بوده

  let endX = e.changedTouches[0].clientX;
  let diffX = endX - startX;

  if (Math.abs(diffX) < 60) return; // حرکت کم، بی‌اثر

  if (diffX < 0) {
    next();   // کشیدن به چپ → بعدی
  } else {
    prev();   // کشیدن به راست → قبلی
  }
});

// شروع
render();
