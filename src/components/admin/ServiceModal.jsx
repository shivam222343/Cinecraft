import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import servicesAPI from '../../services/servicesAPI';
import { servicesAPI as apiServicesAPI, uploadToCloudinary } from '../../utils/api';
import { validateFileType, validateFileSize, isImage, isDocument, getFileIcon } from '../../utils/fileUtils';

const ServiceModal = ({ service, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: 'photography',
    image: '',
    features: []
  });
  const [newFeature, setNewFeature] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        description: service.description || '',
        price: service.price || '',
        duration: service.duration || '',
        category: service.category || 'photography',
        image: service.image || '',
        features: service.features || []
      });
      setImagePreview(service.image || '');
    }
  }, [service]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const typeValidation = validateFileType(file);
      const sizeValidation = validateFileSize(file);
      
      if (!typeValidation.isValid) {
        alert(typeValidation.error);
        return;
      }
      
      if (!sizeValidation.isValid) {
        alert(sizeValidation.error);
        return;
      }
      
      setImageFile(file);
      
      // Show preview for images, icon for documents
      if (isImage(file.name)) {
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
      
      // Use the general upload endpoint for better compatibility
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Upload response:', data); // Debug log
      
      if (data.success && data.url) {
        setFormData(prev => ({
          ...prev,
          image: data.url
        }));
        setImageFile(null);
        // Keep the preview for images, update for documents
        if (isImage(imageFile.name)) {
          setImagePreview(data.url);
        } else {
          setImagePreview('document');
        }
      } else {
        throw new Error(data.message || 'Upload failed - no URL returned');
      }
    } catch (error) {
      console.error('Direct upload failed, trying servicesAPI:', error);
      
      // Fallback to servicesAPI upload method
      try {
        const response = await apiServicesAPI.uploadImage(imageFile);
        console.log('ServicesAPI upload response:', response); // Debug log
        
        if (response.success && response.data?.url) {
          setFormData(prev => ({
            ...prev,
            image: response.data.url
          }));
          setImageFile(null);
          if (isImage(imageFile.name)) {
            setImagePreview(response.data.url);
          } else {
            setImagePreview('document');
          }
        } else {
          throw new Error(response.message || 'ServicesAPI upload failed');
        }
      } catch (fallbackError) {
        console.error('ServicesAPI failed, trying Cloudinary direct:', fallbackError);
        
        // Final fallback to Cloudinary direct upload
        try {
          const cloudinaryResponse = await uploadToCloudinary(imageFile);
          console.log('Cloudinary upload response:', cloudinaryResponse); // Debug log
          
          if (cloudinaryResponse.success && cloudinaryResponse.url) {
            setFormData(prev => ({
              ...prev,
              image: cloudinaryResponse.url
            }));
            setImageFile(null);
            if (isImage(imageFile.name)) {
              setImagePreview(cloudinaryResponse.url);
            } else {
              setImagePreview('document');
            }
          } else {
            throw new Error('Cloudinary upload failed');
          }
        } catch (cloudinaryError) {
          console.error('All upload methods failed:', cloudinaryError);
          alert(`Failed to upload file: ${cloudinaryError.message}`);
        }
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price) || 0
      };
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting service:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'photography', label: 'Photography' },
    { value: 'videography', label: 'Videography' },
    { value: 'editing', label: 'Editing' },
    { value: 'drone', label: 'Drone Services' },
    { value: 'event', label: 'Event Coverage' },
    { value: 'commercial', label: 'Commercial' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {service ? 'Edit Service' : 'Add New Service'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Wedding Photography"
            />
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
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your service..."
            />
          </div>

          {/* Price and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2-4 hours"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Image or Document
            </label>
            
            {/* File Preview */}
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
                ) : (
                  <img
                    src={imagePreview}
                    alt="Service preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('');
                    setImageFile(null);
                    setFormData(prev => ({ ...prev, image: '' }));
                  }}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
                >
                  ×
                </button>
              </div>
            )}
            
            {/* Enhanced File Upload */}
            <div className="space-y-3">
              {!imagePreview && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="text-gray-600">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500 font-medium">Click to upload</span>
                        <span> or drag and drop</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Images: PNG, JPG, GIF | Documents: PDF, DOC, DOCX, TXT | Max: 10MB</p>
                    </div>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              )}
              
              {imageFile && !formData.image && (
                <button
                  type="button"
                  onClick={handleUploadImage}
                  disabled={uploadingImage}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
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

              {formData.image && (
                <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-700 font-medium">File uploaded successfully!</span>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm">
                    {feature}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a feature..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Saving...' : service ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ServiceModal;
