const usersApi = {
  async getLibrary(userId) {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.library}?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to retrieve user library records.');
    return await response.json();
  },
  async addToLibrary(userId, bookId, notes = '') {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.library}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        bookId,
        acquiredDate: new Date().toISOString().split('T')[0],
        notes
      })
    });
    if (!response.ok) throw new Error('Failed to add book to library.');
    return await response.json();
  },
  async updateNotes(libraryId, notes) {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.library}/${libraryId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    });
    if (!response.ok) throw new Error('Failed to update archival library notes.');
    return await response.json();
  },
  async removeFromLibrary(libraryId) {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.library}/${libraryId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to remove book from library.');
    return true;
  }
};