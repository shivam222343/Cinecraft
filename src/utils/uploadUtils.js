import api from './api';

// Upload single file to backend (which uses Cloudinary)
export const uploadFile = async (file, onProgress = null) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    // Add progress tracking if callback provided
    if (onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      };
    }

    const response = await api.post('/api/upload/single', formData, config);
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(error.response?.data?.message || 'Upload failed');
  }
};

// Upload multiple files
export const uploadMultipleFiles = async (files, onProgress = null) => {
  try {
    const formData = new FormData();
    
    // Append each file to FormData
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      };
    }

    const response = await api.post('/api/upload/multiple', formData, config);
    return response.data;
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw new Error(error.response?.data?.message || 'Upload failed');
  }
};

// Delete file from Cloudinary
export const deleteFile = async (publicId) => {
  try {
    const response = await api.delete(`/api/upload/${publicId}`);
    return response.data;
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error(error.response?.data?.message || 'Delete failed');
  }
};

// Validate file type and size
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 50 * 1024 * 1024, // 50MB default
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'video/mov', 'video/avi', 'video/webm']
  } = options;

  // Check file size
  if (file.size > maxSize) {
    throw new Error(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
  }

  return true;
};

// Get file preview URL
export const getFilePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Format file size for display
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
