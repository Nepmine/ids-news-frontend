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
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button onClick={onMenuClick} className="lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <a href="/" className="flex items-center space-x-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  IDS Story Nepal
                </h1>
              </a>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="hover:text-red-200 transition font-medium">
                Home
              </a>
              <a href="#trending" className="hover:text-red-200 transition font-medium">
                Trending
              </a>
              <a href="#latest" className="hover:text-red-200 transition font-medium">
                Latest
              </a>
            </nav>

            {/* User Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="hidden md:inline text-sm font-medium">
                  {user.givenName}
                </span>
                <button
                  onClick={logout}
                  className="hover:text-red-200 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition shadow-lg flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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