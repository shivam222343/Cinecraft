import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { portfolioAPI } from '../../utils/api';
import PortfolioModal from './modals/PortfolioModal';

const empty = { title: '', description: '', tags: '', media_url: '' };

export default function PortfolioManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const filtered = items.filter(p =>
    [p.title, p.description, p.tags].join(' ').toLowerCase().includes(query.toLowerCase())
  );

  const load = async () => {
    try {
      setLoading(true);
      const res = await portfolioAPI.getAll();
      setItems(res?.data || []);
    } catch (e) {
      setError('Failed to load portfolio');
    } finally { setLoading(false); }
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
      await portfolioAPI.remove(current.id);
      setDeleteOpen(false);
      await load();
    } catch (e) { alert('Delete failed'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-dark-900">Portfolio</h2>
        <div className="flex gap-2">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search portfolio..." className="px-4 py-2 border rounded-lg" />
          <Button onClick={openCreate}>Add Item</Button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Media</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      {row.media_url && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                          {row.media_url.includes('video') || row.media_url.includes('.mp4') ? (
                            <video src={row.media_url} className="w-full h-full object-cover" />
                          ) : (
                            <img src={row.media_url} alt={row.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{row.title}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{row.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex flex-wrap gap-1">
                      {row.tags?.split(',').slice(0, 3).map((tag, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {tag.trim()}
                        </span>
                      ))}
                      {row.tags?.split(',').length > 3 && (
                        <span className="text-xs text-gray-500">+{row.tags.split(',').length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.media_url ? (
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        {row.media_url.includes('video') || row.media_url.includes('.mp4') ? (
                          <video src={row.media_url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={row.media_url} alt="media" className="w-full h-full object-cover" />
                        )}
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No media</span>
                      </div>
                    )}
                  </td>
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

      {/* Portfolio Modal with Cloudinary Upload */}
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        portfolioItem={current}
        onSuccess={handleModalSuccess}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Portfolio Item</h3>
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
