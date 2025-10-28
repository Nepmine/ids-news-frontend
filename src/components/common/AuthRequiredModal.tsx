import React from 'react';
import { X, LogIn } from 'lucide-react';

interface AuthRequiredModalProps {
  onClose: () => void;
  onSignIn: () => void;
}

export const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({
  onClose,
  onSignIn,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="mx-auto bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <LogIn className="w-8 h-8" />
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
        <p className="text-gray-600 mb-6">
          You need to be signed in to like posts, comment, or share your thoughts.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSignIn}
            className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
