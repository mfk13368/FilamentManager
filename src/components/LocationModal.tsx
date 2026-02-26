import React, { useState } from 'react';
import { X, Trash2, MapPin } from 'lucide-react';
import { useFilaments } from '../hooks/useFilaments';

interface LocationModalProps {
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ onClose }) => {
  const { locations, addLocation, deleteLocation } = useFilaments();
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      addLocation({ name: newName.trim(), description: newDesc.trim() });
      setNewName('');
      setNewDesc('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Lagerorte</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                required
                className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="z.B. Regal A, Trockenbox 1"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Beschreibung (optional)</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="z.B. Im Keller"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98]"
            >
              Lagerort hinzufügen
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Vorhandene Orte</h3>
            <div className="max-h-60 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
              {locations.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 text-sm font-medium">Noch keine Orte definiert.</p>
                </div>
              ) : (
                locations.map(l => (
                  <div key={l.id} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate">{l.name}</p>
                      {l.description && <p className="text-xs text-gray-500 truncate">{l.description}</p>}
                    </div>
                    <button 
                      onClick={() => deleteLocation(l.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      title="Lagerort löschen"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
