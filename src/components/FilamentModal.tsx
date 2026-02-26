import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Filament, FilamentType } from '../types';
import { useFilaments } from '../hooks/useFilaments';
import { FILAMENT_TYPES } from '../data/initialData';
import { TagInput } from './TagInput';

interface FilamentModalProps {
  filament?: Filament;
  onClose: () => void;
}

export const FilamentModal: React.FC<FilamentModalProps> = ({ filament, onClose }) => {
  const { manufacturers, addFilament, updateFilament, addManufacturer, locations } = useFilaments();
  
  const [formData, setFormData] = useState<Omit<Filament, 'id'>>(() => {
    if (filament) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = filament;
      return rest;
    }
    return {
      manufacturerId: manufacturers[0]?.id || '',
      type: 'PLA',
      colorName: '',
      colorHex: '#3b82f6',
      initialWeight: 1000,
      currentWeight: 1000,
      diameter: 1.75,
      tags: [],
      notes: '',
      storageLocationId: undefined
    };
  });

  const [newManufacturerName, setNewManufacturerName] = useState('');
  const [isAddingManufacturer, setIsAddingManufacturer] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filament) {
      updateFilament({ ...formData, id: filament.id });
    } else {
      addFilament(formData);
    }
    onClose();
  };

  const handleAddManufacturer = () => {
    if (newManufacturerName.trim()) {
      const m = addManufacturer(newManufacturerName.trim());
      setFormData(prev => ({ ...prev, manufacturerId: m.id }));
      setNewManufacturerName('');
      setIsAddingManufacturer(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{filament ? 'Filament bearbeiten' : 'Neues Filament'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Manufacturer */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Hersteller</label>
              {!isAddingManufacturer ? (
                <div className="flex gap-2">
                  <select
                    className="flex-1 border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all"
                    value={formData.manufacturerId}
                    onChange={(e) => setFormData({ ...formData, manufacturerId: e.target.value })}
                  >
                    <option value="" disabled>Hersteller wählen...</option>
                    {manufacturers.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                  <button 
                    type="button"
                    onClick={() => setIsAddingManufacturer(true)}
                    className="px-3 text-blue-600 hover:bg-blue-50 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Neu
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    autoFocus
                    className="flex-1 border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    placeholder="z.B. Prusament"
                    value={newManufacturerName}
                    onChange={(e) => setNewManufacturerName(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={handleAddManufacturer}
                    className="px-4 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors"
                  >
                    Hinzufügen
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsAddingManufacturer(false)}
                    className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Type */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Material</label>
              <select
                className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none cursor-pointer"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as FilamentType })}
              >
                {FILAMENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Color Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Farbe (Bezeichnung)</label>
              <input
                type="text"
                required
                className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="z.B. Signalweiß"
                value={formData.colorName}
                onChange={(e) => setFormData({ ...formData, colorName: e.target.value })}
              />
            </div>

            {/* Color Hex */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Vorschau Farbe</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  className="w-12 h-11 p-1 border border-gray-200 rounded-xl cursor-pointer bg-gray-50"
                  value={formData.colorHex}
                  onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
                />
                <input
                  type="text"
                  className="flex-1 border border-gray-200 rounded-xl p-2.5 text-sm uppercase outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 font-mono"
                  value={formData.colorHex}
                  onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
                />
              </div>
            </div>

            {/* Weight */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Initiales Gewicht (g)</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 pr-8"
                  value={formData.initialWeight}
                  onChange={(e) => setFormData({ ...formData, initialWeight: Number(e.target.value) })}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">g</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Aktuelles Gewicht (g)</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 pr-8"
                  value={formData.currentWeight}
                  onChange={(e) => setFormData({ ...formData, currentWeight: Number(e.target.value) })}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">g</span>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Lagerort</label>
              <select
                className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 cursor-pointer"
                value={formData.storageLocationId || ''}
                onChange={(e) => setFormData({ ...formData, storageLocationId: e.target.value || undefined })}
              >
                <option value="">Kein Lagerort</option>
                {locations.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>

            {/* Diameter */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Durchmesser (mm)</label>
              <select
                className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 cursor-pointer"
                value={formData.diameter}
                onChange={(e) => setFormData({ ...formData, diameter: Number(e.target.value) })}
              >
                <option value={1.75}>1.75 mm</option>
                <option value={2.85}>2.85 mm</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Tags</label>
            <TagInput 
              tags={formData.tags}
              onAddTag={(tag) => setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))}
              onRemoveTag={(tag) => setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))}
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Notizen</label>
            <textarea
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none transition-all"
              rows={3}
              placeholder="Zusätzliche Infos zum Filament..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              {filament ? 'Speichern' : 'Hinzufügen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
