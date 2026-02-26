import React from 'react';
import { useFilaments } from '../hooks/useFilaments';
import { History, Calendar, Weight } from 'lucide-react';

export const PrintHistory: React.FC = () => {
  const { prints, filaments, manufacturers } = useFilaments();

  if (prints.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-100">
        <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <History className="text-gray-300" size={24} />
        </div>
        <p className="text-gray-500 font-medium">Noch keine Drucke protokolliert.</p>
      </div>
    );
  }

  // Sort by date descending
  const sortedPrints = [...prints].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <History size={20} className="text-blue-600" />
        Druck-Historie
      </h3>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Datum</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Filament</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Verbrauch</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Notiz</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedPrints.map(print => {
                const filament = filaments.find(f => f.id === print.filamentId);
                const manufacturer = manufacturers.find(m => m.id === filament?.manufacturerId);
                
                return (
                  <tr key={print.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(print.date).toLocaleDateString('de-DE', { 
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full border border-gray-200" 
                          style={{ backgroundColor: filament?.colorHex || '#ccc' }} 
                        />
                        <span className="font-bold text-gray-900 text-sm">
                          {manufacturer?.name || 'Unbekannt'} - {filament?.colorName || 'Gelöscht'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-blue-600 text-sm">
                        <Weight size={14} />
                        {print.weightUsed}g
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500 italic">
                        {print.notes || '-'}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
