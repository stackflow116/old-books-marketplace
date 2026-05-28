// ===============================
// API URLs
// ===============================

// Local JSON Server
const LOCAL_API = "http://localhost:3000/books";

// Google Books API
const GOOGLE_BOOKS_API =
  "https://www.googleapis.com/books/v1/volumes";


// ===============================
// GET ALL BOOKS FROM JSON SERVER
// ===============================

async function getBooks() {
  try {
    const response = await fetch(LOCAL_API);

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();

  } catch (error) {
    console.error("GET Error:", error);
    return [];
  }
}


// ===============================
// GET SINGLE BOOK
// ===============================

async function getBookById(id) {
  try {
    const response = await fetch(`${LOCAL_API}/${id}`);

    if (!response.ok) {
      throw new Error("Book not found");
    }

    return await response.json();

  } catch (error) {
    console.error("GET BY ID Error:", error);
  }
}


// ===============================
// ADD NEW BOOK
// ===============================

async function createBook(bookData) {
  try {
    const response = await fetch(LOCAL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookData)
    });

    if (!response.ok) {
      throw new Error("Failed to create book");
    }

    return await response.json();

  } catch (error) {
    console.error("POST Error:", error);
  }
}


// ===============================
// UPDATE BOOK
// ===============================

async function updateBook(id, updatedData) {
  try {
    const response = await fetch(`${LOCAL_API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      throw new Error("Failed to update book");
    }

    return await response.json();

  } catch (error) {
    console.error("PUT Error:", error);
  }
}


// ===============================
// DELETE BOOK
// ===============================

async function deleteBook(id) {
  try {
    const response = await fetch(`${LOCAL_API}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }

    return true;

  } catch (error) {
    console.error("DELETE Error:", error);
    return false;
  }
}


// ===============================
// SEARCH GOOGLE BOOKS API
// ===============================

async function searchGoogleBooks(query) {
  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Google Books API failed");
    }

    const data = await response.json();

    return data.items || [];

  } catch (error) {
    console.error("Google API Error:", error);
    return [];
  }
}