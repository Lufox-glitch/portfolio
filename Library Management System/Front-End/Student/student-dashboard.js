document.addEventListener("DOMContentLoaded", () => {
  // Check if student is logged in
  const currentStudent = JSON.parse(localStorage.getItem("currentStudent"));
  if (!currentStudent) {
    // Redirect to login if not authenticated
    window.location.href = "student-login.html";
    return;
  }

  // Populate user info
  document.getElementById("studentName").textContent = currentStudent.name;
  document.getElementById("studentEmail").textContent = currentStudent.email;

  // Logout handler
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("currentStudent");
    window.location.href = "student-login.html";
  });

  // Search books
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const tbody = document.getElementById("booksTableBody");
  const requestList = document.getElementById("requestList");

  function filterBooks(query) {
    const q = (query || "").trim().toLowerCase();
    const rows = Array.from(tbody.querySelectorAll("tr"));
    if (!q) {
      rows.forEach(r => r.style.display = "");
      return;
    }
    rows.forEach(r => {
      const text = (r.textContent || "").toLowerCase();
      r.style.display = text.includes(q) ? "" : "none";
    });
  }

  searchBtn.addEventListener("click", () => filterBooks(searchInput.value));
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterBooks("");
  });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") filterBooks(searchInput.value);
  });

  // Handle book requests
  tbody.addEventListener("click", (e) => {
    if (!e.target.matches(".request-btn")) return;
    const row = e.target.closest("tr");
    const title = row.querySelector(".title").textContent.trim();

    // Add to request list
    if (requestList.querySelector("li:first-child").textContent === "No requests yet.") {
      requestList.innerHTML = "";
    }
    const li = document.createElement("li");
    li.style.cssText = "padding:10px;background:#f0f0f0;border-radius:4px;margin-bottom:8px;";
    li.textContent = `${title} — Requested on ${new Date().toLocaleString()}`;
    requestList.appendChild(li);

    e.target.textContent = "Requested";
    e.target.disabled = true;
  });
});