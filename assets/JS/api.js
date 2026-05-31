// ================================
// API Configuration
// ================================

const BASE_URL = "http://localhost:3000";
const BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";


// ================================
// GET ALL BOOKS
// ================================

export async function fetchBooks() {
    try {
        const response = await fetch(BOOKS_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }

        return await response.json();

    } catch (error) {
        console.error("Fetch Books Error:", error);
        return [];
    }
}


// ================================
// GET SINGLE BOOK
// ================================

export async function fetchBookById(id) {
    try {
        const response = await fetch(`${BOOKS_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Failed to fetch book");
        }

        return await response.json();

    } catch (error) {
        console.error("Fetch Book Error:", error);
        return null;
    }
}


// ================================
// ADD NEW BOOK
// ================================

export async function addBook(bookData) {
    try {
        const response = await fetch(BOOKS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookData)
        });

        if (!response.ok) {
            throw new Error("Failed to add book");
        }

        return await response.json();

    } catch (error) {
        console.error("Add Book Error:", error);
    }
}


// ================================
// UPDATE BOOK
// ================================

export async function updateBook(id, updatedBook) {
    try {
        const response = await fetch(`${BOOKS_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBook)
        });

        if (!response.ok) {
            throw new Error("Failed to update book");
        }

        return await response.json();

    } catch (error) {
        console.error("Update Book Error:", error);
    }
}


// ================================
// DELETE BOOK
// ================================

export async function deleteBook(id) {
    try {
        const response = await fetch(`${BOOKS_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete book");
        }

        return true;

    } catch (error) {
        console.error("Delete Book Error:", error);
        return false;
    }
}


// ================================
// SEARCH GOOGLE BOOKS API
// ================================

export async function searchGoogleBooks(query) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error("Google Books API Error");
        }

        const data = await response.json();

        return data.items || [];

    } catch (error) {
        console.error("Google Books Error:", error);
        return [];
    }
}