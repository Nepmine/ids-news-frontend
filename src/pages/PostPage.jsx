import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Heart,
  Calendar,
  Share2,
  User,
  MessageCircle,
  Clock,
  Eye,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  TrendingUp
} from 'lucide-react';
import { api } from '../services/api';
import './Postpage.css'; 

import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { CommentList } from '../components/comments/CommentList';
import { CommentForm } from '../components/comments/CommentForm';
import { AuthRequiredModal } from '../components/common/AuthRequiredModal';
import { X, Newspaper } from 'lucide-react';
import { GoogleSignIn } from '../components/auth/GoogleSignIn';

import { useAuth } from '../context/AuthContext';

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
  const [isSaved, setIsSaved] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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
      console.error('Failed to load post:', error);
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
        // exclude current post and show up to 6 others, sorted by recent first (preserve backend order)
        const filtered = data.filter((p) => String(p.postId) !== String(postId));
        setOtherPosts(filtered.slice(0, 6));
      } else {
        setOtherPosts([]);
      }
    } catch (error) {
      console.error('Failed to load other posts:', error);
      setOtherPosts([]);
    } finally {
      setOtherLoading(false);
    }
  };

let isProcessing = false;

const handleLike = () => {
  if (isProcessing) return; // avoid double trigger
  isProcessing = true;
  setTimeout(() => (isProcessing = false), 300);

  if (!user) {
    setShowSignInModal(true);
    return;
  }

  // --- UI update ---
  setIsLiked((prevLiked) => {
    setPost((prevPost) => ({
      ...prevPost,
      likes: prevLiked ? prevPost.likes - 1 : prevPost.likes + 1,
    }));
    return !prevLiked;
  });

  // --- Fire API ---
  api.likePost(postId).catch((err) => console.error("Like API failed:", err));
};



  const handleSave = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setIsSaved((s) => !s);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        break;
      default:
        if (navigator.share) {
          navigator.share({ title, url });
        }
    }
    setShowShareMenu(false);
  };

  const handleComment = async (commentText) => {
    try {
      await api.addComment(postId, commentText);
      loadPost();
    } catch (error) {
      console.error('Failed to comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Delete this comment?')) return;
    try {
      await api.deleteComment(commentId);
      loadPost();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const handleEditComment = async (commentId, newText) => {
    try {
      await api.editComment(commentId, newText);
      loadPost();
    } catch (error) {
      console.error('Failed to edit comment:', error);
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
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Post not found</h2>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
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
            <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Cover Image */}
              <div className="relative">
                <img
                  src={post.frontImageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200'}
                  alt={post.title}
                  className="w-full h-[420px] md:h-[480px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                </div>
              </div>

              {/* Article Header */}
              <div className="p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  {post.title}
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-red-600 pl-6">
                  {post.headline}
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between pb-8 mb-8 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <img
                      src={post.author?.generalDetails?.photoUrl || 'https://via.placeholder.com/48'}
                      alt="Author"
                      className="w-14 h-14 rounded-full ring-2 ring-gray-200 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {post.author?.generalDetails?.name || 'IDS Team'}
                      </p>
                      <p className="text-sm text-gray-500">Journalist & Editor</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                        isLiked
                          ? 'bg-red-50 text-red-600 ring-2 ring-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes || 0}</span>
                    </button>

                    <button
                      onClick={handleSave}
                      className={`p-2.5 rounded-lg transition-all ${
                        isSaved
                          ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu((s) => !s)}
                        className="p-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all"
                        aria-expanded={showShareMenu}
                        aria-label="Share"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>

                      {showShareMenu && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowShareMenu(false)}
                          />
                          <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 w-48 z-20">
                            <button
                              onClick={() => handleShare('facebook')}
                              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                            >
                              <Facebook className="w-5 h-5 text-blue-600" />
                              <span>Facebook</span>
                            </button>
                            <button
                              onClick={() => handleShare('twitter')}
                              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                            >
                              <Twitter className="w-5 h-5 text-sky-500" />
                              <span>Twitter</span>
                            </button>
                            <button
                              onClick={() => handleShare('linkedin')}
                              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                            >
                              <Linkedin className="w-5 h-5 text-blue-700" />
                              <span>LinkedIn</span>
                            </button>
                            <hr className="my-1" />
                            <button
                              onClick={() => handleShare('copy')}
                              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                            >
                              <Link2 className="w-5 h-5 text-gray-500" />
                              <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div
                  className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-xl"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

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
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Join the Discussion</h4>
                      <p className="text-gray-600 mb-4">Sign in to share your thoughts and engage with the community</p>
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
                      />
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl">
                      <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">No comments yet</p>
                      <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar (Right) — Other Posts (replaces Trending/Newsletter/Tags) */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Other Posts</h4>
                </div>

                <div className="space-y-4">
                  {otherLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="animate-pulse flex gap-3 items-center">
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
                            src={p.frontImageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
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
                            <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                            <span className="mx-1">•</span>
                            <span>{p.comments?.length || 0} comments</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No other posts found</p>
                  )}
                </div>

                {/* optional "View all" link */}
                {otherPosts.length > 0 && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => navigate('/')}
                      className="text-sm text-red-600 font-semibold hover:underline"
                    >
                      View all posts →
                    </button>
                  </div>
                )}
              </div>

              {/* small promo or author card (optional) */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start gap-3">
                  <img
                    src={post.author?.generalDetails?.photoUrl || 'https://via.placeholder.com/56'}
                    alt="Author"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{post.author?.generalDetails?.name || 'IDS Team'}</p>
                    <p className="text-sm text-gray-500">Journalist & Editor</p>
                    <p className="text-sm text-gray-600 mt-3">Thanks for reading — follow for more stories from this author.</p>
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
                <Newspaper className="w-8 h-8 text-white" />
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
