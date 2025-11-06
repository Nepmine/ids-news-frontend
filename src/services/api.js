const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class APIService {
  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  clearToken() {
    localStorage.removeItem("token");
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const hasBody = options.body && Object.keys(options.body).length > 0;
    const headers = {
      ...(hasBody && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      body: hasBody ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Login endpoint to register/verify user
  async login() {
    return this.request("/user/userLogin");
  }

  // User endpoints
  async getUserDetails() {
    return this.request("/user/userDetails");
  }

  async isAuthor() {
    return this.request("/user/isAuthor");
  }

  async getMyLikedPosts() {
    return this.request("/user/myLikedPosts");
  }

  async getMyBlogs() {
    return this.request("/user/myBlogs");
  }

  // Post endpoints
  async getHomePosts() {
    return this.request("/post/getHomePosts");
  }

  async getPost(postId) {
    return this.request(`/post/getPost/${postId}`);
  }

  async createPost(data, type) {
    const url = `/post/createPost/${type === 'article' ? 'article' : 'post'}`;
    return this.request(url, {
      method: "POST",
      body: data, // ✅ FIXED: Pass data directly, not JSON.stringify(data)
    });
  }

  async updatePost(data) {
    return this.request("/post/updatePost", {
      method: "POST",
      body: data, // ✅ FIXED: Pass data directly
    });
  }

  async deletePost(postId) {
    return this.request("/post/deletePost", {
      method: "POST",
      body: { postId }, // ✅ FIXED: Pass object directly
    });
  }

  async likePost(postId) {
    return this.request("/post/likePost", {
      method: "POST",
      body: { postId }, // ✅ FIXED: Pass object directly
    });
  }

  // Comment endpoints
  async addComment(postId, comment) {
    return this.request("/post/comment", {
      method: "POST",
      body: { postId, comment }, // ✅ FIXED: Pass object directly
    });
  }

  async editComment(commentId, comment) {
    return this.request("/post/editComment", {
      method: "POST",
      body: { commentId, comment }, // ✅ FIXED: Pass object directly
    });
  }

  async deleteComment(commentId) {
    return this.request("/post/deleteComment", {
      method: "POST",
      body: { commentId }, // ✅ FIXED: Pass object directly
    });
  }

  async getTrendingPosts() {
    return this.request("/post/trending");
  }

  async addToTrending(postId) {
    return this.request(`/post/trending/${postId}`, {
      method: "POST",
    });
  }

  async removeFromTrending(postId) {
    return this.request(`/post/trending/${postId}`, {
      method: "DELETE",
      body: {},
    });
  }

  async getArticles() {
    return this.request("/post/allArticles");
  }


    async getAllGalleries() {
    return this.request("/post/getAllGalleries");
  }


  async createGallery(images) {
    return this.request("/post/creategallery", {
      method: "POST",
      body: { images },
    });
  }

  async likeGallery(galleryId) {
    return this.request("/post/likeGallery", {
      method: "POST",
      body: { galleryId },
    });
  }

;
  }



export const api = new APIService();