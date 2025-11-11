import React, { useState, useEffect } from 'react';
import { Menu, LogOut, User, X, Newspaper, TrendingUp, Trophy, Landmark, Briefcase, Calendar, Image, Info, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleSignIn } from '../auth/GoogleSignIn';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../services/api';

export const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [recentNews, setRecentNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Load recent news when header expands
  useEffect(() => {
    if (isHeaderExpanded && recentNews.length === 0) {
      loadRecentNews();
    }
  }, [isHeaderExpanded]);

  const loadRecentNews = async () => {
    setLoadingNews(true);
    try {
      const news = await api.getRecentNews(3);
      setRecentNews(news);
    } catch (error) {
      console.error('Failed to load recent news:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  // Main nav items (always visible)
  const mainNavItems = [
    { path: '/', label: 'Home' },
    { path: '/weeklyArticle', label: 'Weekly Article' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
  ];

  // Expanded menu categories (shown on hover)
  const expandedCategories = [
    { path: '/trending', label: 'Trending', icon: TrendingUp, description: 'What\'s hot right now' },
    { path: '/sports', label: 'Sports', icon: Trophy, description: 'Sports news & scores' },
    { path: '/politics', label: 'Politics', icon: Landmark, description: 'Political coverage' },
    { path: '/business', label: 'Business', icon: Briefcase, description: 'Business & economy' },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg sticky top-0 z-50 transition-all duration-300">
        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Menu Button & Logo */}
            <div 
              className="flex items-center gap-3"
              onMouseEnter={() => setIsHeaderExpanded(true)}
              onMouseLeave={() => setIsHeaderExpanded(false)}
            >
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden hover:bg-red-700 p-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 group"
              >
                <div className="bg-white p-1 rounded-lg shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <img
                    src="/resources/download.png"
                    alt=""
                    className="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
                  />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap transition-all duration-300 group-hover:text-red-100">
                  IDS News
                </h1>
              </button>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => {
                    if (item.path === '/') {
                      setIsHeaderExpanded(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.path === '/') {
                      setIsHeaderExpanded(false);
                    }
                  }}
                  className={`text-white hover:text-red-100 cursor-pointer transition font-medium text-sm px-3 py-2 rounded ${
                    isActive(item.path) ? "bg-red-700" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right: User Section */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoUrl}
                    alt="User"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-lg transition-all duration-300 hover:scale-110 hover:border-red-200"
                  />
                  <span className="hidden sm:inline text-sm font-medium">
                    {user.givenName}
                  </span>
                  <button
                    onClick={logout}
                    className="hover:bg-red-700 p-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="bg-white text-red-600 px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Navigation Grid (Desktop) */}
        <div
          className={`hidden md:block overflow-hidden transition-all duration-300 ease-in-out bg-white text-gray-900 shadow-xl ${
            isHeaderExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          onMouseEnter={() => setIsHeaderExpanded(true)}
          onMouseLeave={() => setIsHeaderExpanded(false)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Left: Navigation Links */}
              <div className="col-span-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
                <div className="space-y-1">
                  {expandedCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.path}
                        onClick={() => {
                          navigate(category.path);
                          setIsHeaderExpanded(false);
                        }}
                        className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive(category.path) 
                            ? 'bg-red-600 text-white' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <div className="text-left">
                          <div className="font-semibold text-sm">{category.label}</div>
                          <div className={`text-xs ${isActive(category.path) ? 'text-red-100' : 'text-gray-500'}`}>
                            {category.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Middle: Recent News */}
              <div className="col-span-6 border-l border-r border-gray-200 px-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Recent News</h3>
                
                {loadingNews ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  </div>
                ) : recentNews.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Newspaper className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No recent news available</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentNews.map((news, index) => (
                      <div 
                        key={news.postId}
                        className={`group cursor-pointer ${index !== 0 ? 'pt-4 border-t border-gray-100' : ''}`}
                        onClick={() => {
                          navigate(`/post/${news.postId}`);
                          setIsHeaderExpanded(false);
                        }}
                      >
                        <div className="flex gap-4">
                          <div className="w-24 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex-shrink-0 overflow-hidden relative">
                            {news.frontImageUrl ? (
                              <img 
                                src={news.frontImageUrl} 
                                alt={news.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-red-600">
                                <Newspaper className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm group-hover:text-red-600 transition-colors line-clamp-2 mb-1">
                              {news.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-1 mb-1">
                              {news.headline}
                            </p>
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{formatTimeAgo(news.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* View All Link */}
                {recentNews.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        navigate('/');
                        setIsHeaderExpanded(false);
                      }}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center group"
                    >
                      View all news
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right: Advertisement Space */}
              <div className="col-span-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Sponsored</h3>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6 h-64 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300">
                  <div className="text-gray-400 mb-2">
                    <Image className="w-12 h-12 mx-auto mb-2" />
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Advertisement</p>
                  <p className="text-xs text-gray-500">Your ad here</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                IDS News Nepal - Your trusted source for news and updates
              </p>
              <button 
                onClick={() => navigate('/about')}
                className="text-xs text-red-600 hover:text-red-700 font-semibold"
              >
                About Us →
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-4 pb-4 pt-2 space-y-1 border-t border-red-500">
            {/* Main nav items */}
            {mainNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 text-left text-white hover:bg-red-700 transition-all duration-300 font-medium text-base px-4 py-3 rounded-lg ${
                  isActive(item.path) ? "bg-red-700" : ""
                }`}
              >
                <Newspaper className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
            
            {/* Expanded categories */}
            {expandedCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.path}
                  onClick={() => {
                    navigate(category.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 text-left text-white hover:bg-red-700 transition-all duration-300 font-medium text-base px-4 py-3 rounded-lg ${
                    isActive(category.path) ? "bg-red-700" : ""
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Sign In Modal */}
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

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};