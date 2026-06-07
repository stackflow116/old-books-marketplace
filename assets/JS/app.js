// State Management for The Bookedia
const STATE = {
  books: [],
  filters: {
    search: '',
    category: '',
    era: '',
    minPrice: 0,
    maxPrice: 200000
  },
  sortBy: 'recently_added',
  sortDirection: 'desc',
  pagination: {
    currentPage: 1,
    pageSize: 6
  },
  apiBase: 'http://localhost:3000/books',
  loading: false,
  error: null
};
// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  fetchBooks();
});
// Setup Dark/Light mode theme state
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-bs-theme', savedTheme);
  updateThemeUI(savedTheme);
}
function updateThemeUI(theme) {
  const toggles = document.querySelectorAll('.theme-toggle-btn');
  toggles.forEach(btn => {
    btn.innerHTML = theme === 'dark' 
      ? '<span class="material-symbols-outlined">light_mode</span>' 
      : '<span class="material-symbols-outlined">dark_mode</span>';
  });
}
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-bs-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  updateThemeUI(nextTheme);
}
// Event Listeners
function setupEventListeners() {
  // Theme Toggles
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
  // Search input debouncer
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      STATE.filters.search = e.target.value.trim();
      STATE.pagination.currentPage = 1;
      renderBookList();
    }, 300));
  }
  // Category and Era Filters
  const catSelect = document.getElementById('filter-category');
  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      STATE.filters.category = e.target.value;
      STATE.pagination.currentPage = 1;
      renderBookList();
    });
  }
  const eraSelect = document.getElementById('filter-era');
  if (eraSelect) {
    eraSelect.addEventListener('change', (e) => {
      STATE.filters.era = e.target.value;
      STATE.pagination.currentPage = 1;
      renderBookList();
    });
  }
  // Sort Controls
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      STATE.sortBy = e.target.value;
      renderBookList();
    });
  }
  const sortDirBtn = document.getElementById('sort-dir-btn');
  if (sortDirBtn) {
    sortDirBtn.addEventListener('click', () => {
      STATE.sortDirection = STATE.sortDirection === 'asc' ? 'desc' : 'asc';
      sortDirBtn.innerHTML = STATE.sortDirection === 'asc' 
        ? '<span class="material-symbols-outlined">arrow_upward</span>' 
        : '<span class="material-symbols-outlined">arrow_downward</span>';
      renderBookList();
    });
  }
  // Listing Quality / Google Books API Search
  const googleSearchBtn = document.getElementById('google-books-search-btn');
  if (googleSearchBtn) {
    googleSearchBtn.addEventListener('click', lookupGoogleBooks);
  }
  // Sell Book Form Submission
  const sellForm = document.getElementById('sell-book-form');
  if (sellForm) {
    sellForm.addEventListener('submit', handleNewListing);
  }
}
// Fetch Books from local JSON Server
async function fetchBooks() {
  setLoadingState(true);
  try {
    const res = await fetch(STATE.apiBase);
    if (!res.ok) throw new Error('API server returned error status.');
    STATE.books = await res.json();
    STATE.error = null;
    renderBookList();
    if (window.location.pathname.includes('admin.html')) {
      renderAdminDashboard();
    }
  } catch (err) {
    STATE.error = err.message;
    showErrorMessage();
  } finally {
    setLoadingState(false);
  }
}
// Debounce Utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
// Set UI status representations
function setLoadingState(loading) {
  STATE.loading = loading;
  const container = document.getElementById('books-container');
  if (container) {
    if (loading) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-2 text-muted-custom">Browsing the catalog archives...</p>
        </div>`;
    }
  }
}
function showErrorMessage() {
  const container = document.getElementById('books-container');
  if (container) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <span class="material-symbols-outlined text-danger fs-1">error</span>
        <h4 class="mt-3">Archival Connection Interrupted</h4>
        <p class="text-muted-custom">Please verify that json-server is running at port 3000.</p>
        <button class="btn btn-primary-custom mt-3" onclick="fetchBooks()">Retry Connection</button>
      </div>`;
  }
}
// Google Books API Lookup Integration
async function lookupGoogleBooks() {
  const queryInput = document.getElementById('isbn-lookup-input');
  if (!queryInput) return;
  const query = queryInput.value.trim();
  if (!query) return;
  const btn = document.getElementById('google-books-search-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span>';
  try {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      const info = data.items[0].volumeInfo;
      // Auto fill form fields
      document.getElementById('title').value = info.title || '';
      document.getElementById('author').value = info.authors ? info.authors.join(', ') : '';
      document.getElementById('description').value = info.description || '';
      
      // Auto estimate era from publication date
      if (info.publishedDate) {
        const year = parseInt(info.publishedDate.substring(0, 4));
        const eraSelect = document.getElementById('era-select');
        if (eraSelect) {
          if (year < 1600) eraSelect.value = '16th Century & Prior';
          else if (year < 1700) eraSelect.value = '17th Century';
          else if (year < 1800) eraSelect.value = '18th Century';
          else if (year < 1900) eraSelect.value = 'Victorian Era';
          else eraSelect.value = 'Modernist (1900-1950)';
        }
      }
      // Show thumbnail preview if exists
      if (info.imageLinks && info.imageLinks.thumbnail) {
        const previewImg = document.getElementById('book-cover-preview');
        if (previewImg) {
          previewImg.src = info.imageLinks.thumbnail;
          previewImg.dataset.customUrl = info.imageLinks.thumbnail;
        }
      }
      showFormFeedback('Bibliographic data filled successfully!', 'success');
    } else {
      showFormFeedback('No matching books found in Google library.', 'warning');
    }
  } catch (err) {
    showFormFeedback('Failed to reach Google Books service.', 'danger');
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Search API';
  }
}
function showFormFeedback(msg, type) {
  const feedbackEl = document.getElementById('lookup-feedback');
  if (feedbackEl) {
    feedbackEl.className = `alert alert-${type} mt-3 py-2`;
    feedbackEl.innerText = msg;
    feedbackEl.classList.remove('d-none');
    setTimeout(() => feedbackEl.classList.add('d-none'), 4000);
  }
}
// Inline Form Validation and POST Listing Submission
async function handleNewListing(e) {
  e.preventDefault();
  const form = e.target;
  let valid = true;
  // 5 Form validations & checks (Required, Format Check)
  const fields = ['title', 'author', 'description', 'price', 'seller'];
  fields.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const feedback = input.nextElementSibling;
    
    // Required check
    if (!input.value.trim()) {
      input.classList.add('is-invalid');
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.innerText = 'This archival detail is required.';
      }
      valid = false;
    } else if (fieldId === 'price' && parseFloat(input.value) <= 0) {
      // Numerical value format check
      input.classList.add('is-invalid');
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.innerText = 'Price must be a valid positive valuation.';
      }
      valid = false;
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    }
  });
  if (!valid) return;
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerText = 'Publishing Listing...';
  // Fallback default image or Google api thumbnail
  const previewImg = document.getElementById('book-cover-preview');
  const imageUrl = previewImg.dataset.customUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600';
  const newBook = {
    title: document.getElementById('title').value.trim(),
    author: document.getElementById('author').value.trim(),
    category: document.getElementById('category-select').value,
    era: document.getElementById('era-select').value,
    price: parseFloat(document.getElementById('price').value),
    condition: document.getElementById('condition').value,
    description: document.getElementById('description').value.trim(),
    seller: document.getElementById('seller').value.trim(),
    image: imageUrl,
    status: 'Published',
    dateAdded: new Date().toISOString().split('T')[0]
  };
  try {
    const res = await fetch(STATE.apiBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook)
    });
    if (!res.ok) throw new Error('Failed to post the catalog entry.');
    
    // Success flow - alert free styling
    const successAlert = document.getElementById('form-success-alert');
    if (successAlert) {
      successAlert.classList.remove('d-none');
      setTimeout(() => successAlert.classList.add('d-none'), 5000);
    }
    
    form.reset();
    document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
    previewImg.src = 'https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&q=80&w=600';
    delete previewImg.dataset.customUrl;
    
    // Refresh catalog asynchronously
    await fetchBooks();
  } catch (err) {
    showFormFeedback('Error posting entry. Database connection lost.', 'danger');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = 'List Book';
  }
}
// User-facing Catalog rendering with Filter, Sort, Pagination
function renderBookList() {
  const container = document.getElementById('books-container');
  if (!container) return; // Exit if rendering on admin dashboard
  // Filter books matching search, category, etc.
  let filtered = STATE.books.filter(book => {
    // Only display Published books to customers
    if (book.status !== 'Published') return false;
    const matchesSearch = book.title.toLowerCase().includes(STATE.filters.search.toLowerCase()) ||
                          book.author.toLowerCase().includes(STATE.filters.search.toLowerCase()) ||
                          book.description.toLowerCase().includes(STATE.filters.search.toLowerCase());
    
    const matchesCat = !STATE.filters.category || book.category === STATE.filters.category;
    const matchesEra = !STATE.filters.era || book.era === STATE.filters.era;
    return matchesSearch && matchesCat && matchesEra;
  });
  // Sort Books
  filtered.sort((a, b) => {
    let factor = STATE.sortDirection === 'asc' ? 1 : -1;
    if (STATE.sortBy === 'price') {
      return (a.price - b.price) * factor;
    } else if (STATE.sortBy === 'title') {
      return a.title.localeCompare(b.title) * factor;
    } else {
      return (new Date(a.dateAdded) - new Date(b.dateAdded)) * factor;
    }
  });
  // Render Empty state if no records match
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <span class="material-symbols-outlined fs-1 text-muted-custom">find_in_page</span>
        <h4 class="mt-3">No Rare Volumes Match Your Query</h4>
        <p class="text-muted-custom">Try adjusting your active filters or clear search query.</p>
      </div>`;
    renderPagination(0);
    return;
  }
  // Pagination bounds
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / STATE.pagination.pageSize);
  const startIdx = (STATE.pagination.currentPage - 1) * STATE.pagination.pageSize;
  const pagedBooks = filtered.slice(startIdx, startIdx + STATE.pagination.pageSize);
  container.innerHTML = '';
  pagedBooks.forEach(book => {
    container.appendChild(createBookCard(book));
  });
  renderPagination(totalPages);
}
function createBookCard(book) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4 mb-4 fade-in-element';
  col.innerHTML = `
    <div class="card h-100 custom-card">
      <div class="position-relative overflow-hidden" style="height: 250px;">
        <img src="${book.image}" class="card-img-top w-full h-100 object-cover" alt="${book.title}">
        <span class="position-absolute top-2 right-2 badge bg-dark">${book.era}</span>
      </div>
      <div class="card-body d-flex flex-col justify-between">
        <div>
          <span class="text-secondary small fw-bold">${book.category}</span>
          <h5 class="card-title mt-1 text-primary-color">${book.title}</h5>
          <p class="card-text text-muted-custom italic small">By ${book.author}</p>
          <p class="card-text text-muted-custom small text-truncate-3">${book.description}</p>
        </div>
        <div class="d-flex justify-between items-center mt-3 pt-3 border-top border-custom">
          <span class="fw-bold fs-5">$${book.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          <button class="btn btn-secondary-custom py-1.5 px-3" onclick="showBookDetail('${book.id}')">Inspect</button>
        </div>
      </div>
    </div>`;
  return col;
}
// Pagination Render
function renderPagination(totalPages) {
  const nav = document.getElementById('pagination-nav');
  if (!nav) return;
  if (totalPages <= 1) {
    nav.innerHTML = '';
    return;
  }
  let html = `
    <ul class="pagination justify-content-center">
      <li class="page-item ${STATE.pagination.currentPage === 1 ? 'disabled' : ''}">
        <button class="page-link" onclick="changePage(${STATE.pagination.currentPage - 1})">Prev</button>
      </li>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <li class="page-item ${STATE.pagination.currentPage === i ? 'active' : ''}">
        <button class="page-link" onclick="changePage(${i})">${i}</button>
      </li>`;
  }
  html += `
      <li class="page-item ${STATE.pagination.currentPage === totalPages ? 'disabled' : ''}">
        <button class="page-link" onclick="changePage(${STATE.pagination.currentPage + 1})">Next</button>
      </li>
    </ul>`;
  nav.innerHTML = html;
}
function changePage(page) {
  STATE.pagination.currentPage = page;
  renderBookList();
}
// Show Detailed overlay view
function showBookDetail(id) {
  const book = STATE.books.find(b => b.id === id);
  if (!book) return;
  document.getElementById('detail-cover').src = book.image;
  document.getElementById('detail-title').innerText = book.title;
  document.getElementById('detail-author').innerText = book.author;
  document.getElementById('detail-category').innerText = book.category;
  document.getElementById('detail-era').innerText = book.era;
  document.getElementById('detail-condition').innerText = book.condition;
  document.getElementById('detail-seller').innerText = book.seller;
  document.getElementById('detail-price').innerText = `$${book.price.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
  document.getElementById('detail-description').innerText = book.description;
  const detailModal = new bootstrap.Modal(document.getElementById('bookDetailModal'));
  detailModal.show();
}
// CSV and JSON Exports
function exportFilteredData(format) {
  // Filters out non-published if exporting user view, or exports everything in admin panel
  const isAdmin = window.location.pathname.includes('admin.html');
  const sourceList = STATE.books.filter(book => {
    if (isAdmin) return true;
    return book.status === 'Published';
  });
  if (format === 'json') {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sourceList, null, 2));
    triggerDownload(dataStr, "archive-export.json");
  } else if (format === 'csv') {
    const headers = ['id', 'title', 'author', 'category', 'price', 'condition', 'era', 'status'];
    const rows = sourceList.map(book => headers.map(h => `"${book[h] || ''}"`).join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    triggerDownload(encodeURI(csvContent), "archive-export.csv");
  }
}
function triggerDownload(content, filename) {
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", content);
  downloadAnchor.setAttribute("download", filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
/* ==========================================================================
   ADMIN PANEL LOGIC
   ========================================================================== */
function renderAdminDashboard() {
  renderAdminStats();
  renderAdminTable();
}
function renderAdminStats() {
  const totalBooks = STATE.books.length;
  const publishedCount = STATE.books.filter(b => b.status === 'Published').length;
  const totalValuation = STATE.books.reduce((acc, curr) => acc + curr.price, 0);
  const avgValuation = totalBooks > 0 ? (totalValuation / totalBooks) : 0;
  // Populate dynamic stats
  const statTotal = document.getElementById('stat-total-books');
  const statPub = document.getElementById('stat-published-books');
  const statVal = document.getElementById('stat-valuation');
  const statAvg = document.getElementById('stat-avg-valuation');
  if (statTotal) statTotal.innerText = totalBooks;
  if (statPub) statPub.innerText = publishedCount;
  if (statVal) statVal.innerText = `$${totalValuation.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
  if (statAvg) statAvg.innerText = `$${avgValuation.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
}
function renderAdminTable() {
  const tbody = document.getElementById('admin-books-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  STATE.books.forEach(book => {
    const tr = document.createElement('tr');
    tr.className = 'table-row-hover';
    tr.innerHTML = `
      <td>#BK-${book.id}</td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <img src="${book.image}" class="rounded" style="width: 30px; height: 40px; object-fit: cover;">
          <span class="fw-semibold">${book.title}</span>
        </div>
      </td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>
        <span class="badge ${book.status === 'Published' ? 'bg-success' : 'bg-warning'}">${book.status}</span>
      </td>
      <td class="fw-bold">$${book.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-1" onclick="openEditModal('${book.id}')">
          <span class="material-symbols-outlined fs-6 align-middle">edit</span>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="openDeleteConfirm('${book.id}')">
          <span class="material-symbols-outlined fs-6 align-middle">delete</span>
        </button>
      </td>`;
    tbody.appendChild(tr);
  });
}
// Edit Modal Handler
let activeEditingId = null;
function openEditModal(id) {
  const book = STATE.books.find(b => b.id === id);
  if (!book) return;
  activeEditingId = id;
  document.getElementById('edit-title').value = book.title;
  document.getElementById('edit-author').value = book.author;
  document.getElementById('edit-price').value = book.price;
  document.getElementById('edit-status').value = book.status;
  document.getElementById('edit-description').value = book.description;
  const modal = new bootstrap.Modal(document.getElementById('editBookModal'));
  modal.show();
}
async function saveBookChanges() {
  if (!activeEditingId) return;
  const updatedData = {
    title: document.getElementById('edit-title').value.trim(),
    author: document.getElementById('edit-author').value.trim(),
    price: parseFloat(document.getElementById('edit-price').value),
    status: document.getElementById('edit-status').value,
    description: document.getElementById('edit-description').value.trim()
  };
  try {
    const res = await fetch(`${STATE.apiBase}/${activeEditingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    if (!res.ok) throw new Error('Failed to update book.');
    bootstrap.Modal.getInstance(document.getElementById('editBookModal')).hide();
    await fetchBooks();
  } catch (err) {
    alert('Failed to update book details: ' + err.message);
  }
}
// Delete Confirmation Overlay Handler
let activeDeletingId = null;
function openDeleteConfirm(id) {
  const book = STATE.books.find(b => b.id === id);
  if (!book) return;
  activeDeletingId = id;
  document.getElementById('delete-book-title').innerText = book.title;
  const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
  modal.show();
}
async function executeDeletion() {
  if (!activeDeletingId) return;
  try {
    const res = await fetch(`${STATE.apiBase}/${activeDeletingId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete book.');
    bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal')).hide();
    await fetchBooks();
  } catch (err) {
    alert('Failed to delete book: ' + err.message);
  }
}
