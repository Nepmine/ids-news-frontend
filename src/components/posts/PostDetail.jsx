import React, { useState, useEffect } from 'react';
import { X, Heart, Calendar, Share2 } from 'lucide-react';
import { api } from '../../services/api';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { CommentList } from '../comments/CommentList';
import { CommentForm } from '../comments/CommentForm';

export const PostDetail = ({ postId, onClose, user }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    try {
      const data = await api.getPost(postId);
      setPost(data);
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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto z-50">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
            <h2 className="text-2xl font-bold text-gray-900">Post Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
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
                'https://via.placeholder.com/800x400?text=IDS+Story+Nepal'
              }
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />

            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={
                  post.author?.generalDetails?.photoUrl ||
                  'https://via.placeholder.com/40'
                }
                alt="Author"
                className="w-12 h-12 rounded-full"
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

            {/* Title & Headline */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{post.headline}</p>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Stats */}
            <div className="flex items-center space-x-6 py-4 border-t border-b">
              <div className="flex items-center space-x-2 text-gray-600">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">{post.likes || 0} Likes</span>
              </div>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Comments ({post.comments?.length || 0})
              </h3>

              {user ? (
                <div className="mb-6">
                  <CommentForm onSubmit={handleComment} />
                </div>
              ) : (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600">Please sign in to comment</p>
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