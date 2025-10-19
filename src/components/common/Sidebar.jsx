import React from 'react';
import { Home, Heart, BookOpen, PlusCircle, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
// import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, isAuthor, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/', show: true },
    { icon: Search, label: 'Search', path: '/search', show: true },
    { icon: Heart, label: 'Liked Posts', path: '/liked', show: !!user },
    { icon: BookOpen, label: 'My Posts', path: '/my-posts', show: isAuthor },
    { icon: PlusCircle, label: 'Create Post', path: '/create', show: isAuthor },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-red-600">IDS Story Nepal</h2>
        </div>

        <nav className="p-4">
          {menuItems.map(
            (item) =>
              item.show && (
                <a
                  key={item.path}
                  href={item.path}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition mb-2"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              )
          )}
        </nav>

        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};