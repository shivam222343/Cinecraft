import { useEffect, useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { contentAPI } from '../../utils/api';

const empty = {
  hero_headline: '',
  hero_subtitle: '',
  about_text: '',
  contact_email: '',
  contact_phone: ''
};

export default function ContentManager() {
  const [content, setContent] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await contentAPI.get();
      setContent({ ...empty, ...(res?.data || {}) });
    } catch (e) { setError('Failed to load content'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const update = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      await contentAPI.update(content);
      setDirty(false);
    } catch (e) { alert('Save failed'); } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dark-900">Content Blocks</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={()=>setPreviewOpen(true)}>Preview</Button>
          <Button onClick={save} disabled={!dirty || saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
        </div>
      </div>

      {loading && <div className="py-8 text-center">Loading...</div>}
      {error && <div className="py-8 text-center text-red-600">{error}</div>}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-dark-800">Hero</h3>
            <Input label="Headline" value={content.hero_headline} onChange={(e)=>update('hero_headline', e.target.value)} />
            <Input label="Subtitle" value={content.hero_subtitle} onChange={(e)=>update('hero_subtitle', e.target.value)} />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-dark-800">About</h3>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">About Text</label>
              <textarea value={content.about_text} onChange={(e)=>update('about_text', e.target.value)} rows={6} className="w-full px-4 py-3 border rounded-lg" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-dark-800">Contact</h3>
            <Input label="Email" type="email" value={content.contact_email} onChange={(e)=>update('contact_email', e.target.value)} />
            <Input label="Phone" value={content.contact_phone} onChange={(e)=>update('contact_phone', e.target.value)} />
          </div>
        </div>
      )}

      <Modal isOpen={previewOpen} onClose={()=>setPreviewOpen(false)} title="Preview" size="lg">
        <div className="space-y-6">
          <div>
            <div className="text-xs text-gray-500 mb-1">Hero</div>
            <div className="text-2xl font-bold">{content.hero_headline || '—'}</div>
            <div className="text-gray-600">{content.hero_subtitle || '—'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">About</div>
            <div className="bg-gray-50 rounded p-3 text-sm whitespace-pre-line">{content.about_text || '—'}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Contact Email</div>
              <div className="font-medium">{content.contact_email || '—'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Contact Phone</div>
              <div className="font-medium">{content.contact_phone || '—'}</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
