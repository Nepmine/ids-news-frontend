import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { PostCard } from '../components/posts/PostCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { debounce } from '../utils/helpers';

export const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    loadAllPosts();
  }, []);

  const loadAllPosts = async () => {
    try {
      const data = await api.getHomePosts();
      setAllPosts(data);
    } catch (err) {
      console.error('Failed to load posts:', err);
    }
  };

  const performSearch = debounce((query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const filtered = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.headline.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setLoading(false);
  }, 300);

  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Posts</h1>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or headline..."
            className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner text="Searching..." />
      ) : searchQuery && results.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            No results found for "{searchQuery}"
          </p>
        </div>
      ) : results.length > 0 ? (
        <div>
          <p className="text-gray-600 mb-6">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((post) => (
              <PostCard
                key={post.postId}
                post={post}
                onLike={() => {}}
                isLiked={false}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            Start typing to search posts
          </p>
        </div>
      )}
    </div>
  );
};