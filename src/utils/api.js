import axios from 'axios';

// API base URL - will be replaced with actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Booking API endpoints
export const bookingAPI = {
  // Submit a new booking
  submit: async (bookingData) => {
    try {
      // Map service names to IDs based on database
      const serviceMapping = {
        'photography': 1,
        'videography': 2, 
        'vfx': 3,
        'graphic-design': 1, // Map to photography for now
        'cinematography': 2, // Map to videography
        'commercial-drone': 2, // Map to videography
        'fpv-drones': 2, // Map to videography
        'post-production': 3, // Map to VFX
        'broadcasting': 2 // Map to videography
      };

      const payload = {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        date: bookingData.date,
        time: bookingData.time,
        message: bookingData.message,
        image: bookingData.image || null, // Include uploaded file URL
        service_id: bookingData.service_id || serviceMapping[bookingData.service] || null,
        user_id: null
      };
      const response = await api.post('/api/bookings', payload);
      return response.data;
    } catch (error) {
      console.error('Booking submission error:', error);
      throw new Error(error.response?.data?.message || 'Failed to submit booking. Please try again.');
    }
  },

  // Get all bookings (admin only)
  getAll: async () => {
    try {
      const response = await api.get('/api/bookings');
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get booking by ID
  getById: async (id) => {
    try {
      // Mock implementation
      const { sampleBookings } = await import('../data/bookings.js');
      const booking = sampleBookings.find(b => b.id === parseInt(id));
      
      if (!booking) {
        throw new Error('Booking not found');
      }
      
      return {
        success: true,
        data: booking
      };
      
      // Actual API call would be:
      // const response = await api.get(`/api/bookings/${id}`);
      // return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  // Update booking status
  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/api/bookings/${id}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },
  // Delete booking
  remove: async (id) => {
    try {
      const response = await api.delete(`/api/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  },

  // Get booking statistics
  getStats: async () => {
    try {
      const response = await api.get('/api/bookings/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching booking stats:', error);
      throw error;
    }
  },

  // Get bookings by status
  getByStatus: async (status) => {
    try {
      const response = await api.get(`/api/bookings/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings by status:', error);
      throw error;
    }
  }
};

// Portfolio API endpoints
export const portfolioAPI = {
  // Get all portfolio items
  getAll: async () => {
    try {
      const response = await api.get('/api/portfolio');
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw error;
    }
  },
  
  // Get portfolio by category
  getByCategory: async (category) => {
    try {
      const response = await api.get(`/api/portfolio/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio by category:', error);
      throw error;
    }
  },
  
  // Get portfolio by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/portfolio/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio item:', error);
      throw error;
    }
  },

  // Create portfolio item
  create: async (portfolioData) => {
    try {
      const response = await api.post('/api/portfolio', portfolioData);
      return response.data;
    } catch (error) {
      console.error('Error creating portfolio item:', error);
      throw error;
    }
  },

  // Update portfolio item
  update: async (id, portfolioData) => {
    try {
      const response = await api.put(`/api/portfolio/${id}`, portfolioData);
      return response.data;
    } catch (error) {
      console.error('Error updating portfolio item:', error);
      throw error;
    }
  },

  // Delete portfolio item
  remove: async (id) => {
    try {
      const response = await api.delete(`/api/portfolio/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      throw error;
    }
  },

  // Upload portfolio image
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/api/portfolio/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading portfolio image:', error);
      throw error;
    }
  }
};

// Services API endpoints
export const servicesAPI = {
  // Get all services
  getAll: async () => {
    try {
      const response = await api.get('/api/services');
      return response.data;
    } catch (error) {
      console.error('Error fetching services by category:', error);
      throw error;
    }
  },
  
  // Create service
  create: async (payload) => {
    try {
      const response = await api.post('/api/services', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },
  
  // Update service
  update: async (id, payload) => {
    try {
      const response = await api.put(`/api/services/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },
  
  // Delete service
  remove: async (id) => {
    try {
      const response = await api.delete(`/api/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  },

  // Upload service image
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/api/services/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Get services by category
  getByCategory: async (category) => {
    try {
      const response = await api.get(`/api/services/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching services by category:', error);
      throw error;
    }
  }
};

// Content API endpoints (hero/about/contact blocks)
export const contentAPI = {
  get: async () => {
    try {
      const response = await api.get('/api/content');
      return response.data;
    } catch (error) {
      console.error('Error fetching content blocks:', error);
      throw error;
    }
  },
  update: async (payload) => {
    try {
      const response = await api.put('/api/content', payload);
      return response.data;
    } catch (error) {
      console.error('Error updating content blocks:', error);
      throw error;
    }
  }
};

// Admin API endpoints
export const adminAPI = {
  // Admin signup/register
  register: async (payload) => {
    try {
      const response = await api.post('/api/auth/register', payload);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },
  // Admin login
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Get dashboard stats
  getStats: async () => {
    try {
      // Mock stats
      return {
        success: true,
        data: {
          totalBookings: 15,
          pendingBookings: 5,
          confirmedBookings: 8,
          completedBookings: 2,
          totalRevenue: 45000,
          monthlyRevenue: 12000
        }
      };
      
      // Actual API call would be:
      // const response = await api.get('/api/admin/stats');
      // return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
};

// Cloudinary upload utility
export const uploadToCloudinary = async (file) => {
  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration missing');
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const data = await response.json();
    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// Feedback API endpoints
export const feedbackAPI = {
  // Public endpoints
  create: async (feedbackData) => {
    try {
      const response = await api.post('/api/feedback', feedbackData);
      return response.data;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw error;
    }
  },

  getApproved: async (limit = 10) => {
    try {
      const response = await api.get(`/api/feedback/approved?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching approved feedback:', error);
      throw error;
    }
  },

  getStats: async () => {
    try {
      const response = await api.get('/api/feedback/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching feedback stats:', error);
      throw error;
    }
  },

  getByCategory: async (category, limit = 10) => {
    try {
      const response = await api.get(`/api/feedback/category/${category}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category feedback:', error);
      throw error;
    }
  },

  // Admin endpoints
  getAll: async (limit = 50, offset = 0, status = null) => {
    try {
      let url = `/api/feedback?limit=${limit}&offset=${offset}`;
      if (status) url += `&status=${status}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching all feedback:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/feedback/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feedback by ID:', error);
      throw error;
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/api/feedback/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating feedback status:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/feedback/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting feedback:', error);
      throw error;
    }
  }
};

// Convenience function for booking submission
export const submitBooking = async (bookingData) => {
  return await bookingAPI.submit(bookingData);
};

export default api;
