import React, { useState } from 'react';
import {
  Heart,
  Calendar,
  Share2,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from 'lucide-react';

export const PostDetail = ({
  post,
  isLiked,
  onLike,
  onShowSignInModal,
  user,
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        );
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

  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="relative">
        <img
          src={
            post.frontImageUrl ||
            'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200'
          }
          alt={post.title}
          className="w-full h-[420px] md:h-[480px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
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
              src={
                post.author?.generalDetails?.photoUrl ||
                'https://via.placeholder.com/48'
              }
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
              onClick={onLike}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                isLiked
                  ? 'bg-red-50 text-red-600 ring-2 ring-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes || 0}</span>
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
    </article>
  );
};