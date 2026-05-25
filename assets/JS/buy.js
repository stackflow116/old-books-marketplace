<<<<<<< HEAD
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
=======
// Button click animation
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {

    button.style.transform = "scale(0.95)";

    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 100);

  });
});

// Filter button active state
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((btn) => {
      btn.classList.remove("active-filter");
    });

    button.classList.add("active-filter");

  });

});
>>>>>>> d7e0ce82965b573550499d41b889982c7d7166ed
