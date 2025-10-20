import React, { useState } from 'react';
import { Menu, LogOut, User, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleSignIn } from '../auth/GoogleSignIn';

export const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={onMenuClick} 
                className="lg:hidden hover:bg-red-700 p-2 rounded transition"
              >
                <Menu className="w-6 h-6" />
              </button>
              <a href="/" className="flex items-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
                  IDS Story Nepal
                </h1>
              </a>
            </div>

            {/* Center: Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className="text-white hover:text-red-100 transition font-medium text-base"
              >
                Home
              </a>
              <a
                href="#trending"
                className="text-white hover:text-red-100 transition font-medium text-base"
              >
                Trending
              </a>
              <a
                href="#latest"
                className="text-white hover:text-red-100 transition font-medium text-base"
              >
                Latest
              </a>
            </nav>

            {/* Right: User Section */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow"
                  />
                  <span className="hidden sm:inline text-sm font-medium">
                    {user.givenName}
                  </span>
                  <button
                    onClick={logout}
                    className="hover:bg-red-700 p-2 rounded transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="bg-white text-red-600 px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition shadow-lg flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSignInModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to IDS Story Nepal
              </h2>
              <p className="text-gray-600">
                Sign in to access all features
              </p>
            </div>

            <GoogleSignIn onSuccess={() => setShowSignInModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};