import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Landmark, Briefcase, TrendingUp, Clock, Eye, Heart, ArrowLeft, Plus } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PostEditor } from '../components/posts/PostEditor';

export const CategoryPage = () => {
  const params = useParams();
  const location = window.location.pathname;
  // Extract category from URL path (e.g., /sports -> sports)
  const category = params.category || location.split('/')[1];
  
  const navigate = useNavigate();
  const { user, isAuthor } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showEditor, setShowEditor] = useState(false);

  // Category configurations
  const categoryConfig = {
    sports: {
      icon: Trophy,
      title: 'Sports',
      description: 'Latest sports news, scores, and highlights from around the world',
      gradient: 'from-red-500 via-red-600 to-red-700',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      badge: 'bg-red-600'
    },
    politics: {
      icon: Landmark,
      title: 'Politics',
      description: 'Political news, analysis, and coverage of current affairs',
      gradient: 'from-red-500 via-red-600 to-red-700',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      badge: 'bg-red-600'
    },
    business: {
      icon: Briefcase,
      title: 'Business',
      description: 'Business news, market updates, and economic insights',
      gradient: 'from-red-500 via-red-600 to-red-700',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      badge: 'bg-red-600'
    },
    trending: {
      icon: TrendingUp,
      title: 'Trending',
      description: 'What\'s hot right now - trending stories and viral news',
      gradient: 'from-red-500 via-red-600 to-red-700',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      badge: 'bg-red-600'
    }
  };

  const config = categoryConfig[category?.toLowerCase()] || {
    icon: TrendingUp,
    title: category?.charAt(0).toUpperCase() + category?.slice(1) || 'News',
    description: `Latest ${category || 'news'} and updates`,
    gradient: 'from-red-500 via-red-600 to-red-700',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    badge: 'bg-red-600'
  };

  const Icon = config.icon;

  useEffect(() => {
    loadCategoryPosts();
    if (user) {
      loadLikedPosts();
    }
  }, [category, user]);

  const loadCategoryPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCategory(category);
      setPosts(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load category posts:', err);
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
      // Silently fail if user hasn't liked any posts yet
      console.log('No liked posts found');
    }
  };

  const handleLike = async (postId, e) => {
    e.stopPropagation();
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
      
      loadCategoryPosts();
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleSavePost = async (formData) => {
    try {
      // Ensure the category is included
      if (!formData.category.includes(category)) {
        formData.category.push(category);
      }
      await api.createPost(formData, 'post');
      alert('Post created successfully!');
      setShowEditor(false);
      loadCategoryPosts();
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {config.title} stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Posts</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Redesigned Hero Section - Clean & Minimal */}
      <div className="bg-white border-b-4 border-red-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded-lg transition"
                title="Back to Home"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className={`${config.iconBg} p-3 rounded-xl`}>
                <Icon className={`w-8 h-8 ${config.iconColor}`} />
              </div>
              
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {config.title}
                </h1>
                <p className="text-gray-600">
                  {config.description}
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">
                  {posts.length}
                </div>
                <div className="text-sm text-gray-500">
                  {posts.length === 1 ? 'Story' : 'Stories'}
                </div>
              </div>
              
              {isAuthor && (
                <button
                  onClick={() => setShowEditor(true)}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center font-semibold shadow-md"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Post
                </button>
              )}
            </div>
          </div>
          
          {/* Mobile Create Button */}
          {isAuthor && (
            <div className="md:hidden mt-4">
              <button
                onClick={() => setShowEditor(true)}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Post
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            {/* Featured Post (First) */}
            {posts[0] && (
              <div className="mb-12">
                <div
                  onClick={() => navigate(`/post/${posts[0].postId}`)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="md:flex">
                    <div className="md:w-2/3 h-96 relative overflow-hidden">
                      <img
                        src={posts[0].frontImageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
                        alt={posts[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`${config.badge} px-3 py-1 rounded-full text-sm font-semibold text-white shadow-lg`}>
                          Featured
                        </span>
                      </div>
                    </div>
                    
                    <div className="md:w-1/3 p-8 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition">
                        {posts[0].title}
                      </h3>
                      <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                        {posts[0].headline}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <button 
                          onClick={(e) => handleLike(posts[0].postId, e)}
                          className={`flex items-center ${likedPosts.includes(posts[0].postId) ? 'text-red-600' : 'text-gray-600'} hover:text-red-600 transition`}
                        >
                          <Heart 
                            className={`w-6 h-6 mr-2 ${likedPosts.includes(posts[0].postId) ? 'fill-current' : ''}`}
                          />
                          <span className="font-semibold">{posts[0].likes || 0}</span>
                        </button>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(posts[0].createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Posts Grid */}
            {posts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post) => (
                  <div
                    key={post.postId}
                    onClick={() => navigate(`/post/${post.postId}`)}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group flex flex-col"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={post.frontImageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className={`absolute top-4 right-4 ${config.badge} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
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
                          onClick={(e) => handleLike(post.postId, e)}
                          className={`flex items-center ${likedPosts.includes(post.postId) ? 'text-red-600' : 'text-gray-500'} hover:text-red-600 transition`}
                        >
                          <Heart 
                            className={`w-5 h-5 mr-1 ${likedPosts.includes(post.postId) ? 'fill-current' : ''}`}
                          />
                          <span className="font-semibold">{post.likes || 0}</span>
                        </button>
                        <span className="text-sm text-gray-500">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <Icon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No {config.title} Stories Yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share a {config.title.toLowerCase()} story</p>
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

      {showEditor && (
        <PostEditor
          onClose={() => setShowEditor(false)}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
};