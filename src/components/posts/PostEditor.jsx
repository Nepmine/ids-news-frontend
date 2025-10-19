import React, { useState, useRef, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import { uploadToCloudinary } from '../../services/cloudinary';

export const PostEditor = ({ post, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    headline: post?.headline || '',
    frontImageUrl: post?.frontImageUrl || '',
    content: post?.content || '',
  });
  const [uploading, setUploading] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const Quill = window.Quill;
    if (!Quill) {
      console.error('Quill not loaded');
      return;
    }

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'image'],
            ['clean'],
          ],
          handlers: {
            image: async function () {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.click();

              input.onchange = async () => {
                const file = input.files[0];
                if (file) {
                  try {
                    const url = await uploadToCloudinary(file);
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', url);
                  } catch (error) {
                    console.error('Image upload failed:', error);
                    alert('Failed to upload image');
                  }
                }
              };
            },
          },
        },
      },
    });

    quill.on('text-change', () => {
      setFormData((prev) => ({ ...prev, content: quill.root.innerHTML }));
    });

    if (formData.content) {
      quill.root.innerHTML = formData.content;
    }

    quillRef.current = quill;
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData({ ...formData, frontImageUrl: url });
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.headline) {
      alert('Title and headline are required');
      return;
    }

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save post');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto z-50">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
            <h2 className="text-2xl font-bold text-gray-900">
              {post ? 'Edit Post' : 'Create New Post'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter post title"
              />
            </div>

            {/* Headline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Headline *
              </label>
              <textarea
                value={formData.headline}
                onChange={(e) =>
                  setFormData({ ...formData, headline: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="3"
                placeholder="Enter post headline"
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Image
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="cover-image"
                />
                <label
                  htmlFor="cover-image"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition flex items-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                </label>
                {formData.frontImageUrl && (
                  <img
                    src={formData.frontImageUrl}
                    alt="Cover"
                    className="h-20 w-32 object-cover rounded"
                  />
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content *
              </label>
              <div
                ref={editorRef}
                className="bg-white"
                style={{ minHeight: '300px' }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                {post ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};