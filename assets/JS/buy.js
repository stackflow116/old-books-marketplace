const CuratorApp = {
  isCuratorMode: false,

  init() {
    this.cacheDOM();
    this.bindEvents();
  },

  cacheDOM() {
    this.main = document.getElementById("catalog-container");
    this.grid = document.getElementById("book-grid");
    this.toggleBtn = document.getElementById("curator-toggle");
    this.genreButtons = document.querySelectorAll(".genre-btn");
  },

  bindEvents() {

    // Curator mode toggle
    this.toggleBtn.addEventListener("click", () => {
      this.toggleCuratorMode();
    });

    // Event delegation
    this.grid.addEventListener("click", (event) => {
      const editBtn = event.target.closest(".edit-price-btn");
      const removeBtn = event.target.closest(".remove-book-btn");
      const card = event.target.closest(".book-card");

      if (editBtn && card) {
        this.handlePriceEdit(card);
      }

      if (removeBtn && card) {
        this.handleBookRemoval(card);
      }
    });

    // Genre button interaction
    this.genreButtons.forEach((button) => {
      button.addEventListener("click", () => {

        this.genreButtons.forEach((btn) => {
          btn.classList.remove("active-genre");
        });

        button.classList.add("active-genre");
      });
    });

    // Button press animation
    document.querySelectorAll("button").forEach((button) => {

      button.addEventListener("click", () => {

        button.style.transform = "scale(0.95)";

        setTimeout(() => {
          button.style.transform = "";
        }, 100);
      });
    });
  },

  toggleCuratorMode() {
    this.isCuratorMode = !this.isCuratorMode;

    this.main.classList.toggle(
      "curator-active",
      this.isCuratorMode
    );

    if (this.isCuratorMode) {

      this.toggleBtn.classList.add(
        "bg-primary",
        "text-on-primary"
      );

      this.toggleBtn.classList.remove(
        "text-on-surface-variant"
      );

    } else {

      this.toggleBtn.classList.remove(
        "bg-primary",
        "text-on-primary"
      );

      this.toggleBtn.classList.add(
        "text-on-surface-variant"
      );
    }
  },

  handlePriceEdit(card) {

    const priceEl = card.querySelector(".book-price");

    const currentPrice =
      priceEl.getAttribute("data-raw-price");

    const newPrice = prompt(
      "Enter new price for this listing:",
      currentPrice
    );

    if (newPrice !== null) {

      const cleanedPrice = parseFloat(
        newPrice.replace(/[^0-9.]/g, "")
      );

      if (!isNaN(cleanedPrice)) {

        const formattedPrice =
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(cleanedPrice);

        priceEl.textContent = formattedPrice;

        priceEl.setAttribute(
          "data-raw-price",
          cleanedPrice.toFixed(2)
        );

        priceEl.classList.add("text-secondary");

        setTimeout(() => {
          priceEl.classList.remove("text-secondary");
        }, 1000);

      } else {
        alert("Please enter a valid numeric value.");
      }
    }
  },

  handleBookRemoval(card) {

    const confirmed = confirm(
      "Are you sure you want to remove this historical archive from the catalog?"
    );

    if (!confirmed) return;

    card.classList.add("fade-out");

    setTimeout(() => {

      card.remove();

      this.checkEmptyGrid();

    }, 400);
  },

  checkEmptyGrid() {

    if (this.grid.children.length === 0) {

      this.grid.innerHTML = `
        <div class="col-span-full py-20 text-center">

          <span class="material-symbols-outlined text-6xl text-outline-variant mb-4">
            inventory_2
          </span>

          <p class="font-headline-lg text-primary">
            Archives are currently empty.
          </p>

          <button
            onclick="location.reload()"
            class="mt-4 text-secondary underline font-label-md"
          >
            Restore Catalog
          </button>

        </div>
      `;
    }
  }
};

CuratorApp.init();


/////////////////////////////
//////////////Search Books///
////////////////////////////
import { searchBooks } from "./api.js";

document
.getElementById("searchBtn")
.addEventListener("click", async () => {

    const query =
        document.getElementById("searchInput").value;

    const books =
        await searchBooks(query);

    displayBooks(books);
});

function displayBooks(books) {

    const container =
        document.getElementById("google-books");

    container.innerHTML = "";

    books.forEach(book => {

        const info = book.volumeInfo;

        container.innerHTML += `
            <div class="book-card">
                <img src="${info.imageLinks?.thumbnail || ''}">
                <h3>${info.title}</h3>
                <p>${info.authors?.join(", ") || "Unknown"}</p>
            </div>
        `;
    });
}