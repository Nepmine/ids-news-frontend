import { useState, useEffect } from 'react';
import { Heart, Trash2, Edit2, MoreVertical, X, Check } from 'lucide-react';

export const CommentList = ({ 
  comments, 
  currentUserId, 
  onDelete, 
  onEdit, 
  onLike,
  onShowSignInModal 
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [showMenuId, setShowMenuId] = useState(null);
  const [likedComments, setLikedComments] = useState({});

  // Initialize liked state from backend data
  useEffect(() => {
    if (!currentUserId) return;
    
    const initialLikedState = {};
    comments.forEach(comment => {
      if (comment.likedUserIds && comment.likedUserIds.includes(currentUserId)) {
        initialLikedState[comment.commentId] = true;
      }
    });
    setLikedComments(initialLikedState);
  }, [comments, currentUserId]);

  const handleEditStart = (comment) => {
    setEditingId(comment.commentId);
    setEditText(comment.comment);
    setShowMenuId(null);
  };

  const handleEditSave = async (commentId) => {
    if (!editText.trim()) return;
    await onEdit(commentId, editText.trim());
    setEditingId(null);
    setEditText('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleLike = async (commentId) => {
    // Check if user is logged in
    if (!currentUserId) {
      onShowSignInModal();
      return;
    }

    const wasLiked = likedComments[commentId] || false;

    // Optimistic UI update
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !wasLiked
    }));

    // Call API
    try {
      await onLike(commentId);
    } catch (error) {
      // Revert on error
      setLikedComments((prev) => ({
        ...prev,
        [commentId]: wasLiked
      }));
      console.error('Failed to like comment:', error);
    }
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const isOwner = currentUserId === comment.user?.userId;
        const isEditing = editingId === comment.commentId;
        const isLiked = likedComments[comment.commentId] || false;
        const displayLikes = (comment.likes || 0);

        return (
          <div
            key={comment.commentId}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={comment.user?.photoUrl || 'https://via.placeholder.com/40'}
                  alt={comment.user?.name || 'User'}
                  className="w-9 h-9 rounded-full ring-2 ring-gray-100 object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {comment.user?.name || comment.user?.givenName || 'Anonymous'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {isOwner && !isEditing && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenuId(showMenuId === comment.commentId ? null : comment.commentId)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>

                  {showMenuId === comment.commentId && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowMenuId(null)}
                      />
                      <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-32 z-20">
                        <button
                          onClick={() => handleEditStart(comment)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setShowMenuId(null);
                            onDelete(comment.commentId);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 text-sm resize-none"
                  rows="3"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditSave(comment.commentId)}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {comment.comment}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.commentId)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isLiked
                        ? 'bg-red-50 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                    }`}
                    title={currentUserId ? (isLiked ? 'Unlike' : 'Like') : 'Sign in to like'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{displayLikes}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};