// Database
let libraryInventory = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: "1925",
    edition: "First Edition",
    price: "$14,500",
    status: "Available"
  },

  {
    id: 2,
    title: "Ulysses",
    author: "James Joyce",
    year: "1922",
    edition: "Shakespeare & Co. First",
    price: "$42,000",
    status: "Reserved"
  },

  {
    id: 3,
    title: "Moby Dick",
    author: "Herman Melville",
    year: "1851",
    edition: "First American Edition",
    price: "$180,000",
    status: "Sold"
  },

  {
    id: 4,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: "1937",
    edition: "First Printing",
    price: "$65,000",
    status: "Available"
  }
];

const inventoryListEl = document.getElementById("inventoryList");
const volumeCountEl = document.getElementById("volumeCount");
const volumeForm = document.getElementById("volumeForm");
const modal = document.getElementById("addModal");
const searchInput = document.getElementById("archiveSearch");

const drawer = document.getElementById("drawer");
const menuBtn = document.getElementById("menuBtn");
const closeDrawerBtn = document.getElementById("closeDrawer");

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

function getStatusClasses(status) {
  switch (status) {
    case "Available":
      return "bg-secondary-fixed text-on-secondary-fixed border border-secondary/20";

    case "Reserved":
      return "bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary/20";

    case "Sold":
      return "bg-error-container text-on-error-container border border-error/20";

    default:
      return "bg-surface-container text-on-surface-variant";
  }
}

function renderInventory(filter = "") {
  const filteredData = libraryInventory.filter((item) => {
    return (
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.author.toLowerCase().includes(filter.toLowerCase())
    );
  });

  inventoryListEl.innerHTML = filteredData
    .map((item) => {
      return `
        <div class="bg-surface-bright p-5 border border-outline-variant rounded-xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden">

          ${
            item.status === "Available"
              ? `
            <div class="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rotate-45 translate-x-8 -translate-y-8"></div>
          `
              : ""
          }

          <div class="flex justify-between items-start mb-2">

            <div class="flex-1">
              <h3 class="font-headline-lg-mobile text-primary leading-tight mb-1">
                ${item.title}
              </h3>

              <p class="font-body-md text-on-surface-variant italic">
                ${item.author}, ${item.year}
              </p>
            </div>

            <div class="ex-libris-badge px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-tertiary">
              Verified
            </div>

          </div>

          <div class="flex items-center gap-3 mb-4">
            <span class="inline-block px-2 py-0.5 bg-surface-container-high border border-outline-variant text-[12px] font-label-md rounded-sm uppercase">
              ${item.edition}
            </span>
          </div>

          <div class="flex justify-between items-center pt-4 border-t border-outline-variant/30">

            <span class="font-headline-lg-mobile text-secondary font-semibold">
              ${item.price}
            </span>

            <span class="font-label-md px-3 py-1 rounded-full text-[12px] ${getStatusClasses(
              item.status
            )}">
              ${item.status}
            </span>

          </div>
        </div>
      `;
    })
    .join("");

  volumeCountEl.textContent = `${filteredData.length} Volume${
    filteredData.length === 1 ? "" : "s"
  } Cataloged`;
}

function openModal() {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function toggleDrawer() {
  drawer.classList.toggle("-translate-x-full");
}

// Drawer events
menuBtn.addEventListener("click", toggleDrawer);
closeDrawerBtn.addEventListener("click", toggleDrawer);

// Modal events
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

// Search
searchInput.addEventListener("input", (e) => {
  renderInventory(e.target.value);
});

// Form submit
volumeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(volumeForm);

  const newVolume = {
    id: Date.now(),
    title: formData.get("title"),
    author: formData.get("author"),
    year: formData.get("year"),
    edition: formData.get("edition"),
    price: formData.get("price"),
    status: formData.get("status")
  };

  libraryInventory.unshift(newVolume);

  renderInventory();

  volumeForm.reset();

  closeModal();

  // Animation
  const firstRow = inventoryListEl.firstElementChild;

  firstRow.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    firstRow.classList.remove("scale-95", "opacity-0");

    firstRow.classList.add(
      "transition-all",
      "duration-500",
      "scale-100",
      "opacity-100"
    );
  }, 10);
});

// Initial render
renderInventory();