export const initGoogleAuth = (onSuccess) => {
  if (!window.google) {
    console.error('Google SDK not loaded');
    return;
  }

  window.google.accounts.id.initialize({
    client_id: import.meta.env.REACT_APP_GOOGLE_CLIENT_ID,
    callback: (response) => {
      const token = response.credential;
      localStorage.setItem('token', token);
      if (onSuccess) {
        onSuccess(token);
      }
    },
  });
};

export const renderGoogleButton = (elementId) => {
  if (!window.google) {
    console.error('Google SDK not loaded');
    return;
  }

  window.google.accounts.id.renderButton(
    document.getElementById(elementId),
    {
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',
    }
  );
};

export const promptGoogleSignIn = () => {
  if (!window.google) {
    console.error('Google SDK not loaded');
    return;
  }

  window.google.accounts.id.prompt();
};

export const signOut = () => {
  localStorage.removeItem('token');
  window.location.reload();
};