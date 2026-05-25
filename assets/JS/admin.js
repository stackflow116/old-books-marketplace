// Inventory row interaction
document.querySelectorAll(".inventory-row").forEach((row) => {

  row.addEventListener("click", (event) => {

    if (!event.target.closest("button")) {

      console.log("Opening detailed volume view...");

      // Future navigation logic
    }
  });
});

// Fade in animation
document.addEventListener("DOMContentLoaded", () => {

  document.body.style.opacity = "0";

  document.body.style.transition =
    "opacity 0.8s ease-in-out";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Sidebar buttons
document.querySelectorAll(
  ".primary-btn, .secondary-btn, .outline-btn"
).forEach((button) => {

  button.addEventListener("click", () => {

    button.style.transform = "scale(0.98)";

    setTimeout(() => {
      button.style.transform = "";
    }, 120);
  });
});

// Search interaction
const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("focus", () => {
  searchInput.style.boxShadow =
    "0 0 0 2px rgba(84, 99, 65, 0.15)";
});

searchInput.addEventListener("blur", () => {
  searchInput.style.boxShadow =
    "inset 0 2px 4px rgba(64, 34, 24, 0.05)";
});