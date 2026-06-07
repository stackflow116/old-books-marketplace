const authApi = {
  getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      return JSON.parse(userStr);
    }
    // Fallback default logged in user if none is set
    const defaultUser = {
      id: "1",
      username: "collector1",
      email: "collector@chronicle.com",
      name: "Jane Doe",
      role: "User"
    };
    localStorage.setItem('currentUser', JSON.stringify(defaultUser));
    return defaultUser;
  },
  setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem('currentUser');
  },
  async login(username) {
    const res = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.users}?username=${username}`);
    if (!res.ok) throw new Error('Authentication endpoint is currently offline.');
    const users = await res.json();
    if (users.length > 0) {
      this.setCurrentUser(users[0]);
      return users[0];
    }
    throw new Error('User not registered in the archive logs.');
  }
};
