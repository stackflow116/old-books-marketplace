// ==========================
// CURATOR MODE
// ==========================

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


// ==========================
// BOOK DATA
// ==========================

let books = [
  {
    id: 1,
    title: "The Alchemist's Ledger",
    author: "Unknown Author",
    isbn: "978-1111111111",
    price: "$4,250",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrI8KxJhaCG5x8xZucRNTpN3SNhowmgs1OOhivKS5q4bpzDowuVdBzDCGTt-a1c1HU3uYdsxGBX8XyHNqScf5HPiIcY3LDFsW3xqGddti_xHQPp7z8qFGEFJozo-Y7YC6x4XjmVNSOG8EAd4tFyMfeoSYkXSab_PSHvk13oNxqUbip4uO6e1YCRvM-vMJXjRNrMqMqM4ukuLVAezpJX8tzd87sUGMDZLOK3OTW2fQoNggsZBXTsTAqwEdthiZMC7bJIM4Wn7vVvTkJ"
  },

  {
    id: 2,
    title: "Nocturnal Voyages",
    author: "Henry Blake",
    isbn: "978-2222222222",
    price: "$890",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbQJ2ARfjSDOwCCbT0yFovFGJiSoMI9TQoz_euvvNhAc7iDoYMEdSDBISE5TwGbDlo_QF5SmOy282bcDFeRdszl5RdtEQjC-nHEl4jGCAYBPoe0i1wJU9xZ06hKlEYnZdNeJVSrJ_UzVHahS25Ed9rL3MIQxO0PRSjoZB5IzS8FaJxM0uEOb6csM9yK8pY82tagJ4by8KqhZFVLCOf4nPsq7PUppXrM_Slx8CbiO1x9iPCJmynwfm7SZPc_hxX36nxY_DnZLVC7mTY"
  }
];


// ==========================
// DOM ELEMENTS
// ==========================

const bookGrid = document.getElementById("book-grid");

const addBookBtn = document.getElementById("add-book-btn");

const titleInput = document.getElementById("book-title");

const authorInput = document.getElementById("book-author");

const isbnInput = document.getElementById("book-isbn");

const priceInput = document.getElementById("book-price");


// ==========================
// RENDER BOOKS
// ==========================

function renderBooks() {

  bookGrid.innerHTML = "";

  books.forEach((book) => {

    const bookCard = document.createElement("div");

    bookCard.classList.add("book-card");

    bookCard.dataset.id = book.id;

    bookCard.innerHTML = `
    
      <div class="book-image-wrapper">

        <img src="${book.image}" alt="${book.title}" />

        <div class="curator-controls">

          <button class="edit-btn">
            <span class="material-symbols-outlined">edit</span>
          </button>

          <button class="delete-btn">
            <span class="material-symbols-outlined">delete</span>
          </button>

        </div>

      </div>

      <h4>${book.title}</h4>

      <p class="book-meta">
        Author: ${book.author}
      </p>

      <p class="book-meta">
        ISBN: ${book.isbn}
      </p>

      <div class="book-footer">

        <span class="price-tag">${book.price}</span>

        <button class="bookmark-btn">
          <span class="material-symbols-outlined">bookmark</span>
        </button>

      </div>
    `;

    bookGrid.appendChild(bookCard);
  });
}


// ==========================
// ADD BOOK
// ==========================

addBookBtn.addEventListener("click", () => {

  const title = titleInput.value.trim();

  const author = authorInput.value.trim();

  const isbn = isbnInput.value.trim();

  const price = priceInput.value.trim();

  if (!title || !author || !isbn || !price) {

    alert("Please fill all fields.");

    return;
  }

  const newBook = {
    id: Date.now(),
    title,
    author,
    isbn,
    price,
    image:
      "https://via.placeholder.com/300x400?text=Book+Cover"
  };

  books.push(newBook);

  renderBooks();

  titleInput.value = "";
  authorInput.value = "";
  isbnInput.value = "";
  priceInput.value = "";
});


// ==========================
// EDIT + DELETE
// ==========================

document.addEventListener("click", (e) => {

  const editBtn = e.target.closest(".edit-btn");

  const deleteBtn = e.target.closest(".delete-btn");


  // ======================
  // EDIT
  // ======================

  if (editBtn) {

    const card = editBtn.closest(".book-card");

    const id = Number(card.dataset.id);

    const book = books.find((b) => b.id === id);

    if (!book) return;

    const newTitle = prompt(
      "Enter Book Name:",
      book.title
    );

    const newAuthor = prompt(
      "Enter Author Name:",
      book.author
    );

    const newISBN = prompt(
      "Enter ISBN:",
      book.isbn
    );

    const newPrice = prompt(
      "Enter Price:",
      book.price
    );

    if (
      newTitle &&
      newAuthor &&
      newISBN &&
      newPrice
    ) {

      book.title = newTitle;
      book.author = newAuthor;
      book.isbn = newISBN;
      book.price = newPrice;

      renderBooks();
    }
  }


  // ======================
  // DELETE
  // ======================

  if (deleteBtn) {

    const card = deleteBtn.closest(".book-card");

    const id = Number(card.dataset.id);

    const confirmDelete = confirm(
      "Remove this book?"
    );

    if (confirmDelete) {

      books = books.filter((book) => book.id !== id);

      renderBooks();
    }
  }
});


// ==========================
// HORIZONTAL SCROLL
// ==========================

const booksContainer = document.querySelector(".books-container");

booksContainer.addEventListener(
  "wheel",
  (e) => {

    e.preventDefault();

    booksContainer.scrollLeft += e.deltaY;
  },
  { passive: false }
);


// ==========================
// INITIAL RENDER
// ==========================

renderBooks();