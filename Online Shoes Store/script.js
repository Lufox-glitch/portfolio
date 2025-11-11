// ...existing code...
// smoother mobile menu + robust search (debounced, enter/click)
const closeBtn = document.querySelector(".close");
const openBtn = document.querySelector(".ham");
const menu = document.querySelector(".menu");

// -- Menu behavior (use class .open for smooth CSS transitions) --
if (openBtn && menu) {
  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
  });
}

if (closeBtn && menu) {
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
  });
}

// Close menu when clicking outside or pressing Escape
document.addEventListener("click", (e) => {
  if (!menu || !menu.classList.contains("open")) return;
  if (!menu.contains(e.target) && !openBtn.contains(e.target)) {
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu && menu.classList.contains("open")) {
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
  }
});

// -- Search functionality --
// tries to find common search elements; works even if some are missing
const searchInput = document.querySelector(".search input") || document.getElementById("input");
const searchBtn = document.querySelector(".search .s") || document.querySelector(".search button") || document.querySelector(".search a");
const productItems = Array.from(document.querySelectorAll(".items"));

// debounce helper for smoother typing UX
function debounce(fn, delay = 180) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function performSearch() {
  if (!productItems.length) return; // nothing to filter
  const q = (searchInput && searchInput.value || "").trim().toLowerCase();

  if (!q) {
    productItems.forEach(it => {
      it.style.display = "";
      it.classList.remove("hidden-by-search");
    });
    return;
  }

  productItems.forEach(it => {
    const title = (it.querySelector(".name")?.textContent || it.textContent || "").toLowerCase();
    const info = (it.querySelector(".info")?.textContent || "").toLowerCase();
    const match = title.includes(q) || info.includes(q);
    it.style.display = match ? "" : "none";
    it.classList.toggle("hidden-by-search", !match);
  });
}

const debouncedPerformSearch = debounce(performSearch);

if (searchInput) {
  searchInput.addEventListener("input", debouncedPerformSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") performSearch();
  });
}

if (searchBtn) {
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    performSearch();
  });
}