import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import ServiceModal from '../../components/admin/ServiceModal';
import { servicesAPI, portfolioAPI, bookingAPI } from '../../utils/api';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalServices: 0,
    totalPortfolio: 0,
    totalBookings: 0,
    recentActivity: []
  });
  const [services, setServices] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serviceLoading, setServiceLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData && userData !== 'undefined') {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('adminUser');
      }
    }
    
    // Fetch dashboard stats and services
    fetchDashboardStats();
    fetchServices();

    // Auto-refresh dashboard data every 60 seconds
    const interval = setInterval(() => {
      fetchDashboardStats();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch real data from APIs
      const [servicesRes, portfolioRes, bookingsRes] = await Promise.all([
        servicesAPI.getAll().catch(() => ({ data: [] })),
        portfolioAPI.getAll().catch(() => ({ data: [] })),
        bookingAPI.getAll().catch(() => ({ data: [] }))
      ]);

      const bookings = bookingsRes.data || [];
      const services = servicesRes.data || [];
      const portfolio = portfolioRes.data || [];

      // Calculate booking statistics
      const pendingBookings = bookings.filter(b => b.status === 'pending').length;
      const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
      const completedBookings = bookings.filter(b => b.status === 'completed').length;

      // Create recent activity from real data
      const recentActivity = [];
      
      // Add recent bookings
      const recentBookings = bookings
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3);
      
      recentBookings.forEach(booking => {
        const timeAgo = getTimeAgo(new Date(booking.created_at));
        recentActivity.push({
          id: `booking_${booking.id}`,
          action: `New booking from ${booking.name}`,
          time: timeAgo,
          type: 'booking'
        });
      });

      // Add recent services
      const recentServices = services
        .sort((a, b) => new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now()))
        .slice(0, 2);
      
      recentServices.forEach(service => {
        const timeAgo = getTimeAgo(new Date(service.created_at || Date.now()));
        recentActivity.push({
          id: `service_${service.id}`,
          action: `Service "${service.title}" updated`,
          time: timeAgo,
          type: 'service'
        });
      });

      setStats({
        totalServices: services.length,
        totalPortfolio: portfolio.length,
        totalBookings: bookings.length,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        recentActivity: recentActivity.slice(0, 5) // Show only 5 most recent
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to calculate time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const fetchServices = async () => {
    try {
      setServiceLoading(true);
      const response = await servicesAPI.getAll();
      setServices(response.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setServiceLoading(false);
    }
  };

  const handleCreateService = () => {
    setEditingService(null);
    setShowServiceModal(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowServiceModal(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await servicesAPI.remove(serviceId);
        fetchServices(); // Refresh services
        fetchDashboardStats(); // Refresh stats
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service');
      }
    }
  };

  const handleServiceSubmit = async (serviceData) => {
    try {
      if (editingService) {
        await servicesAPI.update(editingService.id, serviceData);
      } else {
        await servicesAPI.create(serviceData);
      }
      setShowServiceModal(false);
      fetchServices(); // Refresh services
      fetchDashboardStats(); // Refresh stats
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service');
    }
  };

  const quickActions = [
    {
      title: 'Manage Services',
      description: 'Add, edit, or remove services',
      icon: '🛠️',
      path: '/admin/services',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Portfolio Management',
      description: 'Manage portfolio projects',
      icon: '📸',
      path: '/admin/portfolio',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'View Bookings',
      description: 'Check recent bookings',
      icon: '📅',
      path: '/admin/bookings',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Analytics',
      description: 'View performance metrics',
      icon: '📊',
      path: '/admin/analytics',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const statCards = [
    {
      title: 'Total Services',
      value: stats.totalServices,
      icon: '🛠️',
      color: 'from-blue-500 to-blue-600',
      change: `${stats.totalServices} active`
    },
    {
      title: 'Portfolio Items',
      value: stats.totalPortfolio,
      icon: '📸',
      color: 'from-purple-500 to-purple-600',
      change: `${stats.totalPortfolio} projects`
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: '📅',
      color: 'from-green-500 to-green-600',
      change: `${stats.pendingBookings || 0} pending`
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings || 0,
      icon: '⏳',
      color: 'from-orange-500 to-orange-600',
      change: `${stats.confirmedBookings || 0} confirmed`
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || 'Admin'}! 👋
          </h1>
          <p className="text-purple-100">
            Here's what's happening with your CineCraft Media business today.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                  {stat.icon}
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={() => navigate(action.path)}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer group hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
            <button
              onClick={handleCreateService}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + Add Service
            </button>
          </div>
          
          {serviceLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-600 font-medium">${service.price}</span>
                    <span className="text-gray-500 text-sm">{service.duration}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditService(service)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
              
              {services.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No services found. Click "Add Service" to create your first service.
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {stats.recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    activity.type === 'booking' ? 'bg-green-500' :
                    activity.type === 'portfolio' ? 'bg-purple-500' :
                    activity.type === 'service' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}>
                    {activity.type === 'booking' ? '📅' :
                     activity.type === 'portfolio' ? '📸' :
                     activity.type === 'service' ? '🛠️' : '📋'}
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Service Modal */}
      {showServiceModal && (
        <ServiceModal
          service={editingService}
          onClose={() => setShowServiceModal(false)}
          onSubmit={handleServiceSubmit}
        />
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
