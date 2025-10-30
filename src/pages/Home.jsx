import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus, Clock, Eye } from 'lucide-react';
import { PostDetail } from '../components/posts/PostDetail';
import { PostEditor } from '../components/posts/PostEditor';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const Home = () => {
  const { user, isAuthor } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    loadPosts();
    if (user) {
      loadLikedPosts();
    }
  }, [user]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getHomePosts();
      console.log("Post data is ::: ", data)
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadLikedPosts = async () => {
    try {
      const data = await api.getMyLikedPosts();
      if (Array.isArray(data)) {
        setLikedPosts(data.map(p => p.postId));
      }
    } catch (error) {
      console.error('Failed to load liked posts:', error);
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      alert('Please sign in to like posts');
      return;
    }

    try {
      await api.likePost(postId);
      
      setLikedPosts(prev =>
        prev.includes(postId)
          ? prev.filter(id => id !== postId)
          : [...prev, postId]
      );
      
      loadPosts();
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleSavePost = async (formData) => {
    try {
      await api.createPost(formData, 'post');
      alert('Post created successfully!');
      setShowEditor(false);
      loadPosts();
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post: ' + error.message);
      throw error;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stories...</p>
        </div>
      </div>
    );
  }

  // Featured post (first post)
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Latest News from Nepal
              </h1>
              <p className="text-xl text-red-100">
                Stay informed with the most trusted news source
              </p>
            </div>
            {isAuthor && (
              <button
                onClick={() => setShowEditor(true)}
                className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition flex items-center font-semibold shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Post
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Story */}
        {featuredPost && (
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-red-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Story</h2>
            </div>
            
            <div 
              onClick={() => setSelectedPostId(featuredPost.postId)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="md:flex">
                <div className="md:w-2/3 h-96 relative overflow-hidden">
                  <img
                    src={featuredPost.frontImageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center mb-3">
                      <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                      <span className="ml-3 flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(featuredPost.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3 p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                    {featuredPost.headline}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(featuredPost.postId);
                      }}
                      className="flex items-center text-gray-600 hover:text-red-600 transition"
                    >
                      <svg 
                        className={`w-6 h-6 mr-2 ${likedPosts.includes(featuredPost.postId) ? 'fill-red-600 text-red-600' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="font-semibold">{featuredPost.likes || 0}</span>
                    </button>
                    <button className="text-red-600 font-semibold hover:text-red-700 transition">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Latest Stories Grid */}
        {regularPosts.length > 0 && (
          <div>
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Stories</h2>
              <div className="flex-1 h-px bg-gray-300 ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <div
                  key={post.postId}
                  onClick={() => setSelectedPostId(post.postId)}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={post.frontImageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
                      {post.headline}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post.postId);
                        }}
                        className={`flex items-center ${likedPosts.includes(post.postId) ? 'text-red-600' : 'text-gray-500'} hover:text-red-600 transition`}
                      >
                        <svg 
                          className={`w-5 h-5 mr-1 ${likedPosts.includes(post.postId) ? 'fill-current' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="font-semibold">{post.likes || 0}</span>
                      </button>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.comments?.length || 0} comments
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Stories Yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share a story with our community</p>
            {isAuthor && (
              <button
                onClick={() => setShowEditor(true)}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Post
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedPostId && (
        <PostDetail
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
          user={user}
        />
      )}

      {showEditor && (
        <PostEditor
          onClose={() => setShowEditor(false)}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
};