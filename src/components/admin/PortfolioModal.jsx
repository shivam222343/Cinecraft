import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioAPI } from '../../utils/api';
import { validateFileType, validateFileSize, isImage, isVideo, getFileIcon } from '../../utils/fileUtils';

const PortfolioModal = ({ isOpen, onClose, portfolio, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'photography',
    client: '',
    date: '',
    location: '',
    tags: '',
    featured: false,
    status: 'published',
    media_url: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Domain categories from home page
  const categories = [
    { value: 'photography', label: 'Photography', icon: '📸' },
    { value: 'videography', label: 'Videography', icon: '🎬' },
    { value: 'cinematography', label: 'Cinematography', icon: '🎭' },
    { value: 'drone-services', label: 'Drone Services', icon: '🚁' },
    { value: 'vfx-post', label: 'VFX & Post Production', icon: '✨' },
    { value: 'commercial', label: 'Commercial Production', icon: '🎯' }
  ];

  const statusOptions = [
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'private', label: 'Private' }
  ];

  useEffect(() => {
    if (portfolio) {
      setFormData({
        title: portfolio.title || '',
        description: portfolio.description || '',
        category: portfolio.category || 'photography',
        client: portfolio.client || '',
        date: portfolio.date || '',
        location: portfolio.location || '',
        tags: Array.isArray(portfolio.tags) ? portfolio.tags.join(', ') : (portfolio.tags || ''),
        featured: portfolio.featured || false,
        status: portfolio.status || 'published',
        media_url: portfolio.media_url || ''
      });
      setImagePreview(portfolio.media_url || '');
    } else {
      // Reset form for new portfolio item
      setFormData({
        title: '',
        description: '',
        category: 'photography',
        client: '',
        date: '',
        location: '',
        tags: '',
        featured: false,
        status: 'published',
        media_url: ''
      });
      setImagePreview('');
      setImageFile(null);
    }
  }, [portfolio]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size (50MB for videos, 10MB for others)
      const typeValidation = validateFileType(file);
      const maxSize = isVideo(file.name) ? 50 : 10; // 50MB for videos, 10MB for others
      const sizeValidation = validateFileSize(file, maxSize);
      
      if (!typeValidation.isValid) {
        alert(typeValidation.error);
        return;
      }
      
      if (!sizeValidation.isValid) {
        alert(sizeValidation.error);
        return;
      }
      
      setImageFile(file);
      
      // Show preview for images, video player for videos, icon for documents
      if (isImage(file.name)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (isVideo(file.name)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // For documents, show file icon
        setImagePreview('document');
      }
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;

    try {
      setUploadingImage(true);
      
      const response = await portfolioAPI.uploadImage(imageFile);
      console.log('Upload response:', response);
      
      if (response.success && response.url) {
        setFormData(prev => ({
          ...prev,
          media_url: response.url
        }));
        setImageFile(null);
        // Keep the preview for images, update for documents
        if (isImage(imageFile.name)) {
          setImagePreview(response.url);
        } else {
          setImagePreview('document');
        }
      } else {
        throw new Error(response.message || 'Upload failed - no URL returned');
      }
    } catch (error) {
      console.error('File upload failed:', error);
      alert(`Failed to upload file: ${error.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    try {
      setLoading(true);
      
      const portfolioData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        date: formData.date || null,
        client: formData.client || null,
        location: formData.location || null
      };

      if (portfolio) {
        // Update existing portfolio
        await portfolioAPI.update(portfolio.id, portfolioData);
      } else {
        // Create new portfolio
        await portfolioAPI.create(portfolioData);
      }
      
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Failed to save portfolio item');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {portfolio ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter portfolio title"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Client name"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Project location"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe the portfolio item..."
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter tags separated by commas (e.g., wedding, portrait, outdoor)"
              />
              <p className="text-sm text-gray-500 mt-1">Separate multiple tags with commas</p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio Image or Media
              </label>
              
              {/* Media Preview */}
              {imagePreview && (
                <div className="mb-4 relative">
                  {imagePreview === 'document' ? (
                    <div className="w-full h-48 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <div className="text-6xl mb-2">
                          {getFileIcon(imageFile?.name || '')}
                        </div>
                        <p className="text-sm text-gray-600">{imageFile?.name}</p>
                        <p className="text-xs text-gray-500">
                          {imageFile && `${(imageFile.size / 1024 / 1024).toFixed(2)} MB`}
                        </p>
                      </div>
                    </div>
                  ) : isVideo(imageFile?.name || '') ? (
                    <video
                      src={imagePreview}
                      controls
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={imagePreview}
                      alt="Portfolio preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setImageFile(null);
                      setFormData(prev => ({ ...prev, media_url: '' }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
                  >
                    ×
                  </button>
                </div>
              )}

              {!formData.media_url && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="text-gray-600">
                      <label htmlFor="portfolio-upload" className="cursor-pointer">
                        <span className="text-purple-600 hover:text-purple-500 font-medium">Click to upload</span>
                        <span> or drag and drop</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Images: PNG, JPG, GIF, WebP | Videos: MP4, MOV, AVI, MKV, WebM, M4V (Max: 50MB) | Documents: PDF, DOC, DOCX, TXT (Max: 10MB)</p>
                    </div>
                  </div>
                  <input
                    id="portfolio-upload"
                    type="file"
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              )}
              
              {imageFile && !formData.media_url && (
                <button
                  type="button"
                  onClick={handleUploadImage}
                  disabled={uploadingImage}
                  className="mt-4 w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {uploadingImage ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Uploading to Cloudinary...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>Upload File</span>
                    </div>
                  )}
                </button>
              )}

              {formData.media_url && (
                <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-700 font-medium">File uploaded successfully!</span>
                </div>
              )}
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
                Mark as featured portfolio item
              </label>
            </div>
          </form>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>{portfolio ? 'Updating...' : 'Creating...'}</span>
                </div>
              ) : (
                portfolio ? 'Update Portfolio' : 'Create Portfolio'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PortfolioModal;
