import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, Calendar, Heart } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const MyPosts = () => {
  const { user, isAuthor } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
const [postToDelete, setPostToDelete] = useState(null);


  useEffect(() => {
    loadMyPosts();
  }, []);

  const loadMyPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getMyBlogs();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


const handleDelete = (postId) => {
  setPostToDelete(postId);
  setConfirmOpen(true);
};

const handleConfirmDelete = async () => {
  setConfirmOpen(false);

  try {
    await api.deletePost(postToDelete);
    setPosts(posts.filter((p) => p.postId !== postToDelete));
  } catch (err) {
    toast.error("Failed to delete post");
  } finally {
    setPostToDelete(null);
  }
};

const handleCancelDelete = () => {
  setConfirmOpen(false);
  setPostToDelete(null);
};

  if (!isAuthor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-4">
            Access Denied
          </h2>
          <p className="text-red-700">
            You need to be an author to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner text="Loading your posts..." />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <p className="text-red-700">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Posts</h1>
        <p className="text-gray-600">Manage your published articles</p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">
            You haven't created any posts yet.
          </p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.postId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {post.frontImageUrl && (
                        <img
                          src={post.frontImageUrl}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {post.headline}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-500">
                        <Heart className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.likes || 0}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => window.open(`/post/${post.postId}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {/* Navigate to edit */}}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.postId)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmDialog
  isOpen={confirmOpen}
  title="Delete This Post?"
  message="Are you sure you want to delete this post? This action cannot be undone."
  onConfirm={handleConfirmDelete}
  onCancel={handleCancelDelete}
/>

    </div>
    
  );
};