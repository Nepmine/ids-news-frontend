import React, { useState } from 'react';
import { Menu, LogOut, User, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleSignIn } from '../auth/GoogleSignIn';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center">
              <button 
                onClick={onMenuClick} 
                className="lg:hidden hover:bg-red-700 p-2 rounded transition mr-3"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button onClick={() => navigate('/')} className="flex items-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
                  IDS News
                </h1>
              </button>
            </div>

            {/* Center: Navigation */}
            <nav className="hidden md:flex items-center">
              <button
                onClick={() => navigate('/')}
                className={`text-white hover:text-red-100 transition font-medium text-base px-4 py-2 rounded ${
                  isActive('/') ? 'bg-red-700' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigate('/trending')}
                className={`text-white hover:text-red-100 transition font-medium text-base px-4 py-2 rounded ${
                  isActive('/trending') ? 'bg-red-700' : ''
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => navigate('/weeklyArticle')}
                className={`text-white hover:text-red-100 transition font-medium text-base px-4 py-2 rounded ${
                  isActive('/weeklyArticle') ? 'bg-red-700' : ''
                }`}
              >
                Weekly-Article
              </button>
              <button
                onClick={() => navigate('/about')}
                className={`text-white hover:text-red-100 transition font-medium text-base px-4 py-2 rounded ${
                  isActive('/about') ? 'bg-red-700' : ''
                }`}
              >
                About
              </button>
            </nav>

            {/* Right: User Section */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center">
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow"
                  />
                  <span className="hidden sm:inline text-sm font-medium ml-3">
                    {user.givenName}
                  </span>
                  <button
                    onClick={logout}
                    className="hover:bg-red-700 p-2 rounded transition ml-3"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="bg-white text-red-600 px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition shadow-lg flex items-center"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sign In Modal */}
    {showSignInModal && (
  <div 
    className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-white/10 backdrop-blur-sm"
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

    </>
  );
};