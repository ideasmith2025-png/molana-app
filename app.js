let index = 0;
let autoTimer = null;

const verseText = document.getElementById("verseText");
const verseInfo = document.getElementById("verseInfo");
const explainText = document.getElementById("explainText");

const topBar = document.getElementById("topBar");
const settingsPanel = document.getElementById("settingsPanel");

function render() {
  const item = data[index];

  if (item.type === "intro") {
    verseText.innerText = item.text;
    verseInfo.innerText = "";
    explainText.innerText = "";
  }

  if (item.type === "section") {
    verseText.innerText = item.text;
    verseInfo.innerText = "";
    explainText.innerText = "";
  }

  if (item.type === "verse") {
    verseText.innerText = item.verse;
    verseInfo.innerText = `دفتر ${item.daftar} – بیت ${item.number}`;
    explainText.innerText = item.explain;
  }
}

render();

/* کشیدن صفحه */
let startX = 0;
document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) next();
});

/* لمس */
let tapEnabled = false;
document.addEventListener("click", () => {
  if (tapEnabled) next();
});

/* نوار بالا */
document.addEventListener("dblclick", () => {
  topBar.classList.toggle("show");
});

/* تنظیمات */
document.getElementById("settingsBtn").onclick = () => {
  settingsPanel.style.display =
    settingsPanel.style.display === "block" ? "none" : "block";
};

document.getElementById("tapToggle").onchange = e => {
  tapEnabled = e.target.checked;
};

document.getElementById("autoPlayToggle").onchange = e => {
  if (e.target.checked) startAuto();
  else stopAuto();
};

document.getElementById("themeSelect").onchange = e => {
  document.body.className = e.target.value;
};

function next() {
  index = (index + 1) % data.length;
  render();
}

function startAuto() {
  const time = document.getElementById("autoPlayTime").value * 1000;
  autoTimer = setInterval(next, time);
}

function stopAuto() {
  clearInterval(autoTimer);
}
