import { useState } from 'react';
import { Heart, Eye, Clock, Edit3, Trash2, MoreVertical } from 'lucide-react';

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

export const PostCard = ({ 
  post, 
  isLiked, 
  onLike, 
  onClick, 
  index = 0,
  variant = 'regular',
  isAuthor = false,
  onEdit,
  onDelete
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    onEdit(post);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
    await onDelete(post.postId);
  };

  const handleDeleteCancel = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  if (variant === 'featured') {
    return (
      <div 
        onClick={onClick}
        className={`
          bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer 
          ${TRANSITIONS.normal} ${HOVER_EFFECTS.lift}
          hover:shadow-2xl hover:shadow-red-500/10
          group relative
        `}
      >
        {/* Author Menu for Featured */}
        {isAuthor && (
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className={`
                bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-lg 
                hover:bg-white shadow-lg ${TRANSITIONS.fast}
              `}
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 animate-scale-in">
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Post
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Post
                </button>
              </div>
            )}
          </div>
        )}

        <div className="md:flex md:h-[500px]">
          {/* Featured Image */}
          <div className="md:w-3/5 h-80 md:h-full relative overflow-hidden">
            <img
              src={post.frontImageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
              alt={post.title}
              className={`w-full h-full object-cover ${TRANSITIONS.verySlow} group-hover:scale-110 group-hover:rotate-1`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent ${TRANSITIONS.normal}`}></div>
            
            {/* Floating Featured Badge */}
            <div className="absolute top-6 left-6">
              <span className={`
                bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold 
                shadow-2xl flex items-center gap-2 ${TRANSITIONS.normal} group-hover:scale-110
              `}>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Featured
              </span>
            </div>
            
            {/* Date Badge */}
            <div className="absolute bottom-6 left-6">
              <span className={`bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${TRANSITIONS.normal}`}>
                <Clock className="w-4 h-4" />
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
          
          {/* Featured Content */}
          <div className="md:w-2/5 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
            <h3 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight ${TRANSITIONS.normal} group-hover:text-red-600`}>
              {post.title}
            </h3>
            
            <p className="text-gray-600 text-lg mb-6 leading-relaxed line-clamp-4">
              {post.headline}
            </p>
            
            {/* Animated Divider */}
            <div className={`w-16 h-1 bg-red-600 mb-6 ${TRANSITIONS.normal} group-hover:w-24`}></div>
            
            {/* Metadata */}
            <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Featured Read</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => onLike(post.postId, e)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-semibold
                  ${TRANSITIONS.normal} ${HOVER_EFFECTS.scale}
                  ${isLiked
                    ? 'bg-red-50 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }
                `}
              >
                <Heart
                  className={`w-5 h-5 ${TRANSITIONS.normal} ${
                    isLiked ? 'fill-current scale-110' : ''
                  }`}
                />
                <span>{post.likes || 0}</span>
              </button>
              
              <button className={`
                flex-1 bg-red-600 text-white font-semibold py-2 px-6 rounded-lg 
                hover:bg-red-700 ${TRANSITIONS.normal}
                flex items-center justify-center gap-2 group/btn
                shadow-lg hover:shadow-xl
              `}>
                <span>Read Full Story</span>
                <svg
                  className={`w-5 h-5 ${TRANSITIONS.normal} group-hover/btn:translate-x-1`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Corner Element */}
        <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-red-600 opacity-5 rounded-full ${TRANSITIONS.verySlow} group-hover:scale-150`}></div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleDeleteCancel}
          >
            <div 
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Post?</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete "{post.title}"? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteCancel}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Regular card variant
  return (
    <>
      <div
        onClick={onClick}
        className={`
          bg-white rounded-xl shadow-md overflow-hidden cursor-pointer 
          ${TRANSITIONS.normal} ${HOVER_EFFECTS.lift}
          hover:shadow-xl group flex flex-col relative
        `}
        style={{ 
          animation: 'fadeInUp 0.5s ease-out forwards',
          animationDelay: `${index * 100}ms`,
          opacity: 0
        }}
      >
        {/* Author Menu */}
        {isAuthor && (
          <div className="absolute top-4 left-4 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className={`
                bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-lg 
                hover:bg-white shadow-lg ${TRANSITIONS.fast}
              `}
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 animate-scale-in">
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Post
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Post
                </button>
              </div>
            )}
          </div>
        )}

        {/* Card Image */}
        <div className="h-56 overflow-hidden relative">
          <img
            src={post.frontImageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
            alt={post.title}
            className={`w-full h-full object-cover ${TRANSITIONS.verySlow} group-hover:scale-110`}
          />
          <div className="absolute top-4 right-4">
            <span className={`
              bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold 
              shadow-lg ${TRANSITIONS.normal} group-hover:scale-110
            `}>
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className={`text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 ${TRANSITIONS.normal} line-clamp-2`}>
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
            {post.headline}
          </p>
          
          {/* Card Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button 
              onClick={(e) => onLike(post.postId, e)}
              className={`
                flex items-center gap-2 font-semibold
                ${TRANSITIONS.fast} ${HOVER_EFFECTS.scale}
                ${isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}
              `}
            >
              <Heart 
                className={`w-5 h-5 ${TRANSITIONS.fast} ${isLiked ? 'fill-current' : ''}`}
              />
              <span>{post.likes || 0}</span>
            </button>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.comments?.length || 0} comments
            </span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleDeleteCancel}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Post?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{post.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteCancel}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.15s ease-out;
        }
      `}</style>
    </>
  );
};