import React, { useState } from 'react';
import {
  MessageCircle,
  User,
  Send,
  Heart,
  MoreVertical,
  Edit2,
  Trash2,
  X,
  Check,
} from 'lucide-react';

export const CommentsSection = ({
  post,
  user,
  onComment,
  onDeleteComment,
  onEditComment,
  onLikeComment,
  onShowSignInModal,
}) => {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [showMenuFor, setShowMenuFor] = useState(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await onComment(commentText);
      setCommentText('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditText(comment.comment);
    setShowMenuFor(null);
  };

  const handleSaveEdit = async (commentId) => {
    if (!editText.trim()) return;
    try {
      await onEditComment(commentId, editText);
      setEditingCommentId(null);
      setEditText('');
    } catch (error) {
      console.error('Failed to edit comment:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText('');
  };

  const handleDeleteClick = async (commentId) => {
    setShowMenuFor(null);
    await onDeleteComment(commentId);
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: new Date(date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <div className="mt-8 bg-gray-50 rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
          </div>
          <span>Comments</span>
          <span className="bg-red-600 text-white text-sm font-semibold px-2.5 py-0.5 md:px-3 md:py-1 rounded-full">
            {post.comments?.length || 0}
          </span>
        </h3>
      </div>

      {/* Add Comment Form */}
      {user ? (
        <div className="mb-6">
          <form onSubmit={handleSubmitComment} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all focus-within:border-red-300 focus-within:ring-2 focus-within:ring-red-100">
            <div className="flex gap-3 p-4">
              <img
                src={user.photoUrl || 'https://via.placeholder.com/40'}
                alt={user.name}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full resize-none border-0 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400 text-sm md:text-base"
                  rows="3"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500 hidden sm:block">
                Be respectful and constructive
              </p>
              <button
                type="submit"
                disabled={!commentText.trim() || isSubmitting}
                className="ml-auto flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6 md:p-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full mb-4">
            <User className="w-7 h-7 md:w-8 md:h-8 text-gray-400" />
          </div>
          <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
            Join the Discussion
          </h4>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Sign in to share your thoughts and engage with the community
          </p>
          <button
            onClick={onShowSignInModal}
            className="bg-red-600 text-white px-5 py-2.5 md:px-6 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm md:text-base"
          >
            Sign In to Comment
          </button>
        </div>
      )}

      {/* Comments List */}
      {post.comments && post.comments.length > 0 ? (
        <div className="space-y-4">
          {post.comments.map((comment) => (
            <div
              key={comment.commentId}
              className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 transition-all hover:border-gray-300"
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <img
                  src={comment.user?.generalDetails?.photoUrl || 'https://via.placeholder.com/40'}
                  alt={comment.user?.generalDetails?.name || 'User'}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                        {comment.user?.generalDetails?.name || 'Anonymous'}
                      </h5>
                      <p className="text-xs md:text-sm text-gray-500">
                        {formatTimeAgo(comment.createdAt)}
                        {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                          <span className="ml-1">(edited)</span>
                        )}
                      </p>
                    </div>

                    {/* Actions Menu */}
                    {user && user.userId === comment.userId && (
                      <div className="relative">
                        <button
                          onClick={() => setShowMenuFor(showMenuFor === comment.commentId ? null : comment.commentId)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>

                        {showMenuFor === comment.commentId && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setShowMenuFor(null)}
                            />
                            <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 py-1 w-36 z-20">
                              <button
                                onClick={() => handleStartEdit(comment)}
                                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"
                              >
                                <Edit2 className="w-4 h-4" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteClick(comment.commentId)}
                                className="w-full px-3 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-sm text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Comment Content */}
                  {editingCommentId === comment.commentId ? (
                    <div className="space-y-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                        rows="3"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveEdit(comment.commentId)}
                          className="flex items-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <Check className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-1.5 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                      {comment.comment}
                    </p>
                  )}

                  {/* Like Button */}
                  {editingCommentId !== comment.commentId && (
                    <div className="mt-3 flex items-center gap-4">
                      <button
                        onClick={() => onLikeComment(comment.commentId)}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                          comment.likedUserIds?.includes(user?.userId)
                            ? 'text-red-600'
                            : 'text-gray-500 hover:text-red-600'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            comment.likedUserIds?.includes(user?.userId) ? 'fill-current' : ''
                          }`}
                        />
                        <span>{comment.likes || 0}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No comments yet</p>
          <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};