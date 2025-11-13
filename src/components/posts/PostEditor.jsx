import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Save, Loader, Tag, Eye, Edit3, Maximize2 } from 'lucide-react';
import { uploadToCloudinary } from '../../services/cloudinary';

export const PostEditor = ({ post, onClose, onSave, contentType = 'post' }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    headline: post?.headline || '',
    frontImageUrl: post?.frontImageUrl || '',
    content: post?.content || '',
    category: post?.category || [],
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const editorContainerRef = useRef(null);

  const isArticle = contentType === 'article';
  const typeText = isArticle ? 'Article' : 'Post';
  const typeLower = isArticle ? 'article' : 'post';

  const categories = [
    { id: 'home', label: 'Home' },
    { id: 'sports', label: 'Sports' },
    { id: 'politics', label: 'Politics' },
    { id: 'business', label: 'Business' },
    { id: 'technology', label: 'Technology' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'health', label: 'Health' },
    { id: 'world', label: 'World' },
  ];

  // Initialize Quill editor
  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const Quill = window.Quill;
    if (!Quill) {
      console.error('Quill not loaded');
      return;
    }

    // Register custom image size formats
    const SizeStyle = Quill.import('attributors/style/size');
    SizeStyle.whitelist = ['small', 'normal', 'large', 'full'];
    Quill.register(SizeStyle, true);

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: 'Start writing your content here...',
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'image'],
            ['blockquote', 'code-block'],
            [{ color: [] }, { background: [] }],
            ['clean'],
          ],
          handlers: {
            image: imageHandler,
            link: linkHandler,
          },
        },
      },
    });

    // Custom image handler with size options
    async function imageHandler() {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (file) {
          try {
            const range = quill.getSelection(true);
            quill.insertText(range.index, '📤 Uploading image...');
            
            const url = await uploadToCloudinary(file);
            
            quill.deleteText(range.index, '📤 Uploading image...'.length);
            
            // Insert image
            quill.insertEmbed(range.index, 'image', url);
            quill.setSelection(range.index + 1);
            
            // Show image size dialog
            setTimeout(() => showImageSizeDialog(range.index), 100);
          } catch (error) {
            console.error('Image upload failed:', error);
            alert('Failed to upload image: ' + error.message);
            
            const range = quill.getSelection(true);
            const text = quill.getText();
            const loadingIndex = text.indexOf('📤 Uploading image...');
            if (loadingIndex !== -1) {
              quill.deleteText(loadingIndex, '📤 Uploading image...'.length);
            }
          }
        }
      };
    }

    // Custom link handler with better UI
    function linkHandler() {
      const range = quill.getSelection();
      if (range) {
        const currentUrl = quill.getFormat(range).link || '';
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
          <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onclick="event.stopPropagation()">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Insert Link</h3>
            <input 
              type="url" 
              id="link-url-input"
              value="${currentUrl}"
              placeholder="https://example.com"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
            />
            <div class="flex gap-3">
              <button id="link-cancel" class="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                Cancel
              </button>
              <button id="link-save" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                Insert Link
              </button>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        const input = document.getElementById('link-url-input');
        input.focus();
        input.select();
        
        document.getElementById('link-cancel').onclick = () => modal.remove();
        modal.onclick = () => modal.remove();
        
        document.getElementById('link-save').onclick = () => {
          const url = input.value.trim();
          if (url) {
            quill.format('link', url);
          } else {
            quill.format('link', false);
          }
          modal.remove();
        };
        
        input.onkeydown = (e) => {
          if (e.key === 'Enter') {
            document.getElementById('link-save').click();
          } else if (e.key === 'Escape') {
            modal.remove();
          }
        };
      }
    }

    // Show image size dialog
    function showImageSizeDialog(imageIndex) {
      // Get the image element position
      const editorElement = quillRef.current.root;
      const images = editorElement.querySelectorAll('img');
      let targetImage = null;
      
      // Find the newly inserted image
      const delta = quill.getContents();
      let currentIndex = 0;
      for (let i = 0; i < delta.ops.length; i++) {
        if (delta.ops[i].insert?.image) {
          if (currentIndex === Math.floor(imageIndex)) {
            targetImage = images[Math.floor(imageIndex)];
            break;
          }
          currentIndex++;
        }
      }
      
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      
      modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl border-2 border-red-500 p-4 animate-scale-in" onclick="event.stopPropagation()" style="max-width: 400px;">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
              <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Image Size
            </h3>
            <button id="size-close" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="grid grid-cols-4 gap-2 mb-3">
            <button data-size="small" class="flex flex-col items-center justify-center px-2 py-3 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 text-xs font-medium transition-all">
              <div class="w-8 h-8 bg-gray-200 rounded mb-1" style="width: 50%;"></div>
              <span>Small</span>
              <span class="text-gray-400 text-xs">25%</span>
            </button>
            <button data-size="normal" class="flex flex-col items-center justify-center px-2 py-3 border-2 border-red-500 bg-red-50 rounded-lg text-xs font-medium">
              <div class="w-8 h-8 bg-red-200 rounded mb-1" style="width: 75%;"></div>
              <span>Normal</span>
              <span class="text-red-600 text-xs">50% ✓</span>
            </button>
            <button data-size="large" class="flex flex-col items-center justify-center px-2 py-3 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 text-xs font-medium transition-all">
              <div class="w-8 h-8 bg-gray-200 rounded mb-1" style="width: 90%;"></div>
              <span>Large</span>
              <span class="text-gray-400 text-xs">75%</span>
            </button>
            <button data-size="full" class="flex flex-col items-center justify-center px-2 py-3 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 text-xs font-medium transition-all">
              <div class="w-8 h-8 bg-gray-200 rounded mb-1" style="width: 100%;"></div>
              <span>Full</span>
              <span class="text-gray-400 text-xs">100%</span>
            </button>
          </div>
          
          <button id="size-done" class="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">
            Done
          </button>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      modal.onclick = () => modal.remove();
      document.getElementById('size-done').onclick = () => modal.remove();
      document.getElementById('size-close').onclick = () => modal.remove();
      
      modal.querySelectorAll('[data-size]').forEach(btn => {
        btn.onclick = () => {
          const size = btn.getAttribute('data-size');
          
          // Get the image element
          const delta = quill.getContents(imageIndex, 1);
          if (delta.ops[0]?.insert?.image) {
            quill.formatText(imageIndex, 1, 'width', getWidthForSize(size));
            
            // Update button styles - visual representation
            modal.querySelectorAll('[data-size]').forEach(b => {
              b.className = 'flex flex-col items-center justify-center px-2 py-3 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 text-xs font-medium transition-all';
              const bg = b.querySelector('div');
              if (bg) bg.className = 'w-8 h-8 bg-gray-200 rounded mb-1';
              const percentage = b.querySelector('span:last-child');
              if (percentage) {
                percentage.className = 'text-gray-400 text-xs';
                percentage.textContent = percentage.textContent.replace(' ✓', '');
              }
            });
            
            btn.className = 'flex flex-col items-center justify-center px-2 py-3 border-2 border-red-500 bg-red-50 rounded-lg text-xs font-medium';
            const bg = btn.querySelector('div');
            if (bg) bg.className = 'w-8 h-8 bg-red-200 rounded mb-1';
            const percentage = btn.querySelector('span:last-child');
            if (percentage) {
              percentage.className = 'text-red-600 text-xs';
              percentage.textContent = percentage.textContent.replace(' ✓', '') + ' ✓';
            }
          }
        };
      });
    }

    function getWidthForSize(size) {
      switch (size) {
        case 'small': return '25%';
        case 'normal': return '50%';
        case 'large': return '75%';
        case 'full': return '100%';
        default: return '50%';
      }
    }

    // Listen for content changes
    quill.on('text-change', () => {
      const content = quill.root.innerHTML;
      console.log('✏️ Content changed, updating formData');
      setFormData((prev) => ({ ...prev, content }));
    });

    // Set initial content if exists
    if (formData.content) {
      console.log('📝 Setting initial content');
      quill.root.innerHTML = formData.content;
    }

    quillRef.current = quill;
    console.log('✅ Quill editor initialized');
  }, []);

  // Restore content when switching back from preview
  useEffect(() => {
    console.log('🔄 Preview toggle:', { showPreview, hasQuill: !!quillRef.current, hasContent: !!formData.content });
    
    if (!showPreview && quillRef.current && formData.content) {
      const timer = setTimeout(() => {
        if (quillRef.current) {
          const currentContent = quillRef.current.root.innerHTML;
          const currentText = quillRef.current.getText().trim();
          
          console.log('📋 Current editor text length:', currentText.length);
          console.log('📋 Stored content length:', formData.content.length);
          
          // Only restore if editor is empty or different
          if (currentText === '' || currentContent !== formData.content) {
            console.log('🔧 Restoring content to editor');
            quillRef.current.clipboard.dangerouslyPasteHTML(formData.content);
          } else {
            console.log('✓ Content already in editor, skipping restore');
          }
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [showPreview]);

  // Click anywhere in editor container to focus
  useEffect(() => {
    const container = editorContainerRef.current;
    if (!container || !quillRef.current) return;

    const handleContainerClick = (e) => {
      // If clicked on the container but not on the editor itself
      if (e.target === container || e.target.classList.contains('ql-container')) {
        quillRef.current.focus();
      }
    };

    container.addEventListener('click', handleContainerClick);
    return () => container.removeEventListener('click', handleContainerClick);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData({ ...formData, frontImageUrl: url });
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const toggleCategory = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      category: prev.category.includes(categoryId)
        ? prev.category.filter(c => c !== categoryId)
        : [...prev.category, categoryId]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.headline) {
      alert('Title and headline are required');
      return;
    }

    if (formData.category.length === 0) {
      alert('Please select at least one category');
      return;
    }

    console.log('💾 Saving with content length:', formData.content.length);
    
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md overflow-y-auto z-50 transition-all duration-300">
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
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  console.log('🔀 Toggling preview mode. Current content:', formData.content.substring(0, 50) + '...');
                  setShowPreview(!showPreview);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
              >
                {showPreview ? <Edit3 className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span>{showPreview ? 'Edit' : 'Preview'}</span>
              </button>
              <button
                onClick={onClose}
                className="hover:bg-red-700 p-2 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className={`p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto ${showPreview ? 'hidden' : ''}`}>
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

            {/* Categories */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Categories <span className="text-red-600">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                      formData.category.includes(category.id)
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Tag className="w-4 h-4" />
                    {category.label}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Select one or more categories for your {typeLower}
              </p>
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
                    className={`flex flex-col items-center ${uploading ? 'pointer-events-none' : 'cursor-pointer'}`}
                  >
                    {uploading ? (
                      <>
                        <Loader className="w-12 h-12 text-red-600 animate-spin mb-3" />
                        <p className="text-gray-600 font-medium">Uploading to Cloudinary...</p>
                        <p className="text-sm text-gray-500 mt-1">Please wait</p>
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
              <div 
                ref={editorContainerRef}
                className="border-2 border-gray-200 rounded-lg overflow-hidden cursor-text"
                style={{ minHeight: '400px' }}
              >
                <div
                  ref={editorRef}
                  className="bg-white"
                  style={{ minHeight: '350px' }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                💡 Click anywhere in the editor to start writing. Use the image button to upload and resize images.
              </p>
            </div>
          </div>

          {/* Preview Mode */}
          <div className={`p-6 max-h-[calc(100vh-200px)] overflow-y-auto ${showPreview ? '' : 'hidden'}`}>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Cover Image Preview */}
                {formData.frontImageUrl && (
                  <img
                    src={formData.frontImageUrl}
                    alt="Cover"
                    className="w-full h-96 object-cover"
                  />
                )}
                
                <div className="p-8">
                  {/* Title Preview */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {formData.title || 'Your Title Here'}
                  </h1>
                  
                  {/* Headline Preview */}
                  <p className="text-xl text-gray-600 border-l-4 border-red-600 pl-6 mb-6">
                    {formData.headline || 'Your headline here'}
                  </p>
                  
                  {/* Categories Preview */}
                  {formData.category.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {formData.category.map(cat => (
                        <span key={cat} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Content Preview */}
                  <div
                    className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-400">Start writing to see preview...</p>' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex items-center justify-between border-t">
            <div className="text-sm text-gray-600">
              {formData.category.length > 0 && (
                <span>
                  Selected: <span className="font-semibold">{formData.category.join(', ')}</span>
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving || uploading}
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

      {/* Custom Styles for Image Sizing */}
      <style jsx>{`
        .ql-editor img {
          display: block;
          margin: 1rem auto;
          border-radius: 0.5rem;
          max-width: 100%;
          height: auto;
        }
        .ql-editor img[style*="width: 25%"] {
          width: 25% !important;
        }
        .ql-editor img[style*="width: 50%"] {
          width: 50% !important;
        }
        .ql-editor img[style*="width: 75%"] {
          width: 75% !important;
        }
        .ql-editor img[style*="width: 100%"] {
          width: 100% !important;
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.2s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.15s ease-out;
        }
      `}</style>
    </div>
  );
}