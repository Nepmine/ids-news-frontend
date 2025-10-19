import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  const handleGoogleSignIn = () => {
    // Initialize Google Sign-In
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.prompt();
    } else {
      alert('Google Sign-In not loaded. Please refresh the page.');
    }
  };

  const handleCredentialResponse = async (response) => {
    const token = response.credential;
    localStorage.setItem('token', token);
    window.location.reload();
  };

  return (
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
            <a
              href="/"
              className="hover:text-red-200 transition font-medium"
            >
              Home
            </a>
            <a
              href="#trending"
              className="hover:text-red-200 transition font-medium"
            >
              Trending
            </a>
            <a
              href="#latest"
              className="hover:text-red-200 transition font-medium"
            >
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
              onClick={handleGoogleSignIn}
              className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition shadow-lg flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};