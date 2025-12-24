let b = 0, s = 0, v = -1;
let autoTimer = null;
let tapEnabled = false;

const verseCard = document.getElementById("verseCard");
const noteCard = document.getElementById("noteCard");

function showNext() {
  const book = books[b];
  const section = book.sections[s];

  v++;
  if (v === -1) {
    verseCard.innerHTML = book.intro;
    noteCard.innerHTML = "";
    return;
  }

  if (v >= section.verses.length) return;

  const verse = section.verses[v];
  verseCard.innerHTML = `
    ${verse.text}
    <div class="meta">دفتر ${book.id} – بیت ${verse.num}</div>
  `;
  noteCard.innerHTML = verse.note;
}

function toggleTopBar() {
  document.getElementById("topBar").classList.toggle("hidden");
}

document.body.addEventListener("click", e => {
  if (tapEnabled) showNext();
  toggleTopBar();
});

let startX = null;
document.body.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});
document.body.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - startX;
  if (dx > 50) showNext();
});

document.getElementById("settingsBtn").onclick = e => {
  e.stopPropagation();
  document.getElementById("settingsPanel").classList.toggle("hidden");
};

document.getElementById("booksBtn").onclick = e => {
  e.stopPropagation();
  const panel = document.getElementById("booksPanel");
  panel.innerHTML = books.map((bk,i)=>`<div onclick="b=${i};s=0;v=-1;showNext()">${bk.title}</div>`).join("");
  panel.classList.toggle("hidden");
};

document.getElementById("tapToggle").onchange = e => {
  tapEnabled = e.target.checked;
};

document.getElementById("autoTime").onchange = e => {
  clearInterval(autoTimer);
  autoTimer = setInterval(showNext, e.target.value * 1000);
};

document.getElementById("themeSelect").onchange = e => {
  document.body.className = e.target.value;
};

showNext();
