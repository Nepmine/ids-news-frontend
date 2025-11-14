import React, { useEffect } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const GoogleSignIn = ({ onSuccess }) => {
  const { login } = useAuth();

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
        try {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          const buttonDiv = document.getElementById('googleSignInDiv');
          if (buttonDiv) {
            window.google.accounts.id.renderButton(buttonDiv, {
              theme: 'filled_blue',
              size: 'large',
              text: 'signin_with',
              shape: 'rectangular',
              logo_alignment: 'left',
            });
          }
        } catch (error) {
          console.error('Google Sign-In initialization failed:', error);
        }
      }
    };

    if (window.google) {
      initializeGoogleSignIn();
    } else {
      const checkGoogle = setInterval(() => {
        if (window.google) {
          clearInterval(checkGoogle);
          initializeGoogleSignIn();
        }
      }, 100);

      return () => clearInterval(checkGoogle);
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const token = response.credential;
      
      console.log('Google Sign-In successful, logging in...');
      
      // Use the login function from AuthContext
      await login(token);
      
      console.log('Login successful!');
      
      if (onSuccess) {
        onSuccess(token);
      }
    } catch (error) {
      console.error('Error handling credential response:', error);
      toast.error('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div id="googleSignInDiv"></div>
      
      {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-sm mt-4">
          <p className="text-sm text-yellow-800">
            <strong>Setup Required:</strong> Add your Google Client ID to the .env file
          </p>
        </div>
      )}
      
      <p className="text-xs text-gray-500 text-center max-w-xs mt-4">
        Sign in to like posts, comment, and access all features
      </p>
    </div>
  );
};