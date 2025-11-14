import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus, Clock, Eye, X, Newspaper } from 'lucide-react';
import { PostEditor } from '../components/posts/PostEditor';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleSignIn } from '../components/auth/GoogleSignIn';
import { api } from '../services/api';
import toast from 'react-hot-toast';
import { PostCard } from '../components/posts/PostCard';

export const WeeklyArticle = () => {
  const { user, isAuthor } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedArticles, setLikedArticles] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
    if (user) {
      loadLikedArticles();
    }
  }, [user]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await api.getArticles();
      console.log("Article data is ::: ", data);
      setArticles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadLikedArticles = async () => {
    try {
      const data = await api.getMyLikedPosts();
      if (Array.isArray(data)) {
        setLikedArticles(data.map(p => p.postId));
      }
    } catch (error) {
      console.error('Failed to load liked articles:', error);
    }
  };

  const handleLike = async (postId, e) => {
    if (e) e.stopPropagation();
    
    if (!user) {
      setShowSignInModal(true);
      return;
    }

    // Instantly update UI
    setArticles(prevArticles =>
      prevArticles.map(article => {
        if (article.postId === postId) {
          const isLiked = likedArticles.includes(postId);
          const updatedLikes = isLiked 
            ? Math.max(0, (article.likes || 0) - 1)
            : (article.likes || 0) + 1;
          return { ...article, likes: updatedLikes };
        }
        return article;
      })
    );

    // Toggle liked state instantly
    setLikedArticles(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );

    // Fire-and-forget API call
    api.likePost(postId).catch(err => console.error('Like API failed:', err));
  };

  const handleCreateArticle = () => {
    setEditingArticle(null);
    setShowEditor(true);
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setShowEditor(true);
  };

  const handleSaveArticle = async (formData) => {
    try {
      if (editingArticle) {
        // Update existing article
        await api.updatePost({
          postId: editingArticle.postId,
          ...formData
        });
        alert('Article updated successfully!');
      } else {
        // Create new article
        await api.createPost(formData, 'article');
        toast.success('Article created successfully!');
      }
      
      setShowEditor(false);
      setEditingArticle(null);
      loadArticles();
    } catch (error) {
      console.error('Failed to create article:', error);
      toast.error('Failed to create article: ' );
      throw error;
    }
  };

  const handleDeleteArticle = async (postId) => {
    try {
      await api.deletePost(postId);
      alert('Article deleted successfully!');
      loadArticles();
    } catch (error) {
      console.error('Failed to delete article:', error);
      alert('Failed to delete article: ' + error.message);
    }
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingArticle(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  // Featured article (first article)
  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Weekly Articles
              </h1>
              <p className="text-xl text-red-100">
                In-depth analysis and featured stories from Nepal
              </p>
            </div>
            {isAuthor && (
              <button
                onClick={handleCreateArticle}
                className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition flex items-center font-semibold shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Article
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-red-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
            </div>
            
            <PostCard
              post={featuredArticle}
              isLiked={likedArticles.includes(featuredArticle.postId)}
              onLike={handleLike}
              onClick={() => navigate(`/post/${featuredArticle.postId}`)}
              variant="featured"
              isAuthor={isAuthor}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
            />
          </div>
        )}

        {/* Latest Articles Grid */}
        {regularArticles.length > 0 && (
          <div>
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
              <div className="flex-1 h-px bg-gray-300 ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article, index) => (
                <PostCard
                  key={article.postId}
                  post={article}
                  isLiked={likedArticles.includes(article.postId)}
                  onLike={handleLike}
                  onClick={() => navigate(`/post/${article.postId}`)}
                  variant="regular"
                  index={index}
                  isAuthor={isAuthor}
                  onEdit={handleEditArticle}
                  onDelete={handleDeleteArticle}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Yet</h3>
            <p className="text-gray-600 mb-6">Be the first to write an in-depth article</p>
            {isAuthor && (
              <button
                onClick={handleCreateArticle}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Article
              </button>
            )}
          </div>
        )}
      </div>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/30 backdrop-blur-sm transition-all duration-300 animate-fadeIn"
          onClick={() => setShowSignInModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative transform transition-all duration-300 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:rotate-90 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full mb-4 shadow-lg">
                <img src="resources/download.png" alt="" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to IDS News Nepal
              </h2>
              <p className="text-gray-600">Sign in to access all features</p>
            </div>

            <GoogleSignIn onSuccess={() => setShowSignInModal(false)} />
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {showEditor && (
        <PostEditor
          post={editingArticle}
          onClose={handleCloseEditor}
          onSave={handleSaveArticle}
          contentType="article"
        />
      )}
    </div>
  );
};