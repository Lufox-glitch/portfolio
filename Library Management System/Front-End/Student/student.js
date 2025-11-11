document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("studentSearch");
  const searchBtn = document.getElementById("studentSearchBtn");
  const clearBtn = document.getElementById("clearSearchBtn");
  const table = document.querySelector("#availableBooks tbody");
  const requestList = document.getElementById("requestList");

  function filterBooks(query) {
    const q = (query || "").trim().toLowerCase();
    const rows = Array.from(table.querySelectorAll("tr"));
    if (!q) {
      rows.forEach(r => r.style.display = "");
      return;
    }
    rows.forEach(r => {
      const text = (r.textContent || "").toLowerCase();
      r.style.display = text.includes(q) ? "" : "none";
    });
  }

  // debounce helper
  function debounce(fn, wait = 150) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }
  const debouncedFilter = debounce(e => filterBooks(e.target.value), 150);

  if (searchInput) {
    searchInput.addEventListener("input", debouncedFilter);
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") filterBooks(searchInput.value);
      if (e.key === "Escape") {
        searchInput.value = "";
        filterBooks("");
      }
    });
  }
  if (searchBtn) searchBtn.addEventListener("click", () => filterBooks(searchInput.value));
  if (clearBtn) clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterBooks("");
  });

  // Borrow request handling (client-side demo)
  table.addEventListener("click", (e) => {
    if (!e.target.matches(".borrow-btn")) return;
    const row = e.target.closest("tr");
    const title = row.querySelector(".title").textContent.trim();
    // simple request item
    const li = document.createElement("li");
    li.textContent = `${title} — requested on ${new Date().toLocaleString()}`;
    requestList.appendChild(li);
    e.target.textContent = "Requested";
    e.target.disabled = true;
  });
});