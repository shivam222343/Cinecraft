import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import PortfolioModal from '../../components/admin/PortfolioModal';
import { portfolioAPI } from '../../utils/api';

const PortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Domain categories from home page
  const categories = [
    { value: 'all', label: 'All Categories', icon: '📋' },
    { value: 'photography', label: 'Photography', icon: '📸' },
    { value: 'videography', label: 'Videography', icon: '🎬' },
    { value: 'cinematography', label: 'Cinematography', icon: '🎭' },
    { value: 'drone-services', label: 'Drone Services', icon: '🚁' },
    { value: 'vfx-post', label: 'VFX & Post Production', icon: '✨' },
    { value: 'commercial', label: 'Commercial Production', icon: '🎯' }
  ];

  const statusOptions = [
    { value: 'published', label: 'Published', color: 'green' },
    { value: 'draft', label: 'Draft', color: 'yellow' },
    { value: 'private', label: 'Private', color: 'gray' }
  ];

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getAll();
      setPortfolioItems(response.data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      await portfolioAPI.remove(id);
      await fetchPortfolio();
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      alert('Error deleting portfolio item. Please try again.');
    }
  };

  const handleModalSubmit = async () => {
    await fetchPortfolio();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find(s => s.value === status);
    return statusObj?.color || 'gray';
  };

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(c => c.value === category);
    return categoryObj?.icon || '📋';
  };

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  if (loading && portfolioItems.length === 0) {
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
            <p className="text-gray-600 mt-2">Showcase your best work across all domains</p>
          </div>
          <motion.button
            onClick={handleAddNew}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
          >
            + Add Portfolio Item
          </motion.button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category.icon} {category.label}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-r from-purple-400 to-blue-400 overflow-hidden">
                {item.media_url ? (
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-4xl">${getCategoryIcon(item.category)}</div>`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                    {getCategoryIcon(item.category)}
                  </div>
                )}
                
                {/* Overlay with status and featured badge */}
                <div className="absolute top-3 left-3 flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'published' ? 'bg-green-100 text-green-800' :
                    item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                  {item.featured && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                    {categories.find(cat => cat.value === item.category)?.label}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                
                {/* Project Details */}
                <div className="space-y-2 mb-4">
                  {item.client && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-4 h-4 mr-2">👤</span>
                      {item.client}
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-4 h-4 mr-2">📍</span>
                      {item.location}
                    </div>
                  )}
                  {item.date && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-4 h-4 mr-2">📅</span>
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{item.tags.length - 3}</span>
                    )}
                  </div>
                )}

                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => handleEdit(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedCategory === 'all' ? 'No portfolio items yet' : `No ${categories.find(cat => cat.value === selectedCategory)?.label.toLowerCase()} items`}
            </h3>
            <p className="text-gray-600 mb-6">
              {selectedCategory === 'all' 
                ? 'Start building your portfolio by adding your first project'
                : 'Try selecting a different category or add a new item'
              }
            </p>
            <motion.button
              onClick={handleAddNew}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Add Portfolio Item
            </motion.button>
          </div>
        )}
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal
        isOpen={showModal}
        onClose={handleCloseModal}
        portfolio={editingItem}
        onSubmit={handleModalSubmit}
      />
    </AdminLayout>
  );
};

export default PortfolioPage;
