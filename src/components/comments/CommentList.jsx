import React from 'react';
import { CommentItem } from './CommentItem';
import { MessageCircle } from 'lucide-react';

export const CommentList = ({ comments = [], currentUserId, onDelete, onEdit }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          comment={comment}
          isOwner={currentUserId === comment.userId}
          onDelete={() => onDelete(comment.commentId)}
          onEdit={(newText) => onEdit(comment.commentId, newText)}
        />
      ))}
    </div>
  );
};
