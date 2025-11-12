// LOADER FALLBACK
setTimeout(() => document.querySelector("#loader")?.classList.add("hidden"), 2000);

// REMOVE LOADER WHEN PAGE READY
window.addEventListener("load", ()=>{
  document.querySelector("#loader").classList.add("hidden");
});

// THEME TOGGLE
// THEME SWITCH
// document.getElementById("themeToggle").addEventListener("click", () => {
//   document.documentElement.classList.toggle("light-theme");
//   localStorage.setItem("theme-mode", document.documentElement.classList.contains("light-theme") ? "light" : "dark");
// });

// Restore theme when reloading page
if (localStorage.getItem("theme-mode") === "light") {
  document.documentElement.classList.add("light-theme");
}

// MESSAGE REQUIRED
document.querySelector(".feedback-form").addEventListener("submit",(e)=>{
  let m = document.querySelector("#message");
  if(!m.value.trim()){ alert("Enter message."); e.preventDefault(); }
});

// POSTER AUTO SCROLL + SWIPE
const strip = document.getElementById("posterCarousel");
let isDown = false, startX, scrollLeft;

strip.addEventListener("mousedown",(e)=>{ isDown=true; startX=e.pageX-strip.offsetLeft; scrollLeft=strip.scrollLeft; });
strip.addEventListener("mouseleave",()=> isDown=false);
strip.addEventListener("mouseup",()=> isDown=false);
strip.addEventListener("mousemove",(e)=>{
  if(!isDown) return;
  strip.scrollLeft = scrollLeft - (e.pageX - strip.offsetLeft - startX);
});

// Auto-scroll loop
setInterval(()=> strip.scrollLeft += 1.2, 25);
