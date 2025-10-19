import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MessageCircle } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { PostCard } from '../components/posts/PostCard';

export const LikedPosts = () => {
  const { user } = useAuth();
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      loadLikedPosts();
    }
  }, [user]);

  const loadLikedPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getMyLikedPosts();
      setLikedPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      await api.likePost(postId);
      setLikedPosts(likedPosts.filter((p) => p.postId !== postId));
    } catch (err) {
      alert('Failed to unlike post: ' + err.message);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sign In Required
          </h2>
          <p className="text-gray-600">
            Please sign in to view your liked posts.
          </p>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner text="Loading liked posts..." />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <p className="text-red-700">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Heart className="w-8 h-8 text-red-600 fill-current" />
          <h1 className="text-3xl font-bold text-gray-900">Liked Posts</h1>
        </div>
        <p className="text-gray-600">
          Posts you've liked ({likedPosts.length})
        </p>
      </div>

      {likedPosts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">
            You haven't liked any posts yet.
          </p>
          <p className="text-gray-500">
            Start exploring and like posts to see them here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {likedPosts.map((post) => (
            <PostCard
              key={post.postId}
              post={post}
              onLike={() => handleUnlike(post.postId)}
              isLiked={true}
              onClick={() => {/* Navigate to post detail */}}
            />
          ))}
        </div>
      )}
    </div>
  );
};