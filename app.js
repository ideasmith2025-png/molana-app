let currentIndex = 0;

const card = document.getElementById("card");
const verseMeta = document.getElementById("verse-meta");
const verseText = document.getElementById("verse-text");
const explainBox = document.getElementById("explain-box");

function renderVerse() {
  const v = verses[currentIndex];
  if (!v) return;

  card.classList.remove("verse", "intro", "section");

  if (v.type === "intro") {
    card.classList.add("intro");
    verseMeta.innerText = `دفتر ${v.daftar} · مقدمه`;
  }

  if (v.type === "section") {
    card.classList.add("section");
    verseMeta.innerText = `دفتر ${v.daftar}`;
  }

  if (v.type === "verse") {
    card.classList.add("verse");
    verseMeta.innerText = `دفتر ${v.daftar} · بیت ${v.number}`;
  }

  verseText.innerText = v.text;
  explainBox.innerText = v.explain || "";
}

document.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= verses.length) currentIndex = 0;
  renderVerse();
});

renderVerse();
