import React from 'react';
import { FilamentCard } from './FilamentCard';
import { useFilaments } from '../hooks/useFilaments';
import type { Filament } from '../types';

interface FilamentListProps {
  onEditFilament: (f: Filament) => void;
  onLogPrint: (f: Filament) => void;
  filaments: Filament[]; // We will pass filtered filaments here later
}

export const FilamentList: React.FC<FilamentListProps> = ({ 
  onEditFilament, onLogPrint, filaments 
}) => {
  const { manufacturers, locations } = useFilaments();

  if (filaments.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-500">Keine Filamente gefunden.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filaments.map(filament => (
        <FilamentCard
          key={filament.id}
          filament={filament}
          manufacturer={manufacturers.find(m => m.id === filament.manufacturerId)}
          locationName={locations.find(l => l.id === filament.storageLocationId)?.name}
          onEdit={onEditFilament}
          onLogPrint={onLogPrint}
        />
      ))}
    </div>
  );
};
