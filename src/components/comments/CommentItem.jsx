import React, { useState } from 'react';
import { Edit, Trash2, Save, X } from 'lucide-react';

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const CommentItem = ({ comment, isOwner, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment);

  const handleSave = () => {
    if (editText.trim() && editText !== comment.comment) {
      onEdit(editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(comment.comment);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-3">
          <img
            src={comment.user?.photoUrl || 'https://via.placeholder.com/40'}
            alt={comment.user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-900">{comment.user?.name || 'Anonymous'}</p>
            <p className="text-xs text-gray-500">
              {formatDateTime(comment.createdAt)}
              {comment.updatedAt !== comment.createdAt && ' (edited)'}
            </p>
          </div>
        </div>

        {isOwner && !isEditing && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700 p-1"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-700 p-1"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows="3"
          />
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
            >
              <Save className="w-3 h-3" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-1 border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 text-sm"
            >
              <X className="w-3 h-3" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 mt-2">{comment.comment}</p>
      )}
    </div>
  );
};