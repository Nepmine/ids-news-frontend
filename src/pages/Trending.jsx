import React, { useState, useEffect } from "react";
import { TrendingUp, Plus, Minus, X, Check, Flame } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { PostDetail } from "../components/posts/PostDetail";
import banner from "../assets/channels4_banner.jpg";


export const Trending = () => {
  const { user, isAuthor } = useAuth();
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadTrendingPosts();
    if (isAuthor) {
      loadAllPosts();
    }
  }, [isAuthor]);

  const loadTrendingPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getTrendingPosts();
      setTrendingPosts(data);
    } catch (error) {
      console.error("Failed to load trending posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllPosts = async () => {
    try {
      const data = await api.getHomePosts();
      console.log(
        "-------------------------- data ---------------------------",
        data
      );
      setAllPosts(data);
    } catch (error) {
      console.error("Failed to load all posts:", error);
    }
  };

  const handleAddTrending = async (postId) => {
    setActionLoading(postId);
    try {
      await api.addToTrending(postId);
      await loadTrendingPosts();
      await loadAllPosts();
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to add to trending:", error);
      alert("Failed to add to trending: " + error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemoveTrending = async (postId) => {
    if (!confirm("Remove this post from trending?")) return;

    setActionLoading(postId);
    try {
      await api.removeFromTrending(postId);
      await loadTrendingPosts();
      await loadAllPosts();
    } catch (error) {
      console.error("Failed to remove from trending:", error);
      alert("Failed to remove from trending: " + error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get posts that are not already trending
  const availablePosts = allPosts.filter((post) => !post.trending);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trending posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
<div
  className="relative bg-red-600"
  style={{
    backgroundImage: `url(${banner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height:200,
  }}
>
  <div className="py-10 pl-9">
    <div className="flex flex-col items-start text-left">
      <div className="flex items-center mb-2">
        <Flame className="w-6 h-6 mr-2 text-[#ff0000]" /> {/* slightly smaller icon */}
        <h1 className="text-2xl md:text-3xl font-semibold text-[#ff0000] leading-tight">
          Trending Stories
        </h1>
      </div>
      <p className="text-base text-[#ff4d4d] mb-2">
        {isAuthor
          ? "Manage and view trending posts"
          : "Most popular stories right now"}
      </p>
      {isAuthor && (
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition flex items-center font-medium shadow-md mt-2"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add to Trending
        </button>
      )}
    </div>
  </div>
</div>







      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Trending Posts */}
        {trendingPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingPosts.map((post) => (
              <div
                key={post.postId}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group relative"
              >
                {/* Trending Badge */}
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center">
                  <Flame className="w-4 h-4 mr-1" />
                  Trending
                </div>

                {/* Remove Button for Authors */}
                {isAuthor && (
                  <button
                    onClick={() => handleRemoveTrending(post.postId)}
                    disabled={actionLoading === post.postId}
                    className="absolute top-4 right-4 z-10 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                    title="Remove from trending"
                  >
                    {actionLoading === post.postId ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <Minus className="w-5 h-5" />
                    )}
                  </button>
                )}

                {/* Post Image */}
                <div
                  onClick={() => setSelectedPostId(post.postId)}
                  className="h-56 overflow-hidden relative cursor-pointer"
                >
                  <img
                    src={
                      post.frontImageUrl ||
                      "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Post Content */}
                <div
                  onClick={() => setSelectedPostId(post.postId)}
                  className="p-6 cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.headline}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
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
                      <span className="font-semibold">{post.likes || 0}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Flame className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Trending Posts Yet
            </h3>
            <p className="text-gray-600 mb-6">
              {isAuthor
                ? "Add your first trending post to get started"
                : "Check back soon for trending stories"}
            </p>
            {isAuthor && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add to Trending
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add to Trending Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Add to Trending</h2>
                <p className="text-red-100 text-sm mt-1">
                  Select a post to feature as trending
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="hover:bg-red-700 p-2 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              {availablePosts.length > 0 ? (
                <div className="space-y-4">
                  {availablePosts.map((post) => (
                    <div
                      key={post.postId}
                      className="flex items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition"
                    >
                      {/* Post Image */}
                      <img
                        src={
                          post.frontImageUrl ||
                          "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                        }
                        alt={post.title}
                        className="w-24 h-24 object-cover rounded-lg mr-4 flex-shrink-0"
                      />

                      {/* Post Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {post.headline}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-4">
                            ❤️ {post.likes || 0} likes
                          </span>
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => handleAddTrending(post.postId)}
                        disabled={actionLoading === post.postId}
                        className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      >
                        {actionLoading === post.postId ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <Plus className="w-5 h-5 mr-1" />
                            Add
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Check className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    All your posts are already trending or you have no posts
                    yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPostId && (
        <PostDetail
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
          user={user}
        />
      )}
    </div>
  );
};
