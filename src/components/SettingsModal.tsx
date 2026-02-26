import React from 'react';
import { X, Trash2, Database, Info } from 'lucide-react';
import { useFilaments } from '../hooks/useFilaments';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { filaments, prints, locations, resetData } = useFilaments();

  const handleReset = () => {
    if (confirm('Bist du sicher? Alle Filamente, Drucke und Einstellungen werden unwiderruflich gelöscht.')) {
      resetData();
    }
  };

  const totalWeight = filaments.reduce((acc, f) => acc + f.currentWeight, 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-2">
            <Database size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Einstellungen & Daten</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Statistics */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Info size={14} />
              Statistiken
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500">Filamente</p>
                <p className="text-xl font-bold text-gray-900">{filaments.length}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500">Gesamtgewicht</p>
                <p className="text-xl font-bold text-gray-900">{(totalWeight / 1000).toFixed(2)} kg</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500">Drucke</p>
                <p className="text-xl font-bold text-gray-900">{prints.length}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500">Lagerorte</p>
                <p className="text-xl font-bold text-gray-900">{locations.length}</p>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Trash2 size={14} />
              Datenverwaltung
            </h3>
            <div className="p-4 border border-red-100 bg-red-50 rounded-2xl">
              <p className="text-sm text-red-800 mb-4 font-medium">
                Möchtest du alle Daten löschen und die App auf den Werkszustand zurücksetzen?
              </p>
              <button 
                onClick={handleReset}
                className="w-full py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Alle Daten löschen
              </button>
            </div>
          </div>

          <div className="pt-4 text-center">
            <p className="text-[10px] text-gray-400 font-medium">
              Filament Manager v1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
