import api from '../utils/api';

const bookingsAPI = {
  // Get all bookings (public access) - GET /api/bookings
  getAll: async () => {
    try {
      const response = await api.get('/api/bookings');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get booking by ID - GET /api/bookings/:id
  getById: async (id) => {
    try {
      const response = await api.get(`/api/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  // Create new booking - POST /api/bookings
  create: async (bookingData) => {
    try {
      const response = await api.post('/api/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Update booking status - PATCH /api/bookings/:id/status
  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/api/bookings/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },

  // Update booking (full update) - PUT /api/bookings/:id
  update: async (id, bookingData) => {
    try {
      const response = await api.put(`/api/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  // Confirm booking - PATCH /api/bookings/:id/confirm
  confirm: async (id) => {
    try {
      const response = await api.patch(`/api/bookings/${id}/confirm`);
      return response.data;
    } catch (error) {
      console.error('Error confirming booking:', error);
      throw error;
    }
  },

  // Cancel/Delete booking - DELETE /api/bookings/:id
  cancel: async (id) => {
    try {
      const response = await api.delete(`/api/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error canceling booking:', error);
      throw error;
    }
  },

  // Delete booking (alias for cancel)
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  },

  // Get bookings by status - GET /api/bookings/status/:status
  getByStatus: async (status) => {
    try {
      const response = await api.get(`/api/bookings/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings by status:', error);
      throw error;
    }
  },

  // Get bookings statistics - GET /api/bookings/stats
  getStats: async () => {
    try {
      const response = await api.get('/api/bookings/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching booking stats:', error);
      throw error;
    }
  },

  // Get user's bookings - GET /api/bookings/user/bookings
  getUserBookings: async () => {
    try {
      const response = await api.get('/api/bookings/user/bookings');
      return response.data;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  }
};

export default bookingsAPI;
