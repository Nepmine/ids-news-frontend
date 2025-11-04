import React, { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, X, Upload, Heart } from 'lucide-react';
import { uploadToCloudinary } from '../services/cloudinary';
import  {api}  from '../services/api';




const ImageLoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-pulse"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-600 rounded-full animate-spin border-t-transparent"></div>
    </div>
  </div>
);

const ImageViewModal = ({ images, initialIndex, onClose, likes, galleryId, onLike, isLiked }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imageLoading, setImageLoading] = useState(true);

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

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fadeIn">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition z-10"
      >
        <X className="w-8 h-8" />
      </button>

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

        {/* Bottom Info Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-full px-8 py-4 flex items-center gap-6">
          {images.length > 1 && (
            <span className="text-white font-semibold">
              {currentIndex + 1} / {images.length}
            </span>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(galleryId);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
              isLiked ? 'bg-red-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-semibold">{likes}</span>
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

const GalleryCard = ({ gallery, onLike, isLiked, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

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

  return (
    <div
      onClick={() => onImageClick(gallery.galleryId, currentIndex)}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      style={{ height: Math.random() * 150 + 300 + 'px' }}
    >
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
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {currentIndex + 1}/{gallery.images.length}
          </div>
        )}

        {/* Stats Overlay - Bottom */}
        <div className="absolute bottom-3 left-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(gallery.galleryId);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md font-semibold text-sm shadow-lg transition-all transform hover:scale-110 ${
              isLiked
                ? 'bg-red-600 text-white'
                : 'bg-white/90 text-gray-800 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{gallery.likes}</span>
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
      alert('Please upload at least one image');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress({ current: 0, total: images.length });

      // Upload all images to Cloudinary using imported function
      const uploadPromises = images.map(async (file) => {
        const url = await uploadToCloudinary(file);
        setUploadProgress(prev => ({ ...prev, current: prev.current + 1 }));
        return url;
      });

      const imageUrls = await Promise.all(uploadPromises);

      // Pass the URLs to the save handler
      await onSave({ imageUrls });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images: ' + error.message);
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
          {/* Upload Progress */}
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
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const isAuthor = true;

  useEffect(() => {
    loadGalleries();
  }, []);

  const loadGalleries = async () => {
    try {
      setLoading(true);
      const data = await api.getAllGalleries();
      console.log("the dtat",data);
      setGalleries(data);
    } catch (err) {
      console.error('Failed to load galleries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (galleryId) => {
    try {
      await mockApi.likeGallery(galleryId);
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

 const handleSaveGallery = async (formData) => {
  try {
    // formData.imageUrls should be an array of image URLs
    console.log('Saving images:', formData.imageUrls);

    // Call the backend API using your service
    await api.createGallery(formData.imageUrls);

    alert('Photos uploaded successfully!');
    setShowUploadModal(false);

    // Refresh gallery list after successful upload
    loadGalleries();
  } catch (error) {
    console.error('Failed to save gallery:', error);
    alert('Failed to save gallery: ' + error.message);
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

      {selectedGallery && (
        <ImageViewModal
          images={selectedGallery.images}
          initialIndex={selectedImageIndex}
          likes={selectedGallery.likes}
          galleryId={selectedGallery.galleryId}
          onLike={handleLike}
          isLiked={likedGalleries.includes(selectedGallery.galleryId)}
          onClose={() => setSelectedGallery(null)}
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
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  .animate-scaleIn {
    animation: scaleIn 0.4s ease-out;
  }
`;
document.head.appendChild(style);