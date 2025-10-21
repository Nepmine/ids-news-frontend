// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { api } from '../services/api';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthor, setIsAuthor] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     const token = api.getToken();
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const userData = await api.getUserDetails();
//       setUser(userData);

//       const authorStatus = await api.isAuthor();
//       setIsAuthor(authorStatus === true);
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       api.clearToken();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = (token) => {
//     api.setToken(token);
//     checkAuth();
//   };

//   const logout = () => {
//     api.clearToken();
//     setUser(null);
//     setIsAuthor(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, isAuthor, loading, login, logout, checkAuth }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };











import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = api.getToken();
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // First, call userLogin to register/get user
      await api.login();
      
      // Then get user details
      const userData = await api.getUserDetails();
      setUser(userData);

      // Check if author
      try {
        const authorStatus = await api.isAuthor();
        setIsAuthor(authorStatus === true);
      } catch {
        setIsAuthor(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Don't clear token on first error - might be network issue
      // Only clear if it's an auth error
      if (error.message?.includes('401') || error.message?.includes('403')) {
        api.clearToken();
        setUser(null);
        setIsAuthor(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    api.setToken(token);
    setLoading(true);
    
    try {
      // Call userLogin endpoint to create/verify user
      console.log("---------------- login debug step - 1")
      await api.login();
      
      console.log("---------------- login debug step - 2")
      // Then fetch user details
      const userData = await api.getUserDetails();
      console.log("---------------- login debug step - 3")
      setUser(userData);
      console.log("---------------- login debug step - 4")

      // Check author status
      try {
        const authorStatus = await api.isAuthor();
        setIsAuthor(authorStatus === true);
      } catch {
        setIsAuthor(false);
      }
    } catch (error) {
      console.error('Login failed:', error);
      api.clearToken();
      setUser(null);
      setIsAuthor(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.clearToken();
    setUser(null);
    setIsAuthor(false);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthor, loading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
