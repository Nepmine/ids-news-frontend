import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, Menu, X, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GoogleSignIn } from '../auth/GoogleSignIn';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trending', path: '/trending' },
    { name: 'Weekly-Article', path: '/weeklyArticle' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
<header className="bg-[#fffaf6] border-b border-gray-200 fixed top-0 w-full z-50">
        {/* Top Social Bar */}
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
          {/* Left - Social Icons */}
          <div className="flex space-x-4 text-gray-700">
            <a href="#" className="hover:text-red-600 transition">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-red-600 transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-red-600 transition">
              <Twitter size={18} />
            </a>
          </div>

          {/* Center - Logo */}
          <h1
            className="text-3xl font-bold cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-gray-900">IDS</span>{' '}
            <span className="text-red-600">NEWS</span>
          </h1>

          {/* Right - Sign Up / User Section */}
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
                  className="hover:bg-gray-200 p-2 rounded transition ml-3"
                  title="Sign Out"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition font-medium hidden sm:block"
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden ml-4 text-gray-700 hover:text-red-600 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="border-t border-gray-200 hidden sm:block">
          <ul className="flex justify-center flex-wrap gap-8 py-3 text-sm font-semibold text-gray-800">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => navigate(link.path)}
                  className={`hover:text-red-600 transition ${
                    isActive(link.path) ? 'text-red-600' : ''
                  }`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="sm:hidden border-t border-gray-200 bg-[#fffaf6]">
            <ul className="flex flex-col gap-4 py-4 px-6 text-gray-800 font-semibold">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      navigate(link.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left hover:text-red-600 transition ${
                      isActive(link.path) ? 'text-red-600' : ''
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              {!user && (
                <li>
                  <button
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition font-medium"
                    onClick={() => {
                      setShowSignInModal(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </header>

      {/* Sign Up Modal */}
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
              <p className="text-gray-600">Sign up to access all features</p>
            </div>

            <GoogleSignIn onSuccess={() => setShowSignInModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};
