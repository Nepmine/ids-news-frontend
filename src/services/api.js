const API_BASE_URL = 'http://localhost:8000/api';

class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

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

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // User endpoints
  async login() {
    return this.request('/user/userLogin');
  }

  async getUserDetails() {
    return this.request('/user/userDetails');
  }

  async makeAuthor(secret) {
    return this.request('/user/makeAuthor', {
      method: 'POST',
      body: JSON.stringify({ secret }),
    });
  }

  async getMyBlogs() {
    return this.request('/user/myBlogs');
  }

  async getMyLikedPosts() {
    return this.request('/user/myLikedPosts');
  }

  async isAuthor() {
    return this.request('/user/isAuthor');
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