const verses = [
  {
    daftar: 1,
    number: 1,
    text: "بشنو از نی چون حکایت می‌کند\nاز جدایی‌ها شکایت می‌کند",
    explain: "این بیت آغاز مثنوی است و دعوت به شنیدن سخن جان است."
  },
  {
    daftar: 1,
    number: 2,
    text: "کز نیستان تا مرا ببریده‌اند\nدر نفیرم مرد و زن نالیده‌اند",
    explain: "نی نماد روح جداافتاده از اصل خویش است."
  },
  {
    daftar: 1,
    number: 3,
    text: "سینه خواهم شرحه شرحه از فراق\nتا بگویم شرح درد اشتیاق",
    explain: "فراق سبب پیدایش شوق و درد عاشقانه است."
  }
];

let currentIndex = 0;

const verseMeta = document.getElementById("verse-meta");
const verseText = document.getElementById("verse-text");
const explainBox = document.getElementById("explain-box");

function renderVerse() {
  const v = verses[currentIndex];
  verseMeta.textContent = `دفتر ${v.daftar} · بیت ${v.number}`;
  verseText.innerText = v.text;
  explainBox.innerText = v.explain;
}

renderVerse();
