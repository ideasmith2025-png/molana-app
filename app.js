let index=0
let currentDaftar="all"
const verseText=document.getElementById("verseText")
const explainText=document.getElementById("explainText")
const infoText=document.getElementById("infoText")
const settingsToggle=document.getElementById("settingsToggle")
const settingsPanel=document.getElementById("settingsPanel")
const closeSettings=document.getElementById("closeSettings")
const autoNextCheckbox=document.getElementById("autoNext")
const enableSwipeCheckbox=document.getElementById("enableSwipe")
const searchInput=document.getElementById("searchInput")
const daftarSelect=document.getElementById("daftarSelect")
let autoNextEnabled=false
let swipeEnabled=true

function filteredVerses(){
  if(currentDaftar==="all") return verses
  return verses.filter(v=>v.daftar==currentDaftar)
}

function render(){
  const list=filteredVerses()
  if(index>=list.length) index=list.length-1
  if(index<0) index=0
  const item=list[index]
  verseText.innerText=""
  explainText.innerText=""
  infoText.innerText=""
  if(item.type==="intro"){verseText.innerText=item.text;infoText.innerText=`دفتر ${item.daftar} · مقدمه`}
  if(item.type==="section"){verseText.innerText=item.text;explainText.innerText=item.explain||"";infoText.innerText=`دفتر ${item.daftar} · بخش`}
  if(item.type==="verse"){verseText.innerText=item.text;explainText.innerText=item.explain||"";infoText.innerText=`دفتر ${item.daftar} · بیت ${item.number}`}
}

function next(){index++; render()}
function prev(){index--; render()}

let startX=null
document.body.addEventListener("touchstart",e=>{if(!swipeEnabled)return;startX=e.touches[0].clientX})
document.body.addEventListener("touchend",e=>{if(!swipeEnabled||startX===null)return;const endX=e.changedTouches[0].clientX;const diff=endX-startX;startX=null;if(Math.abs(diff)<60)return;if(diff>0)next();else prev()})

settingsToggle.addEventListener("click",()=>{settingsPanel.style.display="flex"})
closeSettings.addEventListener("click",()=>{settingsPanel.style.display="none"})
autoNextCheckbox.addEventListener("change",()=>{autoNextEnabled=autoNextCheckbox.checked;settingsPanel.style.display="none"})
enableSwipeCheckbox.addEventListener("change",()=>{swipeEnabled=enableSwipeCheckbox.checked;settingsPanel.style.display="none"})

// لمس صفحه برای بستن تنظیمات
document.body.addEventListener("touchstart",()=>{if(settingsPanel.style.display==="flex"){settingsPanel.style.display="none"}})

// انتخاب دفتر
daftarSelect.addEventListener("change",(e)=>{currentDaftar=e.target.value;index=0;render()})

// سرچ
searchInput.addEventListener("input",(e)=>{
  const term=e.target.value.trim()
  const list=filteredVerses()
  if(term===""){index=0;render();return}
  const found=list.findIndex(v=>{
    if(v.type==="verse" && (v.text.includes(term) || v.number==term)) return true
    if(v.type==="section" && v.text.includes(term)) return true
    if(v.type==="intro" && v.text.includes(term)) return true
    return false
  })
  if(found>=0){index=found;render()}
})

render()
