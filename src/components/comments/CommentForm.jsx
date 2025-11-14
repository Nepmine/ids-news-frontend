import { useState } from 'react';
import { Send } from 'lucide-react';

export const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(comment.trim());
      setComment('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-start gap-3 bg-white rounded-lg border border-gray-200 p-3 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 transition-all">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="flex-1 resize-none border-0 focus:outline-none text-gray-700 placeholder-gray-400 min-h-[44px] max-h-[120px] text-sm py-2"
          rows="1"
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
          }}
        />
        <button
          type="submit"
          disabled={!comment.trim() || isSubmitting}
          className="flex-shrink-0 bg-red-600 text-white p-2.5 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2 ml-1">
        {comment.length} / 1000 characters
      </p>
    </form>
  );
};