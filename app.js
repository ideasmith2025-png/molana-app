const verses = [

  // ======================
  // دفتر اول
  // ======================

  {
    type: "intro",
    daftar: 1,
    text: "مقدمه دفتر اول",
    explain: "این دفتر با حکایت نی آغاز می‌شود و بیانگر جدایی روح از اصل خویش است."
  },

  {
    type: "section",
    daftar: 1,
    section: 1,
    text: "بخش اول: حکایت نی",
    explain: "در این بخش مولانا با زبان نی، درد فراق را بیان می‌کند."
  },

  {
    type: "verse",
    daftar: 1,
    section: 1,
    number: 1,
    text: "بشنو از نی چون حکایت می‌کند\nاز جدایی‌ها شکایت می‌کند",
    explain: "نی نماد روح جداافتاده از اصل الهی است."
  },
  {
    type: "verse",
    daftar: 1,
    section: 1,
    number: 2,
    text: "کز نیستان تا مرا ببریده‌اند\nدر نفیرم مرد و زن نالیده‌اند",
    explain: "روح انسان از عالم بالا جدا شده و ناله می‌کند."
  },

  {
    type: "section",
    daftar: 1,
    section: 2,
    text: "بخش دوم: درد اشتیاق",
    explain: "در این بخش شوق بازگشت به اصل توصیف می‌شود."
  },

  {
    type: "verse",
    daftar: 1,
    section: 2,
    number: 3,
    text: "سینه خواهم شرحه شرحه از فراق\nتا بگویم شرح درد اشتیاق",
    explain: "فراق باعث عمق یافتن شوق می‌شود."
  },

  // ======================
  // دفتر دوم
  // ======================

  {
    type: "intro",
    daftar: 2,
    text: "مقدمه دفتر دوم",
    explain: "دفتر دوم وارد لایه‌های عمیق‌تری از سلوک می‌شود."
  },

  {
    type: "section",
    daftar: 2,
    section: 1,
    text: "بخش اول: دعوت به عشق",
    explain: "مولانا انسان را به عشق و صبر دعوت می‌کند."
  },

  {
    type: "verse",
    daftar: 2,
    section: 1,
    number: 1,
    text: "ای دل بیا تا درس عشق بگیریم",
    explain: "عشق راه اصلی سلوک است."
  },
  {
    type: "verse",
    daftar: 2,
    section: 1,
    number: 2,
    text: "در طلب حق باش و صبر پیشه کن",
    explain: "بدون صبر رسیدن ممکن نیست."
  }

];

// ======================
// منطق برنامه (دست نزن)
// ======================

let filteredVerses = [...verses];
let currentIndex = 0;

const verseMeta = document.getElementById("verse-meta");
const verseText = document.getElementById("verse-text");
const explainBox = document.getElementById("explain-box");

function renderVerse() {
  const v = filteredVerses[currentIndex];

  if (!v) return;

  if (v.type === "intro") {
    verseText.innerText = v.text;
    verseMeta.innerText = `دفتر ${v.daftar} · مقدمه`;
    explainBox.innerText = v.explain;
  }

  if (v.type === "section") {
    verseText.innerText = v.text;
    verseMeta.innerText = `دفتر ${v.daftar} · بخش ${v.section}`;
    explainBox.innerText = v.explain;
  }

  if (v.type === "verse") {
    verseText.innerText = v.text;
    verseMeta.innerText = `دفتر ${v.daftar} · بیت ${v.number}`;
    explainBox.innerText = v.explain;
  }
}

renderVerse();

// ======================
// سوییپ
// ======================

let startX = 0;
document.getElementById("app").addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.getElementById("app").addEventListener("touchend", e => {
  let diff = e.changedTouches[0].clientX - startX;
  if (diff > 50 && currentIndex < filteredVerses.length - 1) currentIndex++;
  if (diff < -50 && currentIndex > 0) currentIndex--;
  renderVerse();
});
