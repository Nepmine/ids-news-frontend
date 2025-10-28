import React, { useState, useEffect } from 'react';
import { X, Heart, Calendar, Share2, User, Clock, MessageCircle } from 'lucide-react';
import { api } from '../../services/api';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { CommentList } from '../comments/CommentList';
import { CommentForm } from '../comments/CommentForm';

export const PostDetail = ({ postId, onClose, user }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    try {
      const data = await api.getPost(postId);
      setPost(data);
      // Check if current user liked this post
      if (user && data.likedUser) {
        setIsLiked(data.likedUser.includes(user.userId));
      }
    } catch (error) {
      console.error('Failed to load post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (commentText) => {
    try {
      await api.addComment(postId, commentText);
      loadPost();
    } catch (error) {
      console.error('Failed to comment:', error);
      throw error;
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Delete this comment?')) return;

    try {
      await api.deleteComment(commentId);
      loadPost();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const handleEditComment = async (commentId, newText) => {
    try {
      await api.editComment(commentId, newText);
      loadPost();
    } catch (error) {
      console.error('Failed to edit comment:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert('Please sign in to like this post');
      return;
    }

    try {
      await api.likePost(postId);
      setIsLiked(!isLiked);
      loadPost();
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.headline,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto z-50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <h2 className="text-xl font-bold text-gray-900">Article</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Cover Image */}
            <img
              src={
                post.frontImageUrl ||
                'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800'
              }
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl mb-6 shadow-lg"
            />

            {/* Meta Info */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div className="flex items-center">
                <img
                  src={
                    post.author?.generalDetails?.photoUrl ||
                    'https://via.placeholder.com/40'
                  }
                  alt="Author"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {post.author?.generalDetails?.name || 'IDS Team'}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={handleLike}
                  className={`flex items-center px-4 py-2 rounded-lg transition mr-3 ${
                    isLiked
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-semibold">{post.likes || 0}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Title & Headline */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.headline}
            </p>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Comments Section */}
            <div className="border-t pt-8">
              <div className="flex items-center mb-6">
                <MessageCircle className="w-6 h-6 text-red-600 mr-2" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Comments ({post.comments?.length || 0})
                </h3>
              </div>

              {user ? (
                <div className="mb-8">
                  <CommentForm onSubmit={handleComment} />
                </div>
              ) : (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl text-center border-2 border-dashed border-gray-200">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Please sign in to comment</p>
                </div>
              )}

              <CommentList
                comments={post.comments || []}
                currentUserId={user?.userId}
                onDelete={handleDeleteComment}
                onEdit={handleEditComment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};