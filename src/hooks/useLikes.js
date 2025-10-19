import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useLikes = () => {
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    loadLikedPosts();
  }, []);

  const loadLikedPosts = async () => {
    try {
      const data = await api.getMyLikedPosts();
      if (Array.isArray(data)) {
        setLikedPosts(data.map((p) => p.postId));
      }
    } catch (error) {
      console.error('Failed to load liked posts:', error);
    }
  };

  const toggleLike = async (postId) => {
    try {
      await api.likePost(postId);
      setLikedPosts((prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId)
          : [...prev, postId]
      );
    } catch (error) {
      console.error('Failed to toggle like:', error);
      throw error;
    }
  };

  const isLiked = (postId) => likedPosts.includes(postId);

  return { likedPosts, toggleLike, isLiked, refetch: loadLikedPosts };
};