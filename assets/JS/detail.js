const editBtn = document.getElementById("edit-record-btn");
const curatorPanel = document.getElementById("curator-panel");
const standardActions = document.getElementById("standard-actions");

const saveBtn = document.getElementById("save-record-btn");
const cancelBtn = document.getElementById("cancel-edit-btn");

const retireBtn = document.getElementById("retire-record-btn");

const priceDisplay = document.getElementById("price-display");
const priceInput = document.getElementById("price-input");

const noteText = document.getElementById("curator-note-text");
const noteEditIndicator = document.getElementById("note-edit-indicator");

const notification = document.getElementById("status-notification");
const statusMessage = document.getElementById("status-message");

const deleteOverlay = document.getElementById("delete-overlay");

const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");

const mainContent = document.getElementById("main-content");

let originalPrice = priceDisplay.innerText;
let originalNote = noteText.innerText;

function showNotification(message) {
  statusMessage.innerText = message;

  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
  }, 3000);
}

editBtn.addEventListener("click", () => {

  curatorPanel.classList.remove("hidden");

  standardActions.classList.add("hidden");

  editBtn.classList.add("opacity-50");

  noteText.contentEditable = true;

  noteEditIndicator.classList.remove("hidden");

  noteText.focus();

  showNotification("Curator Edit Mode Active");
});

cancelBtn.addEventListener("click", () => {

  curatorPanel.classList.add("hidden");

  standardActions.classList.remove("hidden");

  editBtn.classList.remove("opacity-50");

  priceInput.value = originalPrice;

  noteText.innerText = originalNote;

  noteText.contentEditable = false;

  noteEditIndicator.classList.add("hidden");
});

saveBtn.addEventListener("click", () => {

  originalPrice = priceInput.value;

  originalNote = noteText.innerText;

  priceDisplay.innerText = originalPrice;

  curatorPanel.classList.add("hidden");

  standardActions.classList.remove("hidden");

  editBtn.classList.remove("opacity-50");

  noteText.contentEditable = false;

  noteEditIndicator.classList.add("hidden");

  showNotification("Archive Record Updated");
});

retireBtn.addEventListener("click", () => {
  deleteOverlay.classList.remove("hidden");
});

cancelDeleteBtn.addEventListener("click", () => {
  deleteOverlay.classList.add("hidden");
});

confirmDeleteBtn.addEventListener("click", () => {

  deleteOverlay.classList.add("hidden");

  mainContent.innerHTML = `
    <div
      class="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6"
    >
      <span
        class="material-symbols-outlined text-[80px] text-[#83746f]"
      >
        inventory_2
      </span>

      <h2
        class="text-[56px] font-['EB_Garamond'] text-[#280e06]"
      >
        Record Retired
      </h2>

      <p class="max-w-xl text-[#514440] leading-8">
        This item has been successfully removed from the
        active library collection and moved to the private
        historical archive.
      </p>

      <button
        onclick="window.location.reload()"
        class="border border-[#280e06] text-[#280e06] px-8 py-3 uppercase tracking-widest"
      >
        Return to Catalog
      </button>
    </div>
  `;

  showNotification(
    "Record permanently retired from public view"
  );
});

const wishlistBtn = document.getElementById("wishlist-btn");

wishlistBtn.addEventListener("click", () => {

  const icon =
    wishlistBtn.querySelector(".material-symbols-outlined");

  const isFilled =
    icon.style.fontVariationSettings.includes("'FILL' 1");

  icon.style.fontVariationSettings =
    isFilled
      ? "'FILL' 0"
      : "'FILL' 1";

  wishlistBtn.classList.toggle("bg-[#d7e9bd]");
});

document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {

    anchor.addEventListener("click", function (e) {

      e.preventDefault();

      const target = document.querySelector(
        this.getAttribute("href")
      );

      if (target) {

        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });