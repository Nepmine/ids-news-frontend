import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus } from 'lucide-react';
import { PostGrid } from '../components/posts/PostGrid';
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
      await api.createPost(formData);
      alert('Post created successfully!');
      setShowEditor(false);
      loadPosts();
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post: ' + error.message);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-red-600">IDS Story Nepal</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted source for news and stories from Nepal
          </p>
        </div>

        {/* Author Actions */}
        {isAuthor && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => setShowEditor(true)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Post</span>
            </button>
          </div>
        )}

        {/* Posts Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <TrendingUp className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">Latest Stories</h2>
          </div>

          <PostGrid
            posts={posts}
            loading={loading}
            error={error}
            onPostClick={setSelectedPostId}
            onLike={handleLike}
            likedPosts={likedPosts}
          />
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
    </div>
  );
};