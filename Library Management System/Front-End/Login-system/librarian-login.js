// Mock librarian database (replace with backend API later)
const VALID_LIBRARIANS = {
  "L001": { password: "admin123", name: "Admin Librarian", email: "admin@library.com", role: "Senior" },
  "L002": { password: "libpass456", name: "John Librarian", email: "john@library.com", role: "Junior" },
  "L003": { password: "libpass789", name: "Sarah Librarian", email: "sarah@library.com", role: "Senior" }
};

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("librarianLoginForm");
  const errorMsg = document.getElementById("errorMsg");
  const successMsg = document.getElementById("successMsg");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const librarianId = document.getElementById("librarianId").value.trim();
    const password = document.getElementById("librarianPassword").value.trim();

    errorMsg.style.display = "none";
    successMsg.style.display = "none";
    errorMsg.textContent = "";
    successMsg.textContent = "";

    // Validation
    if (!librarianId || !password) {
      errorMsg.textContent = "⚠️ Please enter both Librarian ID and Password.";
      errorMsg.style.display = "block";
      return;
    }

    // Check credentials (mock authentication)
    if (VALID_LIBRARIANS[librarianId] && VALID_LIBRARIANS[librarianId].password === password) {
      // Success: store session in localStorage
      const librarian = VALID_LIBRARIANS[librarianId];
      localStorage.setItem("currentLibrarian", JSON.stringify({
        id: librarianId,
        name: librarian.name,
        email: librarian.email,
        role: librarian.role,
        loginTime: new Date().toISOString()
      }));

      successMsg.textContent = "✓ Login successful! Redirecting to dashboard...";
      successMsg.style.display = "block";
      setTimeout(() => {
        window.location.href = "Librarian/Librarian-dashbiard.html";
      }, 1000);
    } else {
      errorMsg.textContent = "❌ Invalid Librarian ID or Password.";
      errorMsg.style.display = "block";
    }
  });
});