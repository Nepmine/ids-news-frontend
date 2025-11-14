import { PostCard } from './PostCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { BookOpen } from 'lucide-react';

export const PostGrid = ({
  posts,
  loading,
  error,
  onPostClick,
  onLike,
  likedPosts = [],
}) => {
  if (loading) {
    return <LoadingSpinner text="Loading posts..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8">
        <p className="text-red-700">Error: {error}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No posts available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard
          key={post.postId}
          post={post}
          onLike={onLike}
          isLiked={likedPosts.includes(post.postId)}
          onClick={() => onPostClick(post.postId)}
        />
      ))}
    </div>
  );
};