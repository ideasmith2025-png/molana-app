let index=0;
let currentDaftar="all";
const verseText=document.getElementById("verseText");
const explainText=document.getElementById("explainText");
const verseInfo=document.getElementById("verseInfo");
const settingsToggle=document.getElementById("settingsToggle");
const settingsPanel=document.getElementById("settingsPanel");
const closeSettings=document.getElementById("closeSettings");
const autoNextCheckbox=document.getElementById("autoNext");
const touchNextCheckbox=document.getElementById("touchNext");
const themeSelect=document.getElementById("themeSelect");
const daftarSelect=document.getElementById("daftarSelect");
const searchInput=document.getElementById("searchInput");

let autoNextEnabled=false;
let touchNextEnabled=true;
let autoNextTimer=null;

function filteredVerses(){
  let list=currentDaftar==="all"?verses:verses.filter(v=>v.daftar==currentDaftar);
  const query=searchInput.value.trim();
  if(query) list=list.filter(v=>v.text.includes(query) || (v.explain && v.explain.includes(query)));
  return list;
}

function render(){
  const list=filteredVerses();
  if(index>=list.length) index=list.length-1;
  if(index<0) index=0;
  const item=list[index];
  verseText.innerText="";
  explainText.innerText="";
  verseInfo.innerText="";
  if(item.type==="intro"){verseText.innerText=item.text;verseInfo.innerText=`دفتر ${item.daftar} · مقدمه`}
  if(item.type==="section"){verseText.innerText=item.text;explainText.innerText=item.explain||"";verseInfo.innerText=`دفتر ${item.daftar} · بخش`}
  if(item.type==="verse"){verseText.innerText=item.text;explainText.innerText=item.explain||"";verseInfo.innerText=`دفتر ${item.daftar} · بیت ${item.number}`}
  if(autoNextEnabled){clearTimeout(autoNextTimer); autoNextTimer=setTimeout(next,5000);}
}

function next(){index++; render();}
function prev(){index--; render();}

let startX=null;
document.body.addEventListener("touchstart",e=>{startX=e.touches[0].clientX;});
document.body.addEventListener("touchend",e=>{
  if(!touchNextEnabled)return;
  const endX=e.changedTouches[0].clientX;
  const diff=endX-startX;
  startX=null;
  if(Math.abs(diff)<60) return;
  if(diff>0) prev(); else next();
});

// لمس صفحه برای رفتن بعدی اگر فعال باشد
document.body.addEventListener("click",()=>{
  if(touchNextEnabled) next();
});

// تنظیمات
settingsToggle.addEventListener("click",()=>{settingsPanel.style.display="flex";});
closeSettings.addEventListener("click",()=>{settingsPanel.style.display="none";});
autoNextCheckbox.addEventListener("change",()=>{
  autoNextEnabled=autoNextCheckbox.checked;
  settingsPanel.style.display="none";
});
touchNextCheckbox.addEventListener("change",()=>{
  touchNextEnabled=touchNextCheckbox.checked;
  settingsPanel.style.display="none";
});
themeSelect.addEventListener("change",()=>{
  document.body.className=themeSelect.value;
  settingsPanel.style.display="none";
});

// انتخاب دفتر
daftarSelect.addEventListener("change",(e)=>{
  currentDaftar=e.target.value;
  index=0;
  render();
});

// جستجو
searchInput.addEventListener("input",()=>{index=0; render();});

render();
