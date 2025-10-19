import React from 'react';
import { Heart, MessageCircle, Calendar } from 'lucide-react';

export const PostCard = ({ post, onLike, isLiked, onClick }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.frontImageUrl || 'https://via.placeholder.com/600x400?text=IDS+Story+Nepal'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.headline}</p>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(post.postId);
            }}
            className={`flex items-center space-x-2 ${
              isLiked ? 'text-red-600' : 'text-gray-500'
            } hover:text-red-600 transition`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-semibold">{post.likes || 0}</span>
          </button>

          <div className="flex items-center space-x-2 text-gray-500">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">{post.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};