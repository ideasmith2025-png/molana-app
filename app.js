let index = 0;

const verseText = document.getElementById("verseText");
const explainText = document.getElementById("explainText");
const infoText = document.getElementById("infoText");

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

/* ===== سوییپ دقیق ===== */
/*
قانون:
startX = جای شروع انگشت
endX   = جای پایان انگشت

اگر:
endX > startX  → حرکت به راست → آیتم بعدی
endX < startX  → حرکت به چپ  → آیتم قبلی
*/

let startX = null;

document.body.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.body.addEventListener("touchend", e => {
  if (startX === null) return;

  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  startX = null;

  if (Math.abs(diff) < 60) return; // ضربه یا حرکت کم

  if (diff > 0) {
    next();   // 👈 از چپ به راست → بعدی
  } else {
    prev();   // 👉 از راست به چپ → قبلی
  }
});

render();
