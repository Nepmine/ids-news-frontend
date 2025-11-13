import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus, Clock, Eye ,X,Newspaper} from 'lucide-react';
import { PostDetail } from '../components/posts/PostDetail';
import { PostEditor } from '../components/posts/PostEditor';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleSignIn } from '../components/auth/GoogleSignIn';


import { api } from '../services/api';

export const WeeklyArticle = () => {
  const { user, isAuthor } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedArticles, setLikedArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
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

const handleLike = async (postId) => {
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
          ? (article.likes || 0) - 1 
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

  // Fire-and-forget API call (no response handling)
  api.likePost(postId).catch(err => console.error('Like API failed:', err));
};


  const handleSaveArticle = async (formData) => {
    try {
      await api.createPost(formData, 'article');
      alert('Article created successfully!');
      setShowEditor(false);
      loadArticles();
    } catch (error) {
      console.error('Failed to create article:', error);
      alert('Failed to create article: ' + error.message);
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
                onClick={() => setShowEditor(true)}
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
            
            <div
              onClick={() => navigate(`/post/${featuredArticle.postId}`)}
              className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 group relative"
            >
              <div className="md:flex md:h-[500px]">
                {/* Image Section */}
                <div className="md:w-3/5 h-80 md:h-full relative overflow-hidden">
                  <img
                    src={
                      featuredArticle.frontImageUrl ||
                      "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                    }
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/5 md:to-white/90"></div>

                  {/* Featured Badge - Mobile */}
                  <div className="absolute top-6 left-6 md:hidden">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                      Featured Article
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-2/5 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                  {/* Featured Badge - Desktop */}
                  <div className="hidden md:flex items-center mb-6">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                      Featured Article
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-red-600 transition-colors duration-300">
                    {featuredArticle.title}
                  </h3>

                  {/* Headline */}
                  <p className="text-gray-600 text-base md:text-lg mb-6 line-clamp-3 leading-relaxed">
                    {featuredArticle.headline}
                  </p>

                  {/* Divider */}
                  <div className="w-16 h-1 bg-red-600 mb-6 group-hover:w-24 transition-all duration-300"></div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{formatDate(featuredArticle.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>Featured Read</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(featuredArticle.postId);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        likedArticles.includes(featuredArticle.postId)
                          ? "bg-red-50 text-red-600"
                          : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          likedArticles.includes(featuredArticle.postId)
                            ? "fill-red-600 scale-110"
                            : "group-hover:scale-110"
                        }`}
                        fill={
                          likedArticles.includes(featuredArticle.postId)
                            ? "currentColor"
                            : "none"
                        }
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span className="font-semibold">
                        {featuredArticle.likes || 0}
                      </span>
                    </button>

                    <button className="flex-1 bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                      <span>Read Full Article</span>
                      <svg
                        className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-5 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
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
              {regularArticles.map((article) => (
                <div
                  key={article.postId}
              onClick={() => navigate(`/post/${featuredArticle.postId}`)}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={article.frontImageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {formatDate(article.createdAt)}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
                      {article.headline}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(article.postId);
                        }}
                        className={`flex items-center ${likedArticles.includes(article.postId) ? 'text-red-600' : 'text-gray-500'} hover:text-red-600 transition`}
                      >
                        <svg 
                          className={`w-5 h-5 mr-1 ${likedArticles.includes(article.postId) ? 'fill-current' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="font-semibold">{article.likes || 0}</span>
                      </button>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.comments?.length || 0} comments
                      </span>
                    </div>
                  </div>
                </div>
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
                onClick={() => setShowEditor(true)}
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
                <Newspaper className="w-8 h-8 text-white" />
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

      {/* Modals */}
      {selectedArticleId && (
        <PostDetail
          postId={selectedArticleId}
          onClose={() => setSelectedArticleId(null)}
          user={user}
        />
      )}

      {showEditor && (
        <PostEditor
          onClose={() => setShowEditor(false)}
          onSave={handleSaveArticle}
          contentType="article"
        />
      )}
    </div>
  );
};