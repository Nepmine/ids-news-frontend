import React, { useState, useEffect } from "react";
import { TrendingUp, Plus, Clock, Eye } from "lucide-react";
import { PostDetail } from "../components/posts/PostDetail";
import { PostEditor } from "../components/posts/PostEditor";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export const WeeklyArticle = () => {
  const { user, isAuthor } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    loadPosts();
    if (user) {
      loadLikedPosts();
    }
  }, [user]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getHomePosts();
      console.log("Post data is ::: ", data);
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadLikedPosts = async () => {
    try {
      const data = await api.getMyLikedPosts();
      if (Array.isArray(data)) {
        setLikedPosts(data.map((p) => p.postId));
      }
    } catch (error) {
      console.error("Failed to load liked posts:", error);
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      alert("Please sign in to like posts");
      return;
    }

    try {
      await api.likePost(postId);

      setLikedPosts((prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId)
          : [...prev, postId]
      );

      loadPosts();
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleSavePost = async (formData) => {
    try {
      await api.createPost(formData);
      alert("Post created successfully!");
      setShowEditor(false);
      loadPosts();
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post: " + error.message);
      throw error;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stories...</p>
        </div>
      </div>
    );
  }

  // Featured post (first post)
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Your Weekly Article Dose
              </h1>
              <p className="text-xl text-red-100">
                Stay informed with the most trusted news source
              </p>
            </div>
            {isAuthor && (
              <button
                onClick={() => setShowEditor(true)}
                className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition flex items-center font-semibold shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add article
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Story */}
        {featuredPost && (
          <div className="mb-12">
            <div
              onClick={() => setSelectedPostId(featuredPost.postId)}
              className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 group relative"
            >
              <div className="md:flex md:h-[500px]">
                {/* Image Section */}
                <div className="md:w-3/5 h-80 md:h-full relative overflow-hidden">
                  <img
                    src={
                      "https://ichef.bbci.co.uk/news/480/cpsprodpb/ba50/live/2749f2c0-8d16-11f0-8737-efba0c8331e8.jpg.webp" ||
                      "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                    }
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/5 md:to-white/90"></div>

                  {/* Featured Badge - Mobile */}
                  <div className="absolute top-6 left-6 md:hidden">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                      Featured Story
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-2/5 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                  {/* Featured Badge - Desktop */}
                  <div className="hidden md:flex items-center mb-6">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                      Gen Z
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-red-600 transition-colors duration-300">
                    Protest took a dark turn
                  </h3>

                  {/* Headline */}
                  <p className="text-gray-600 text-base md:text-lg mb-6 line-clamp-3 leading-relaxed">
                    Peaceful Demonstration Turns Chaotic as Nepal’s Protest Takes a Dark Turn
                  </p>

                  {/* Divider */}
                  <div className="w-16 h-1 bg-red-600 mb-6 group-hover:w-24 transition-all duration-300"></div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{formatDate(featuredPost.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>Featured Read</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(featuredPost.postId);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        likedPosts.includes(featuredPost.postId)
                          ? "bg-red-50 text-red-600"
                          : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          likedPosts.includes(featuredPost.postId)
                            ? "fill-red-600 scale-110"
                            : "group-hover:scale-110"
                        }`}
                        fill={
                          likedPosts.includes(featuredPost.postId)
                            ? "currentColor"
                            : "none"
                        }
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span className="font-semibold">
                        {featuredPost.likes || 0}
                      </span>
                    </button>

                    <button className="flex-1 bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                      <span>Read Full Story</span>
                      <svg
                        className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-5 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <svg
              className="w-24 h-24 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Stories Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to share a story with our community
            </p>
            {isAuthor && (
              <button
                onClick={() => setShowEditor(true)}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Post
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedPostId && (
        <PostDetail
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
          user={user}
        />
      )}

      {showEditor && (
        <PostEditor
          onClose={() => setShowEditor(false)}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
};
