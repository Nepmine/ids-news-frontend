import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageCircle, Clock, User, TrendingUp, X } from "lucide-react";
import { api } from "../services/api";
import "./Postpage.css";

import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { CommentList } from "../components/comments/CommentList";
import { CommentForm } from "../components/comments/CommentForm";
import { GoogleSignIn } from "../components/auth/GoogleSignIn";
import { useAuth } from "../context/AuthContext";
import { PostDetail } from "../components/posts/PostDetail";

export const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otherLoading, setOtherLoading] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    loadPost();
    loadOtherPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const data = await api.getPost(postId);
      setPost(data);
      if (user && data?.likedUser) {
        setIsLiked(data.likedUser.includes(user.userId));
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Failed to load post:", error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  const loadOtherPosts = async () => {
    try {
      setOtherLoading(true);
      const data = await api.getHomePosts();
      if (Array.isArray(data)) {
        const filtered = data.filter(
          (p) => String(p.postId) !== String(postId)
        );
        setOtherPosts(filtered.slice(0, 6));
      } else {
        setOtherPosts([]);
      }
    } catch (error) {
      console.error("Failed to load other posts:", error);
      setOtherPosts([]);
    } finally {
      setOtherLoading(false);
    }
  };

  const isProcessingRef = useRef(false);
  const handleLike = () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 300);

    if (!user) {
      setShowSignInModal(true);
      return;
    }

    const newLikedState = !isLiked;

    // Optimistic UI update
    setIsLiked(newLikedState);
    setPost((prevPost) => ({
      ...prevPost,
      likes: prevPost.likes + (newLikedState ? 1 : -1),
    }));

    // Fire API silently
    api.likePost(postId).catch((err) => console.error("Like API failed:", err));
  };

  const handleComment = async (commentText) => {
    try {
      await api.addComment(postId, commentText);
      loadPost();
    } catch (error) {
      console.error("Failed to comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await api.deleteComment(commentId);
      loadPost();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleEditComment = async (commentId, newText) => {
    try {
      await api.editComment(commentId, newText);
      loadPost();
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!user) {
      setShowSignInModal(true);
      return;
    }

    try {
      await api.likeComment(commentId);
      // Reload post to get updated like counts and likedUserIds
      loadPost();
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner text="Loading post..." />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Post not found
          </h2>
          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Use PostDetail Component */}
            <PostDetail
              post={post}
              isLiked={isLiked}
              onLike={handleLike}
              onShowSignInModal={() => setShowSignInModal(true)}
              user={user}
            />

            {/* Comments Section */}
            <div className="px-8 pb-8">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-red-600" />
                    </div>
                    Comments
                    <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {post.comments?.length || 0}
                    </span>
                  </h3>
                </div>

                {/* Add Comment */}
                {user ? (
                  <div className="mb-6">
                    <CommentForm onSubmit={handleComment} />
                  </div>
                ) : (
                  <div className="mb-6 bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Join the Discussion
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Sign in to share your thoughts and engage with the
                      community
                    </p>
                    <button
                      onClick={() => setShowSignInModal(true)}
                      className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Sign In to Comment
                    </button>
                  </div>
                )}

                {/* Comment List */}
                {post.comments && post.comments.length > 0 ? (
                  <div className="space-y-4">
                    <CommentList
                      comments={post.comments}
                      currentUserId={user?.userId}
                      onDelete={handleDeleteComment}
                      onEdit={handleEditComment}
                      onLike={handleLikeComment}
                      onShowSignInModal={() => setShowSignInModal(true)} // ✅ ADD THIS LINE
                    />
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No comments yet</p>
                    <p className="text-gray-400 text-sm">
                      Be the first to share your thoughts!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar (Right) — Other Posts */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Other Posts
                  </h4>
                </div>

                <div className="space-y-4">
                  {otherLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((s) => (
                        <div
                          key={s}
                          className="animate-pulse flex gap-3 items-center"
                        >
                          <div className="w-20 h-14 bg-gray-200 rounded-lg" />
                          <div className="flex-1">
                            <div className="h-3 bg-gray-200 rounded w-4/5 mb-2" />
                            <div className="h-2 bg-gray-200 rounded w-1/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : otherPosts.length > 0 ? (
                    otherPosts.map((p) => (
                      <div
                        key={p.postId}
                        onClick={() => navigate(`/post/${p.postId}`)}
                        className="flex gap-3 group cursor-pointer pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={
                              p.frontImageUrl ||
                              "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                            }
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-1">
                            {p.title}
                          </h5>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>
                              {new Date(p.createdAt).toLocaleDateString()}
                            </span>
                            <span className="mx-1">•</span>
                            <span>{p.comments?.length || 0} comments</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No other posts found
                    </p>
                  )}
                </div>

                {/* optional "View all" link */}
                {otherPosts.length > 0 && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => navigate("/")}
                      className="text-sm text-red-600 font-semibold hover:underline"
                    >
                      View all posts →
                    </button>
                  </div>
                )}
              </div>

              {/* small promo or author card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start gap-3">
                  <img
                    src={
                      post.author?.generalDetails?.photoUrl ||
                      "https://via.placeholder.com/56"
                    }
                    alt="Author"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {post.author?.generalDetails?.name || "IDS Team"}
                    </p>
                    <p className="text-sm text-gray-500">Journalist & Editor</p>
                    <p className="text-sm text-gray-600 mt-3">
                      Thanks for reading — follow for more stories from this
                      author.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSignInModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/30 backdrop-blur-sm transition-all duration-300 animate-fadeIn"
          onClick={() => setShowSignInModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative transform transition-all duration-300 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:rotate-90 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full mb-4 shadow-lg">
                <img src="resources/download.png" alt="" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to IDS News Nepal
              </h2>
              <p className="text-gray-600">Sign in to access all features</p>
            </div>

            <GoogleSignIn onSuccess={() => setShowSignInModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
