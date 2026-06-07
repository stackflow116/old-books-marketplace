const booksApi = {
  async getAll() {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.books}`);
    if (!response.ok) throw new Error('Failed to fetch books from archival database.');
    return await response.json();
  },
  async getById(id) {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.books}/${id}`);
    if (!response.ok) throw new Error(`Book listing with ID ${id} not found.`);
    return await response.json();
  },
  async create(bookData) {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.books}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData)
    });
    if (!response.ok) throw new Error('Failed to record new book listing in the archive.');
    return await response.json();
  },
  async update(id, bookData) {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.books}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData)
    });
    if (!response.ok) throw new Error('Failed to update archival record.');
    return await response.json();
  },
  async delete(id) {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.books}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to remove book listing from the archive.');
    return true;
  },
  async lookupGoogleBooks(query) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Google Books database is currently unreachable.');
    const data = await response.json();
    return data.items || [];
  }
};