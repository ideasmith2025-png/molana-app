let index = 0;

const verseBox = document.getElementById("verseText");
const explainBox = document.getElementById("explainText");
const infoBox = document.getElementById("infoText");

function render() {
  const item = verses[index];

  // ریست
  verseBox.innerText = "";
  explainBox.innerText = "";
  infoBox.innerText = "";

  if (item.type === "intro") {
    verseBox.innerText = item.text;
    infoBox.innerText = `دفتر ${item.daftar} – مقدمه`;
  }

  if (item.type === "section") {
    verseBox.innerText = item.text;
    explainBox.innerText = item.explain || "";
    infoBox.innerText = `دفتر ${item.daftar} – بخش`;
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

// سوییپ روی کل صفحه
let startX = 0;

document.body.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.body.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;

  if (diff < -50) next();     // کشیدن به چپ → بیت بعدی
  if (diff > 50) prev();      // کشیدن به راست → قبلی
});

// شروع
render();
