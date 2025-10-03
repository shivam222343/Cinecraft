import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { servicesAPI } from '../../utils/api';
import ServiceModal from './modals/ServiceModal';

const empty = { title: '', description: '', price_range: '' };

export default function ServicesManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [isSaving, setSaving] = useState(false);

  const filtered = items.filter(s =>
    [s.title, s.description, s.price_range].join(' ').toLowerCase().includes(query.toLowerCase())
  );

  const load = async () => {
    try {
      setLoading(true);
      const res = await servicesAPI.getAll();
      setItems(res?.data || []);
    } catch (e) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setCurrent(null); setModalOpen(true); };
  const openEdit = (row) => { setCurrent(row); setModalOpen(true); };
  const openDelete = (row) => { setCurrent(row); setDeleteOpen(true); };

  const handleModalSuccess = async () => {
    await load(); // Refresh the data
  };

  const remove = async () => {
    try {
      await servicesAPI.remove(current.id);
      setDeleteOpen(false);
      await load();
    } catch (e) { alert('Delete failed'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-dark-900">Services</h2>
        <div className="flex gap-2">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search services..." className="px-4 py-2 border rounded-lg" />
          <Button onClick={openCreate}>Add Service</Button>
        </div>
      </div>

      {loading && <div className="py-8 text-center">Loading...</div>}
      {error && <div className="py-8 text-center text-red-600">{error}</div>}

      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      {row.image_url && (
                        <img 
                          src={row.image_url} 
                          alt={row.title}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                      )}
                      <span className="font-medium">{row.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm max-w-xs truncate">{row.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{row.price_range}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button onClick={()=>openEdit(row)} className="text-primary-600 hover:text-primary-900 mr-4 font-medium">Edit</button>
                    <button onClick={()=>openDelete(row)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Service Modal with Cloudinary Upload */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        service={current}
        onSuccess={handleModalSuccess}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Service</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{current?.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setDeleteOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={remove}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
