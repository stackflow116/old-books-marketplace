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
old-books-marketplace/
│
├── index.html
├── admin.html
├── README.md
├── db.json
│
├── pages/
│   ├── buy-books.html
│   ├── sell-books.html
│   ├── book-details.html
│   └── about-contact.html
│
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── data/
│
├── components/
│   ├── navbar.html
│   ├── footer.html
│   └── book-card.html
│
└── docs/
    ├── screenshots/
    └── wireframes/
```

---

# Folder Description

| Folder | Purpose |
|---------|---------|
| pages | Website pages |
| assets/css | Stylesheets |
| assets/js | JavaScript logic |
| assets/images | Images and icons |
| assets/data | Static JSON data |
| components | Reusable HTML components |
| docs | Documentation assets |
| db.json | Mock API database |

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/stackflow116/old-books-marketplace.git
```

---

## 2. Move into Project Directory

```bash
cd old-books-marketplace
```

---

## 3. Install JSON Server

```bash
npm install -g json-server
```

Verify installation:

```bash
json-server --version
```

---

## 4. Start Local API

Run:

```bash
json-server --watch db.json --port 3000
```

Server:

```plaintext
http://localhost:3000
```

---

## 5. Run Frontend

Open:

```plaintext
index.html
```

or use:

```bash
Live Server (VS Code)
```

---

# API Endpoints

## Books

```http
GET /books
```

Retrieve all books.

```http
GET /books/:id
```

Retrieve single book.

```http
POST /books
```

Add a new book.

```http
PUT /books/:id
```

Update a book.

```http
DELETE /books/:id
```

Delete a book.

---

# Sample JSON Structure

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
  ]
}
```

---

# Screenshots

Store screenshots inside:

```plaintext
docs/screenshots/
```

Example:

```md
![Homepage](docs/screenshots/homepage.png)
```

---

# Wireframes

Store design wireframes inside:

```plaintext
docs/wireframes/
```

---

# Future Enhancements

- User authentication
- Favorites system
- Search and filtering
- Pagination
- Payment integration
- Book recommendations
- Deployment

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

GitHub:
https://github.com/stackflow116/old-books-marketplace
