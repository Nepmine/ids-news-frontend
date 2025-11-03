import React, { useState } from 'react';
import { Menu, LogOut, User, X, Newspaper } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleSignIn } from '../auth/GoogleSignIn';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Menu Button & Logo */}
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleMobileMenu}
                className="lg:hidden hover:bg-red-700 p-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2 group"
              >
                <div className="bg-white p-1 rounded-lg shadow-md transition-all duration-300 group-hover:scale-120 group-hover:rotate-3">
                  <img src="/resources/download.png" alt="" className="w-6 h-6 sm:w-8 sm:h-8 text-red-600"/>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap transition-all duration-300 group-hover:text-red-100">
                  IDS News
                </h1>
              </button>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => navigate('/')}
                className={`text-white hover:text-red-100 cursor-pointer transition font-medium text-base px-4 py-2 rounded ${
                  isActive('/') ? 'bg-red-700' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigate('/trending')}
                className={`text-white hover:text-red-100 cursor-pointer transition font-medium text-base px-4 py-2 rounded ${
                  isActive('/trending') ? 'bg-red-700' : ''
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => navigate('/weeklyArticle')}
                className={`text-white hover:text-red-100 cursor-pointer transition font-medium text-base px-4 py-2 rounded ${
                  isActive('/weeklyArticle') ? 'bg-red-700' : ''
                }`}
              >
                Weekly-Article
              </button>
              <button
                onClick={() => navigate('/about')}
                className={`text-white hover:text-red-100 cursor-pointer transition font-medium text-base px-4 py-2 rounded ${
                  isActive('/about') ? 'bg-red-700' : ''
                }`}
              >
                About
              </button>
            </nav>

            {/* Right: User Section */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center gap-3 bg-red-700">
                  <img
                    src={user.photoUrl}
                    alt='/resources/user.png'
                    className="bg-red-700 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-lg transition-all duration-300 hover:scale-110 hover:border-red-200"
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

        {/* Mobile Menu Dropdown */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-4 pb-4 pt-2 space-y-1 border-t border-red-500">
            <button
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left text-white hover:bg-red-700 transition-all duration-300 font-medium text-base px-4 py-3 rounded-lg ${
                isActive('/') ? 'bg-red-700' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate('/trending');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left text-white hover:bg-red-700 transition-all duration-300 font-medium text-base px-4 py-3 rounded-lg ${
                isActive('/trending') ? 'bg-red-700' : ''
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => {
                navigate('/weeklyArticle');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left text-white hover:bg-red-700 transition-all duration-300 font-medium text-base px-4 py-3 rounded-lg ${
                isActive('/weeklyArticle') ? 'bg-red-700' : ''
              }`}
            >
              Weekly-Article
            </button>
            <button
              onClick={() => {
                navigate('/about');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left text-white hover:bg-red-700 transition-all duration-300 font-medium text-base px-4 py-3 rounded-lg ${
                isActive('/about') ? 'bg-red-700' : ''
              }`}
            >
              About
            </button>
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
              <p className="text-gray-600">
                Sign in to access all features
              </p>
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