import React from 'react';
import type { Filament, Manufacturer } from '../types';
import { MapPin, Tag } from 'lucide-react';

interface FilamentCardProps {
  filament: Filament;
  manufacturer?: Manufacturer;
  locationName?: string;
  onEdit: (f: Filament) => void;
  onLogPrint: (f: Filament) => void;
}

export const FilamentCard: React.FC<FilamentCardProps> = ({ 
  filament, manufacturer, locationName, onEdit, onLogPrint 
}) => {
  const percentage = Math.round((filament.currentWeight / filament.initialWeight) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold">{manufacturer?.name || 'Unbekannter Hersteller'}</h3>
          <p className="text-sm text-gray-500 font-medium">{filament.type} - {filament.colorName}</p>
        </div>
        <div 
          className="w-8 h-8 rounded-full border-2 border-white shadow-sm" 
          style={{ backgroundColor: filament.colorHex || '#ccc' }}
          title={filament.colorName}
        />
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Bestand</span>
          <span>{filament.currentWeight}g / {filament.initialWeight}g</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full transition-all duration-500 ${
              percentage < 15 ? 'bg-red-500' : percentage < 30 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
          />
        </div>
        <div className="text-right text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          {percentage}% verbleibend
        </div>
        
        <div className="pt-2 space-y-1.5">
          {locationName && (
            <div className="flex items-center text-xs text-gray-600">
              <MapPin size={14} className="mr-1.5 text-gray-400" />
              <span>{locationName}</span>
            </div>
          )}
          
          {filament.tags.length > 0 && (
            <div className="flex items-start gap-1 mt-2">
              <Tag size={14} className="mr-1 mt-0.5 text-gray-400 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {filament.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mt-auto pt-4">
        <button 
          onClick={() => onLogPrint(filament)}
          className="flex-1 bg-blue-600 text-white py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          Druck loggen
        </button>
        <button 
          onClick={() => onEdit(filament)}
          className="px-3 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
};
