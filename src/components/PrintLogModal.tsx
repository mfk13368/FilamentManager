import React, { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import type { Filament, Manufacturer } from '../types';
import { useFilaments } from '../hooks/useFilaments';

interface PrintLogModalProps {
  filament: Filament;
  manufacturer?: Manufacturer;
  onClose: () => void;
}

export const PrintLogModal: React.FC<PrintLogModalProps> = ({ filament, manufacturer, onClose }) => {
  const { logPrint } = useFilaments();
  const [weightUsed, setWeightUsed] = useState<number>(0);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weightUsed > 0) {
      logPrint({
        filamentId: filament.id,
        weightUsed,
        date: new Date().toISOString(),
        notes
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-2">
            <Calculator size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Druck protokollieren</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Filament</p>
            <p className="font-bold text-blue-900">{manufacturer?.name || 'Unbekannter Hersteller'} - {filament.colorName}</p>
            <p className="text-sm text-blue-700">{filament.type} | {filament.currentWeight}g verfügbar</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Verbrauchtes Gewicht (g)</label>
            <div className="relative">
              <input
                type="number"
                required
                min="1"
                max={filament.currentWeight}
                autoFocus
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 pr-8 font-bold text-lg"
                value={weightUsed || ''}
                onChange={(e) => setWeightUsed(Number(e.target.value))}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">g</span>
            </div>
            <p className="text-xs text-gray-400">Tipp: Schau in deinem Slicer nach dem geschätzten Gewicht.</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Notizen (optional)</label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="z.B. Benchie, Ersatzteil..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button 
              type="submit"
              disabled={weightUsed <= 0 || weightUsed > filament.currentWeight}
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 disabled:opacity-50 disabled:shadow-none"
            >
              Loggen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
