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

/* ===== سوییپ فقط با کشیدن واقعی ===== */

let startX = 0;
let moved = false;

document.body.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  moved = false;
});

document.body.addEventListener("touchmove", e => {
  moved = true;
});

document.body.addEventListener("touchend", e => {
  if (!moved) return;

  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) < 70) return;

  if (diff < 0) next();
  else prev();
});

render();
