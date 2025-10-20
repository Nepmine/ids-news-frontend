import React, { useEffect } from 'react';
import { User } from 'lucide-react';

export const GoogleSignIn = ({ onSuccess }) => {
  useEffect(() => {
    // Load Google Sign-In
    if (window.google && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Render the button
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInDiv'),
        {
          theme: 'filled_blue',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        }
      );
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const token = response.credential;
    
    // Store token
    localStorage.setItem('token', token);
    
    if (onSuccess) {
      onSuccess(token);
    } else {
      // Reload page to update auth state
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div id="googleSignInDiv"></div>
      <p className="text-xs text-gray-500 text-center max-w-xs">
        Sign in to like posts, comment, and access all features
      </p>
    </div>
  );
};