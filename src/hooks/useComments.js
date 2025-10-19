import { useState } from 'react';
import { api } from '../services/api';

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const addComment = async (commentText) => {
    try {
      await api.addComment(postId, commentText);
    } catch (error) {
      throw error;
    }
  };

  const editComment = async (commentId, newText) => {
    try {
      await api.editComment(commentId, newText);
      setComments(
        comments.map((c) =>
          c.commentId === commentId ? { ...c, comment: newText, updatedAt: new Date() } : c
        )
      );
    } catch (error) {
      throw error;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await api.deleteComment(commentId);
      setComments(comments.filter((c) => c.commentId !== commentId));
    } catch (error) {
      throw error;
    }
  };

  return { comments, loading, addComment, editComment, deleteComment };
};