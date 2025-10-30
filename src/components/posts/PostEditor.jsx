import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Image as ImageIcon, Save, Loader } from 'lucide-react';
import { uploadToCloudinary } from '../../services/cloudinary';

export const PostEditor = ({ post, onClose, onSave, contentType = 'post' }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    headline: post?.headline || '',
    frontImageUrl: post?.frontImageUrl || '',
    content: post?.content || '',
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Dynamic text based on contentType
  const isArticle = contentType === 'article';
  const typeText = isArticle ? 'Article' : 'Post';
  const typeLower = isArticle ? 'article' : 'post';

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

    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error(`Failed to save ${typeLower}:`, error);
      alert(`Failed to save ${typeLower}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto z-50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {post ? `Edit ${typeText}` : `Create New ${typeText}`}
              </h2>
              <p className="text-red-100 text-sm mt-1">
                {isArticle 
                  ? 'Write an in-depth article for your readers' 
                  : 'Share your story with the community'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-red-700 p-2 rounded-lg transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-lg"
                placeholder={`Enter an engaging title for your ${typeLower}...`}
              />
            </div>

            {/* Headline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Headline <span className="text-red-600">*</span>
              </label>
              <textarea
                value={formData.headline}
                onChange={(e) =>
                  setFormData({ ...formData, headline: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                rows="3"
                placeholder={`Write a compelling headline for your ${typeLower}...`}
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Image
              </label>
              
              {formData.frontImageUrl ? (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={formData.frontImageUrl}
                    alt="Cover"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, frontImageUrl: '' })}
                    className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="cover-image"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="cover-image"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    {uploading ? (
                      <>
                        <Loader className="w-12 h-12 text-red-600 animate-spin mb-3" />
                        <p className="text-gray-600 font-medium">Uploading...</p>
                      </>
                    ) : (
                      <>
                        <Camera className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-gray-600 font-medium mb-1">Click to upload cover image</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </>
                    )}
                  </label>
                </div>
              )}
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content <span className="text-red-600">*</span>
              </label>
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <div
                  ref={editorRef}
                  className="bg-white min-h-[300px]"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Use the toolbar to format your text and insert images
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex items-center justify-end border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium mr-3"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  {post ? `Update ${typeText}` : `Publish ${typeText}`}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};