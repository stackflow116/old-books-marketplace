# 📚 Old Books Marketplace

A responsive web application for buying and selling old books.  
This project provides a marketplace interface where users can browse books, view details, sell used books, and manage listings through an admin dashboard.

The project is built using **HTML5, CSS3, Bootstrap 5, Vanilla JavaScript**, and **JSON Server** as a local mock REST API.

---

# Project Overview

Old Books Marketplace is designed to simulate an online second-hand bookstore system.

Users can:
- Browse available books
- View detailed information
- Sell old books
- Explore categories
- Navigate through a responsive UI

Administrators can:
- Perform CRUD operations
- Monitor marketplace data
- Manage book listings

---

# Features

## User Features
- Responsive homepage
- Buy old books
- Sell books through listing form
- Book details page
- Category organization
- Search-ready frontend structure
- Reusable UI components

## Admin Features
- Dashboard interface
- Create new records
- Update existing listings
- Delete records
- View marketplace statistics

---

# Technologies Used

## Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript (Vanilla JavaScript)

## Backend
- JSON Server (Local REST API)

## Data Format
- JSON

## Development Tools
- VS Code
- Git
- GitHub

---

# Project Structure

```plaintext
OLD_BOOK_MARKETPLACE/
│
├── index.html
├── admin.html
│
├── Api/
│   ├── AuthApi.js
│   ├── booksApi.js
│   ├── config.js
│   └── usersApi.js
│
├── assets/
│   ├── CSS
│   ├── JS
│
└── data/
    ├── db.json
    └── package.json
```

---

# Folder Description

| Folder / File      | Purpose                                      |
|--------------------|----------------------------------------------|
| `index.html`       | Main homepage of the marketplace             |
| `admin.html`       | Admin dashboard interface                    |
| `Api/`             | All JavaScript API communication files       |
| `Api/AuthApi.js`   | Handles user authentication API calls        |
| `Api/booksApi.js`  | Handles books CRUD API calls                 |
| `Api/config.js`    | API base URL and configuration settings      |
| `Api/usersApi.js`  | Handles user-related API calls               |
| `assets/`          | CSS stylesheets, images, and static files    |
| `data/`            | Local database and server configuration      |
| `data/db.json`     | Mock database for JSON Server                |
| `data/package.json`| Node.js dependencies and scripts             |

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/stackflow116/old-books-marketplace.git
```

---

## 2. Move into Project Directory

```bash
cd OLD_BOOK_MARKETPLACE
```

---

## 3. Move into Data Folder

Since `package.json` and `db.json` are inside the `data/` folder, navigate there to install dependencies:

```bash
cd data
```

---

## 4. Install Dependencies

```bash
npm install
```

---

## 5. Install JSON Server (if not already installed globally)

```bash
npm install -g json-server
```

Verify installation:

```bash
json-server --version
```

---

## 6. Start Local API Server

Run from inside the `data/` folder:

```bash
json-server --watch db.json --port 3000
```

Server will be available at:

```plaintext
http://localhost:3000
```

---

## 7. Run Frontend

Go back to the root folder:

```bash
cd ..
```

Then open:

```plaintext
index.html
```

Or use VS Code Live Server extension for a better development experience:

```bash
Live Server (VS Code Extension)
```

---

# API Module Overview

The `Api/` folder contains all JavaScript files that communicate with the JSON Server backend.

## `config.js`
Stores the base API URL so all other files use one central configuration.

```javascript
// Example
const BASE_URL = "http://localhost:3000";
```

---

## `booksApi.js`
Handles all book-related API operations.

```javascript
// Get all books
GET /books

// Get single book
GET /books/:id

// Add a new book
POST /books

// Update a book
PUT /books/:id

// Delete a book
DELETE /books/:id
```

---

## `AuthApi.js`
Handles user login and registration API calls.

```javascript
// Register user
POST /users

// Login check
GET /users?email=...&password=...
```

---

## `usersApi.js`
Handles user profile management API calls.

```javascript
// Get all users
GET /users

// Get single user
GET /users/:id

// Update user
PUT /users/:id
```

---

# API Endpoints Reference

## Books Endpoints

```http
GET /books
```
Retrieve all books.

```http
GET /books/:id
```
Retrieve a single book by ID.

```http
POST /books
```
Add a new book listing.

```http
PUT /books/:id
```
Update an existing book.

```http
DELETE /books/:id
```
Delete a book listing.

---

## Users Endpoints

```http
GET /users
```
Retrieve all users.

```http
POST /users
```
Register a new user.

```http
PUT /users/:id
```
Update user information.

---

# Sample JSON Structure

## db.json

```json
{
  "books": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "price": 1500,
      "condition": "Used",
      "image": "book.jpg"
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "Ehaab Ahmad",
      "email": "ehaab@example.com",
      "password": "123456"
    }
  ]
}
```

---

# Future Enhancements

- User authentication with JWT tokens
- Add inventory system in library pages
- Favorites / Wishlist system
- Search and filtering by category, price, condition
- Pagination for large book listings
- Payment integration
- Book recommendations engine
- Full deployment to hosting platform

---

# Git Workflow

Initial commit:

```bash
git init
git add .
git commit -m "Initial project setup"
```

Push updates:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

---

# License

This project is developed for educational and semester project purposes.

---

# Author

**Ehaab Ahmad**  
Frontend Web Developer  
GitHub: [https://github.com/stackflow116/old-books-marketplace](https://github.com/stackflow116/old-books-marketplace)
