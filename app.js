let currentDaftar = 1;
let currentIndex = -1;
let items = [];

const verseText = document.getElementById("verseText");
const verseMeta = document.getElementById("verseMeta");
const explainText = document.getElementById("explainText");

function loadDaftar(n) {
  const d = DATA.find(x => x.daftar == n);
  items = [{ verse: d.intro, explain: "" }, ...d.items];
  currentIndex = 0;
  render();
}

function render() {
  const item = items[currentIndex];
  verseText.textContent = item.verse;
  explainText.textContent = item.explain || "";
  verseMeta.textContent =
    currentIndex === 0 ? "" : `دفتر ${currentDaftar} · بیت ${currentIndex}`;
}

function next() {
  if (currentIndex < items.length - 1) {
    currentIndex++;
    render();
  }
}

function prev() {
  if (currentIndex > 0) {
    currentIndex--;
    render();
  }
}

let startX = 0;

document.body.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.body.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (endX > startX + 50) next();
  if (endX < startX - 50) prev();
});

document.body.addEventListener("click", e => {
  const w = window.innerWidth;
  if (e.clientX < w / 2) next();
  else prev();
});

document.getElementById("menuBtn").onclick = () => {
  document.getElementById("menu").classList.toggle("hidden");
};

document.getElementById("daftarSelect").onchange = e => {
  currentDaftar = e.target.value;
  loadDaftar(currentDaftar);
};

document.getElementById("themeSelect").onchange = e => {
  document.body.className = e.target.value;
};

document.getElementById("searchInput").oninput = e => {
  const q = e.target.value;
  const i = items.findIndex(x => x.verse.includes(q));
  if (i >= 0) {
    currentIndex = i;
    render();
  }
};

loadDaftar(1);
