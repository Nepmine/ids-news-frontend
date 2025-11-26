import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Landmark, Briefcase, TrendingUp, ArrowLeft, Plus } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PostEditor } from '../components/posts/PostEditor';
import { PostCard } from '../components/posts/PostCard';


export const CategoryPage = () => {
  const params = useParams();
  const location = window.location.pathname;
  const category = params.category || location.split('/')[1];
  
  const navigate = useNavigate();
  const { user, isAuthor } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Category configurations
  const categoryConfig = {
    sports: {
      icon: Trophy,
      title: 'Sports',
      description: 'Latest sports news, scores, and highlights from around the world',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    politics: {
      icon: Landmark,
      title: 'Politics',
      description: 'Political news, analysis, and coverage of current affairs',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    business: {
      icon: Briefcase,
      title: 'Business',
      description: 'Business news, market updates, and economic insights',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    trending: {
      icon: TrendingUp,
      title: 'Trending',
      description: 'What\'s hot right now - trending stories and viral news',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    }
  };

  const config = categoryConfig[category?.toLowerCase()] || {
    icon: TrendingUp,
    title: category?.charAt(0).toUpperCase() + category?.slice(1) || 'News',
    description: `Latest ${category || 'news'} and updates`,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
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

  useEffect(() => {
    if (user) {
      setShowSignInModal(false);
    }
  }, [user]);
  
  const handleSignInSuccess = () => {
    setShowSignInModal(false);
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleSavePost = async (formData) => {
    try {
      if (editingPost) {
        // Update existing post
        await api.updatePost({
          postId: editingPost.postId,
          ...formData
        });
        alert('Post updated successfully!');
      } else {
        // Create new post
        if (!formData.category.includes(category)) {
          formData.category.push(category);
        }
        await api.createPost(formData, 'post');
        alert('Post created successfully!');
      }
      
      setShowEditor(false);
      setEditingPost(null);
      loadCategoryPosts();
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save post: ' + error.message);
      throw error;
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await api.deletePost(postId);
      alert('Post deleted successfully!');
      loadCategoryPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post: ' + error.message);
    }
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingPost(null);
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
      {/* Hero Section */}
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
                  onClick={handleCreatePost}
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
                onClick={handleCreatePost}
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
                <PostCard
                  post={posts[0]}
                  isLiked={likedPosts.includes(posts[0].postId)}
                  onLike={handleLike}
                  onClick={() => navigate(`/post/${posts[0].postId}`)}
                  variant="featured"
                  index={0}
                  isAuthor={isAuthor}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                />
              </div>
            )}

            {/* Regular Posts Grid */}
            {posts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post, index) => (
                  <PostCard
                    key={post.postId}
                    post={post}
                    isLiked={likedPosts.includes(post.postId)}
                    onLike={handleLike}
                    onClick={() => navigate(`/post/${post.postId}`)}
                    variant="regular"
                    index={index + 1}
                    isAuthor={isAuthor}
                    onEdit={handleEditPost}
                    onDelete={handleDeletePost}
                  />
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
                onClick={handleCreatePost}
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
          post={editingPost}
          onClose={handleCloseEditor}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
};