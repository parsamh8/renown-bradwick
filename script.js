// LOADER FALLBACK
setTimeout(() => document.querySelector("#loader")?.classList.add("hidden"), 2000);

// REMOVE LOADER WHEN PAGE READY
window.addEventListener("load", () => {
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
document.querySelector(".feedback-form").addEventListener("submit", (e) => {
  let m = document.querySelector("#message");
  if (!m.value.trim()) { alert("Enter message."); e.preventDefault(); }
});

// POSTER AUTO SCROLL + SWIPE
const strip = document.querySelector("#posterCarousel");
let scrollSpeed = 0.5;

function autoScroll() {
  strip.scrollLeft += scrollSpeed;
  if (strip.scrollLeft >= strip.scrollWidth - strip.clientWidth) {
    strip.scrollLeft = 0;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);

// swipe support (touch drag)
let isDown = false;
let startX, scrollLeft;

strip.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - strip.offsetLeft;
  scrollLeft = strip.scrollLeft;
});

strip.addEventListener("mouseleave", () => (isDown = false));
strip.addEventListener("mouseup", () => (isDown = false));
strip.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - strip.offsetLeft;
  const walk = (x - startX) * 1.2;
  strip.scrollLeft = scrollLeft - walk;
});

// Touch swipe (mobile)
strip.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].pageX;
  scrollLeft = strip.scrollLeft;
});
strip.addEventListener("touchend", () => (isDown = false));
strip.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 1.2;
  strip.scrollLeft = scrollLeft - walk;
});

// --- POSTER CLICK MODAL ---
const modal = document.getElementById("posterModal");
const modalImg = modal.querySelector(".modal-img");
const modalTitle = modal.querySelector(".modal-title");
const modalDate = modal.querySelector(".modal-date");
const modalTime = modal.querySelector(".modal-time");
const modalDesc = modal.querySelector(".modal-desc");
const modalLink = modal.querySelector(".modal-link");



document.querySelectorAll("#posterCarousel .poster").forEach((poster) => {
  poster.addEventListener("click", () => {
    modal.classList.add("active");

    const img = poster.querySelector("img");
    modalImg.src = img ? img.src : "";

    modalTitle.textContent = poster.dataset.title || "";
    modalDate.textContent = poster.dataset.date ? `📅 ${poster.dataset.date}` : "";
    modalTime.textContent = poster.dataset.time ? `⏰ ${poster.dataset.time}` : "";
    modalDesc.textContent = poster.dataset.desc || "";

    const link = poster.dataset.link;
    if (link) {
      modalLink.href = link;
      modalLink.style.display = "inline-block";
    } else {
      modalLink.style.display = "none";
    }

    [modalDate, modalTime, modalDesc].forEach((el) => {
      el.style.display = el.textContent.trim() ? "block" : "none";
    });
  });
});

// close modal
modal.querySelector(".modal-bg").addEventListener("click", () => modal.classList.remove("active"));
modal.querySelector(".close-btn").addEventListener("click", () => modal.classList.remove("active"));

// hide empty fields visually
[modalDate, modalTime, modalDesc].forEach((el) => {
  if (!el.textContent.trim()) {
    el.style.display = "none";
  } else {
    el.style.display = "block";
  }
});