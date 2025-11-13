import React, { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, X,Newspaper, Upload, Heart, Trash2, MoreVertical } from 'lucide-react';
import { uploadToCloudinary } from '../services/cloudinary';
import toast from 'react-hot-toast';

import { useAuth } from '../context/AuthContext';
import { GoogleSignIn } from '../components/auth/GoogleSignIn';


import { api } from '../services/api';

const ImageLoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-pulse"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-600 rounded-full animate-spin border-t-transparent"></div>
    </div>
  </div>
);

const ImageViewModal = ({ images, initialIndex, onClose, likes, galleryId, onLike, isLiked, isAuthor, onDeleteImage, onDeleteGallery }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imageLoading, setImageLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  // Debug log
  console.log('🖼️ ImageViewModal - isAuthor:', isAuthor);

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    if (isLiking) return;
    
    setIsLiking(true);
    setShowHearts(true);
    
    try {
      await onLike(galleryId);
    } finally {
      setTimeout(() => {
        setIsLiking(false);
        setShowHearts(false);
      }, 800);
    }
  };

  useEffect(() => {
    setImageLoading(true);
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDeleteImage = async () => {
    if (!confirm('Delete this image? This action cannot be undone.')) return;
    
    setDeleteLoading(true);
    try {
      await onDeleteImage(galleryId, images[currentIndex]);
      // If it was the last image, close modal
      if (images.length === 1) {
        onClose();
      } else {
        // Move to next image or previous if at end
        if (currentIndex >= images.length - 1) {
          setCurrentIndex(0);
        }
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
      toast.error("Failed to delete image");
    } finally {
      setDeleteLoading(false);
      setShowMenu(false);
    }
  };

  const handleDeleteGallery = async () => {
    if (!confirm('Delete entire gallery? This will delete all images and cannot be undone.')) return;
    
    setDeleteLoading(true);
    try {
      await onDeleteGallery(galleryId);
      onClose();
    } catch (error) {
      console.error('Failed to delete gallery:', error);
      toast.error('Failed to delete gallery');
    } finally {
      setDeleteLoading(false);
      setShowMenu(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fadeIn">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition z-10"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Author Menu Button - Improved Design */}
      {isAuthor && (
        <div className="absolute top-4 right-20 z-20">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-black/70 backdrop-blur-md text-white rounded-full hover:bg-red-600 transition shadow-lg border border-white/20"
            title="Delete options"
          >
            <Trash2 className="w-5 h-5" />
            <span className="text-sm font-semibold">Delete</span>
          </button>

          {showMenu && (
            <div 
              className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl py-2 z-30 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase">Delete Options</p>
              </div>
              
              <button
                onClick={handleDeleteImage}
                disabled={deleteLoading}
                className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center text-gray-700 hover:text-red-600 transition-colors disabled:opacity-50 group"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-red-100 flex items-center justify-center mr-3 transition-colors">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Delete This Image</p>
                  <p className="text-xs text-gray-500">Remove current image only</p>
                </div>
              </button>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={handleDeleteGallery}
                disabled={deleteLoading}
                className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center text-gray-700 hover:text-red-600 transition-colors disabled:opacity-50 group"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-red-100 flex items-center justify-center mr-3 transition-colors">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Delete Entire Gallery</p>
                  <p className="text-xs text-gray-500">Remove all {images.length} images</p>
                </div>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {imageLoading && <ImageLoadingSpinner />}
        
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          onLoad={() => setImageLoading(false)}
          className={`max-h-full max-w-full object-contain transition-opacity duration-500 ${
            imageLoading ? 'opacity-0' : 'opacity-100 animate-scaleIn'
          }`}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition transform hover:scale-110"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition transform hover:scale-110"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        {/* Bottom Info Bar with Enhanced Like */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-full px-8 py-4 flex items-center gap-6">
          {images.length > 1 && (
            <span className="text-white font-semibold">
              {currentIndex + 1} / {images.length}
            </span>
          )}
          
          <button
            onClick={handleLikeClick}
            disabled={isLiking}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all transform disabled:cursor-not-allowed ${
              isLiked 
                ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-110 shadow-lg shadow-red-500/50' 
                : 'bg-white/20 text-white hover:bg-white/30 hover:scale-110'
            }`}
          >
            <Heart 
              className={`w-6 h-6 transition-all duration-300 ${
                isLiked ? 'fill-current' : ''
              } ${isLiking ? 'animate-bounce' : 'hover:scale-125'}`} 
            />
            <span className={`font-semibold text-lg transition-all duration-300 ${
              isLiking ? 'scale-125' : ''
            }`}>
              {likes}
            </span>
            
            {/* Burst Hearts Animation */}
            {showHearts && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <Heart 
                    key={i}
                    className="absolute top-1/2 left-1/2 w-4 h-4 text-red-400 fill-current animate-burstHeart opacity-0"
                    style={{ 
                      animationDelay: `${i * 50}ms`,
                      '--angle': `${i * 45}deg`
                    }}
                  />
                ))}
              </div>
            )}
          </button>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-md rounded-full px-4 py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-10' : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const GalleryCard = ({ gallery, onLike, isLiked, onImageClick, isAuthor, onDeleteGallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const [isLiking, setIsLiking] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  // Debug log
  console.log('🎴 GalleryCard - isAuthor:', isAuthor, 'galleryId:', gallery.galleryId);

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    if (isLiking) return;
    
    setIsLiking(true);
    setShowHearts(true);
    
    try {
      await onLike(gallery.galleryId);
    } finally {
      setTimeout(() => {
        setIsLiking(false);
        setShowHearts(false);
      }, 600);
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % gallery.images.length);
    setImageLoading(true);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + gallery.images.length) % gallery.images.length);
    setImageLoading(true);
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentIndex(index);
    setImageLoading(true);
  };

  const handleDeleteGallery = async (e) => {
    e.stopPropagation();
    if (!confirm('Delete this gallery? This will delete all images and cannot be undone.')) return;
    
    setDeleteLoading(true);
    try {
      await onDeleteGallery(gallery.galleryId);
    } catch (error) {
      console.error('Failed to delete gallery:', error);
      toast.error('Failed to delete gallery');
    } finally {
      setDeleteLoading(false);
      setShowMenu(false);
    }
  };

  return (
    <div
      onClick={() => onImageClick(gallery.galleryId, currentIndex)}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      style={{ height: Math.random() * 150 + 300 + 'px' }}
    >
      {/* Author Delete Menu - Only on Hover */}
      {isAuthor && (
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
            title="Delete gallery"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {showMenu && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDeleteGallery}
                disabled={deleteLoading}
                className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center text-red-600 font-semibold disabled:opacity-50"
              >
                {deleteLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600 mr-2"></div>
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                Delete Gallery
              </button>
            </div>
          )}
        </div>
      )}

      {/* Image */}
      <div className="relative w-full h-full">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="w-8 h-8 border-3 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={gallery.images[currentIndex]}
          alt={`Gallery ${gallery.galleryId}`}
          onLoad={() => setImageLoading(false)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100 group-hover:scale-110'
          }`}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Navigation Arrows (only show if multiple images) */}
        {gallery.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        {gallery.images.length > 1 && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {currentIndex + 1}/{gallery.images.length}
          </div>
        )}

        {/* Stats Overlay - Bottom with Enhanced Like Animation */}
        <div className="absolute bottom-3 left-3">
          <button
            onClick={handleLikeClick}
            disabled={isLiking}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md font-semibold text-sm shadow-lg transition-all transform hover:scale-110 disabled:cursor-not-allowed ${
              isLiked
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-white/90 text-gray-800 hover:bg-white hover:shadow-xl'
            }`}
          >
            <Heart 
              className={`w-4 h-4 transition-all duration-300 ${
                isLiked ? 'fill-current scale-110' : 'hover:scale-125'
              } ${isLiking ? 'animate-ping' : ''}`} 
            />
            <span className={`transition-all duration-300 ${isLiking ? 'scale-110' : ''}`}>
              {gallery.likes}
            </span>
            
            {/* Floating Hearts Animation */}
            {showHearts && (
              <>
                <Heart className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 text-red-500 fill-current animate-floatHeart opacity-0" style={{ animationDelay: '0ms' }} />
                <Heart className="absolute -top-6 left-1/3 w-3 h-3 text-red-400 fill-current animate-floatHeart opacity-0" style={{ animationDelay: '100ms' }} />
                <Heart className="absolute -top-6 left-2/3 w-3 h-3 text-pink-500 fill-current animate-floatHeart opacity-0" style={{ animationDelay: '50ms' }} />
              </>
            )}
          </button>
        </div>

        {/* Dot Indicators */}
        {gallery.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {gallery.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
                className={`rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-8 h-2'
                    : 'bg-white/60 hover:bg-white/90 w-2 h-2'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const GalleryUploadModal = ({ onClose, onSave }) => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setPreviews(previews.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      toast('Please upload at least one image');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress({ current: 0, total: images.length });

      const uploadPromises = images.map(async (file) => {
        const url = await uploadToCloudinary(file);
        setUploadProgress(prev => ({ ...prev, current: prev.current + 1 }));
        return url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      await onSave({ imageUrls });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images: ');
    } finally {
      setUploading(false);
      setUploadProgress({ current: 0, total: 0 });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Upload Photos</h2>
          <button 
            onClick={onClose} 
            disabled={uploading}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {uploading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-red-900">
                  Uploading images to Cloudinary...
                </span>
                <span className="text-sm font-bold text-red-600">
                  {uploadProgress.current} / {uploadProgress.total}
                </span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-red-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-red-500 transition-all hover:bg-red-50/50">
            <input
              type="file"
              id="gallery-images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
            <label htmlFor="gallery-images" className={`cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-bold text-lg mb-2">
                Click to upload photos
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, WEBP • Multiple files supported
              </p>
            </label>
          </div>

          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group aspect-square">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    disabled={uploading}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition transform hover:scale-110 disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-bold">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              disabled={uploading}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={uploading || images.length === 0}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {uploading 
                ? `Uploading ${uploadProgress.current}/${uploadProgress.total}...` 
                : `Upload ${images.length} ${images.length === 1 ? 'Photo' : 'Photos'}`
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GallerySection = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedGalleries, setLikedGalleries] = useState([]);
    const { user } = useAuth();
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
          const [showSignInModal, setShowSignInModal] = useState(false);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAuthor, setIsAuthor] = useState(false);

  // Check if user is author
  useEffect(() => {
    const checkAuthorStatus = async () => {
      try {
        const response = await api.isAuthor();
        console.log('🔍 Author check response:', response);
        // Backend returns boolean directly, not { isAuthor: true }
        setIsAuthor(response === true);
      } catch (error) {
        console.error('❌ Failed to check author status:', error);
        setIsAuthor(false); // Set to false if API fails
      }
    };
    checkAuthorStatus();
  }, []);

  // Debug log
  useEffect(() => {
    console.log('👤 isAuthor state:', isAuthor);
  }, [isAuthor]);

  useEffect(() => {
    loadGalleries();
  }, []);

  const loadGalleries = async () => {
    try {
      setLoading(true);
      const data = await api.getAllGalleries();
      setGalleries(data);
    } catch (err) {
      console.error('Failed to load galleries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (galleryId) => {
    try {
     if (!user) {
    setShowSignInModal(true);
    return;
  }
      await api.likeGallery(galleryId);
      setLikedGalleries(prev =>
        prev.includes(galleryId)
          ? prev.filter(id => id !== galleryId)
          : [...prev, galleryId]
      );
      
      setGalleries(prev =>
        prev.map(g =>
          g.galleryId === galleryId
            ? { ...g, likes: g.likes + (likedGalleries.includes(galleryId) ? -1 : 1) }
            : g
        )
      );
    } catch (error) {
      console.error('Failed to like gallery:', error);
    }
  };

  const handleImageClick = (galleryId, imageIndex) => {
    const gallery = galleries.find(g => g.galleryId === galleryId);
    setSelectedGallery(gallery);
    setSelectedImageIndex(imageIndex);
  };

  const handleDeleteGallery = async (galleryId) => {
    try {
      await api.deleteGallery(galleryId);
      setGalleries(prev => prev.filter(g => g.galleryId !== galleryId));
      toast.success('Gallery deleted successfully');
    } catch (error) {
      console.error('Failed to delete gallery:', error);
      throw error;
    }
  };

  const handleDeleteImage = async (galleryId, imageUrl) => {
    try {
      await api.deleteGalleryImage(galleryId, imageUrl);
      
      // Update local state
      setGalleries(prev => prev.map(g => {
        if (g.galleryId === galleryId) {
          const updatedImages = g.images.filter(img => img !== imageUrl);
          // If no images left, remove gallery
          if (updatedImages.length === 0) {
            return null;
          }
          return { ...g, images: updatedImages };
        }
        return g;
      }).filter(Boolean));

      // Update selected gallery if open
      if (selectedGallery && selectedGallery.galleryId === galleryId) {
        const updatedImages = selectedGallery.images.filter(img => img !== imageUrl);
        if (updatedImages.length === 0) {
          setSelectedGallery(null);
        } else {
          setSelectedGallery({ ...selectedGallery, images: updatedImages });
        }
      }

      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Failed to delete image:', error);
      throw error;
    }
  };

  const handleSaveGallery = async (formData) => {
    try {
      await api.createGallery(formData.imageUrls);
      toast.success('Photos uploaded successfully!');
      setShowUploadModal(false);
      loadGalleries();
    } catch (error) {
      console.error('Failed to save gallery:', error);
      toast.error('Failed to save gallery: ' );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-red-200 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border-4 border-red-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="text-gray-600 font-semibold">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Photo Gallery
              </h1>
              <p className="text-xl text-red-100">
                Beautiful moments captured from Nepal
              </p>
            </div>
            {isAuthor && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-white text-red-600 px-6 py-3 rounded-xl hover:bg-red-50 transition flex items-center font-semibold shadow-lg transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Upload
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pinterest-style Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {galleries.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {galleries.map((gallery) => (
              <div key={gallery.galleryId} className="break-inside-avoid">
                <GalleryCard
                  gallery={gallery}
                  onLike={handleLike}
                  isLiked={likedGalleries.includes(gallery.galleryId)}
                  onImageClick={handleImageClick}
                  isAuthor={isAuthor}
                  onDeleteGallery={handleDeleteGallery}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl p-12 max-w-md mx-auto shadow-xl">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Photos Yet</h3>
              <p className="text-gray-600 mb-6">Start sharing your moments</p>
              {isAuthor && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition font-semibold inline-flex items-center shadow-lg transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Upload First Photo
                </button>
              )}
            </div>
          </div>
        )}
      </div>


      

      {/* Modals */}
      {showUploadModal && (
        <GalleryUploadModal
          onClose={() => setShowUploadModal(false)}
          onSave={handleSaveGallery}
        />
      )}

      
              {/* Sign In Modal */}
            {showSignInModal && (
              <div
                className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/30 backdrop-blur-sm transition-all duration-300 animate-fadeIn"
                onClick={() => setShowSignInModal(false)}
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative transform transition-all duration-300 animate-slideUp"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setShowSignInModal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:rotate-90 hover:scale-110"
                  >
                    <X className="w-6 h-6" />
                  </button>
      
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full mb-4 shadow-lg">
                      <Newspaper className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Welcome to IDS News Nepal
                    </h2>
                    <p className="text-gray-600">Sign in to access all features</p>
                  </div>
      
                  <GoogleSignIn onSuccess={() => setShowSignInModal(false)} />
                </div>
              </div>
            )}
      


      {selectedGallery && (
        <ImageViewModal
          images={selectedGallery.images}
          initialIndex={selectedImageIndex}
          likes={selectedGallery.likes}
          galleryId={selectedGallery.galleryId}
          onLike={handleLike}
          isLiked={likedGalleries.includes(selectedGallery.galleryId)}
          onClose={() => setSelectedGallery(null)}
          isAuthor={isAuthor}
          onDeleteImage={handleDeleteImage}
          onDeleteGallery={handleDeleteGallery}
        />
      )}
    </div>
  );
};

// Add these animations to your global CSS or Tailwind config
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes floatHeart {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-40px) scale(1.5);
    }
  }
  @keyframes burstHeart {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(
        calc(-50% + cos(var(--angle, 0deg)) * 60px),
        calc(-50% + sin(var(--angle, 0deg)) * 60px)
      ) scale(1.5) rotate(360deg);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  .animate-scaleIn {
    animation: scaleIn 0.4s ease-out;
  }
  .animate-floatHeart {
    animation: floatHeart 0.8s ease-out forwards;
  }
  .animate-burstHeart {
    animation: burstHeart 0.8s ease-out forwards;
  }
`;
document.head.appendChild(style);