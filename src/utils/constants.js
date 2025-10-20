export const COLORS = {
  primary: '#DC2626', // Red-600
  primaryDark: '#B91C1C', // Red-700
  secondary: '#000000', // Black
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

export const ROUTES = {
  HOME: '/',
  POST_DETAIL: '/post/:id',
  MY_POSTS: '/my-posts',
  LIKED_POSTS: '/liked',
  SEARCH: '/search',
  CREATE_POST: '/create',
};

export const API_ENDPOINTS = {
  USER: {
    LOGIN: '/user/userLogin',
    DETAILS: '/user/userDetails',
    MY_BLOGS: '/user/myBlogs',
    LIKED_POSTS: '/user/myLikedPosts',
    IS_AUTHOR: '/user/isAuthor',
    MAKE_AUTHOR: '/user/makeAuthor',
  },
  POST: {
    HOME_POSTS: '/post/getHomePosts',
    GET_POST: '/post/getPost',
    CREATE: '/post/createPost',
    UPDATE: '/post/updatePost',
    DELETE: '/post/deletePost',
    LIKE: '/post/likePost',
    COMMENT: '/post/comment',
    EDIT_COMMENT: '/post/editComment',
    DELETE_COMMENT: '/post/deleteComment',
  },
};

export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};

export const GOOGLE_CONFIG = {
  CLIENT_ID: import.meta.env.REACT_APP_GOOGLE_CLIENT_ID,
};