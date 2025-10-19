import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const CommentForm = ({ onSubmit, placeholder = 'Write a comment...' }) => {
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit(comment);
      setComment('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
        rows="3"
        disabled={submitting}
      />
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-500">
          Press Ctrl+Enter to submit
        </p>
        <button
          onClick={handleSubmit}
          disabled={!comment.trim() || submitting}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? 'Posting...' : 'Post Comment'}</span>
        </button>
      </div>
    </div>
  );
};