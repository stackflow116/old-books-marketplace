// CURATOR MODE

const curatorToggle = document.getElementById("curator-toggle");
const featuredSection = document.getElementById("featured-section");

let curatorMode = false;

curatorToggle.addEventListener("click", () => {

  curatorMode = !curatorMode;

  curatorToggle.classList.toggle("toggle-active");

  if (curatorMode) {
    featuredSection.classList.add("curator-mode");
  } else {
    featuredSection.classList.remove("curator-mode");
  }
});

// EDIT + DELETE

document.addEventListener("click", (e) => {

  // EDIT
  const editBtn = e.target.closest(".edit-btn");

  if (editBtn) {

    const card = editBtn.closest(".book-card");

    const priceElement = card.querySelector(".price-tag");

    const currentPrice = priceElement.innerText;

    const newPrice = prompt(
      "Enter new price:",
      currentPrice
    );

    if (newPrice && newPrice.trim() !== "") {
      priceElement.innerText = newPrice;
    }
  }

  // DELETE
  const deleteBtn = e.target.closest(".delete-btn");

  if (deleteBtn) {

    const card = deleteBtn.closest(".book-card");

    const confirmDelete = confirm(
      "Remove this item from collection?"
    );

    if (confirmDelete) {

      card.classList.add("fade-out");

      setTimeout(() => {
        card.remove();
      }, 400);
    }
  }
});

// HORIZONTAL SCROLL

const booksContainer = document.querySelector(".books-container");

booksContainer.addEventListener(
  "wheel",
  (e) => {

    e.preventDefault();

    booksContainer.scrollLeft += e.deltaY;
  },
  { passive: false }
);