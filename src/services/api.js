const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class APIService {
  setToken(token) {
    localStorage.setItem('token', token);
  }
  
  getToken() {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  async request(endpoint, options = {}) {
      const token = this.getToken();
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers,
        });
        
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || `API Error: ${response.statusText}`);
        }
        
        return response.json();
  }

  // ✅ ADD THIS - Login endpoint to register/verify user
  async login() {
    return this.request('/user/userLogin');
  }

  // User endpoints
  async getUserDetails() {
    return this.request('/user/userDetails');
  }

  async isAuthor() {
    return this.request('/user/isAuthor');
  }

  async getMyLikedPosts() {
    return this.request('/user/myLikedPosts');
  }

  async getMyBlogs() {
    return this.request('/user/myBlogs');
  }

  // Post endpoints
  async getHomePosts() {
    return this.request('/post/getHomePosts');
  }

  async getPost(postId) {
    return this.request(`/post/getPost/${postId}`);
  }

  async createPost(data) {
    return this.request('/post/createPost', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePost(data) {
    return this.request('/post/updatePost', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deletePost(postId) {
    return this.request('/post/deletePost', {
      method: 'POST',
      body: JSON.stringify({ postId }),
    });
  }

  async likePost(postId) {
    return this.request('/post/likePost', {
      method: 'POST',
      body: JSON.stringify({ postId }),
    });
  }

  // Comment endpoints
  async addComment(postId, comment) {
    return this.request('/post/comment', {
      method: 'POST',
      body: JSON.stringify({ postId, comment }),
    });
  }

  async editComment(commentId, comment) {
    return this.request('/post/editComment', {
      method: 'POST',
      body: JSON.stringify({ commentId, comment }),
    });
  }

  async deleteComment(commentId) {
    return this.request('/post/deleteComment', {
      method: 'POST',
      body: JSON.stringify({ commentId }),
    });
  }
}

export const api = new APIService();