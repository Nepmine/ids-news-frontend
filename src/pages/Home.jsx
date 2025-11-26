import { useState, useEffect } from 'react';
import { TrendingUp, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PostEditor } from '../components/posts/PostEditor';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { GoogleSignIn } from '../components/auth/GoogleSignIn';
import { PostCard } from '../components/posts/PostCard';

// Design System Constants
const TRANSITIONS = {
  fast: 'transition-all duration-200 ease-out',
  normal: 'transition-all duration-300 ease-out',
  slow: 'transition-all duration-500 ease-out',
  verySlow: 'transition-all duration-700 ease-out',
};

const HOVER_EFFECTS = {
  scale: 'hover:scale-105 active:scale-95',
  lift: 'hover:-translate-y-1 hover:shadow-xl',
};

export const Home = () => {
  const { user, isAuthor } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
    if (user) {
      loadLikedPosts();
    }
  }, [user, currentPage]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      // Use the same getCategory API with 'home' category
      const data = await api.getCategory('home', currentPage);
      console.log("Post data is ::: ", data);
      setPosts(data);
      
      // Check if we got fewer posts than the limit (15)
      // If yes, we've reached the end
      setHasMorePosts(data.length >= 15);
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

  const handleLike = async (postId, e) => {
    if (e) e.stopPropagation();

    if (!user) {
      setShowSignInModal(true);
      return;
    }

    // Update UI immediately (optimistic update)
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.postId === postId
          ? {
              ...post,
              likes: likedPosts.includes(postId)
                ? Math.max(0, (post.likes || 0) - 1)
                : (post.likes || 0) + 1,
            }
          : post
      )
    );

    // API call (no delay in UI)
    try {
      await api.likePost(postId);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
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
        await api.updatePost({
          postId: editingPost.postId,
          ...formData
        });
        alert('Post updated successfully!');
      } else {
        await api.createPost(formData, 'post');
        alert('Post created successfully!');
      }
      
      setShowEditor(false);
      setEditingPost(null);
      setCurrentPage(1); // Reset to first page
      loadPosts();
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
      loadPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post: ' + error.message);
    }
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (hasMorePosts) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-red-200 rounded-full animate-ping"></div>
            <div className="relative w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading stories...</p>
        </div>
      </div>
    );
  }

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="space-y-4 flex-1">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${TRANSITIONS.slow} hover:scale-105 inline-block cursor-default`}>
                Latest News from Nepal
              </h1>
              <p className="text-xl text-red-100 max-w-2xl">
                Stay informed with the most trusted news source
              </p>
              <div className="flex items-center gap-4 pt-4">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Live Updates
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                  Verified Sources
                </span>
              </div>
            </div>
            {isAuthor && (
              <button
                onClick={handleCreatePost}
                className={`
                  bg-white text-red-600 px-6 py-3 md:px-8 md:py-4 rounded-lg 
                  hover:bg-red-50 ${TRANSITIONS.normal} ${HOVER_EFFECTS.scale}
                  flex items-center font-semibold shadow-2xl
                  hover:shadow-red-500/20
                `}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Post
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Story Section */}
        {featuredPost && (
          <div className="mb-16">
            <div className={`flex items-center gap-3 mb-6 group ${TRANSITIONS.normal}`}>
              <div className={`w-1 h-8 bg-red-600 ${TRANSITIONS.normal} group-hover:h-12`}></div>
              <TrendingUp className={`w-7 h-7 text-red-600 ${TRANSITIONS.normal} group-hover:rotate-12 group-hover:scale-110`} />
              <h2 className="text-3xl font-bold text-gray-900">Featured Story</h2>
            </div>
            
            <PostCard
              post={featuredPost}
              isLiked={likedPosts.includes(featuredPost.postId)}
              onLike={handleLike}
              onClick={() => navigate(`/post/${featuredPost.postId}`)}
              variant="featured"
              isAuthor={isAuthor}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
            />
          </div>
        )}

        {/* Latest Stories Grid */}
        {regularPosts.length > 0 && (
          <div>
            <div className={`flex items-center gap-3 mb-8 group ${TRANSITIONS.normal}`}>
              <div className={`w-1 h-8 bg-red-600 ${TRANSITIONS.normal} group-hover:h-12`}></div>
              <h2 className="text-3xl font-bold text-gray-900">Latest Stories</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <PostCard
                  key={post.postId}
                  post={post}
                  isLiked={likedPosts.includes(post.postId)}
                  onLike={handleLike}
                  onClick={() => navigate(`/post/${post.postId}`)}
                  index={index}
                  variant="regular"
                  isAuthor={isAuthor}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {posts.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                ${currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 shadow-md hover:shadow-lg'
                }
                ${TRANSITIONS.normal}
              `}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              <span className="px-4 py-3 bg-red-600 text-white rounded-lg font-bold shadow-md">
                Page {currentPage}
              </span>
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={!hasMorePosts}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                ${!hasMorePosts
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 shadow-md hover:shadow-lg'
                }
                ${TRANSITIONS.normal}
              `}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Stories Yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share a story with our community</p>
            {isAuthor && (
              <button
                onClick={handleCreatePost}
                className={`
                  bg-red-600 text-white px-8 py-3 rounded-lg 
                  hover:bg-red-700 ${TRANSITIONS.normal} ${HOVER_EFFECTS.scale}
                  font-semibold inline-flex items-center shadow-lg
                `}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Post
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showEditor && (
        <PostEditor
          post={editingPost}
          onClose={handleCloseEditor}
          onSave={handleSavePost}
        />
      )}

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
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};