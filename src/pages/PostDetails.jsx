import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostDetail } from '../components/posts/PostDetail';
import { useAuth } from '../context/AuthContext';

export const PostDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <PostDetail
      postId={id}
      onClose={() => navigate('/')}
      user={user}
    />
  );
};