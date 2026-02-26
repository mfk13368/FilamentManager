import React from 'react';
import { Search, Filter } from 'lucide-react';
import { FILAMENT_TYPES } from '../data/initialData';

interface FilamentFiltersProps {
  search: string;
  onSearchChange: (s: string) => void;
  typeFilter: string;
  onTypeFilterChange: (t: string) => void;
}

export const FilamentFilters: React.FC<FilamentFiltersProps> = ({
  search, onSearchChange, typeFilter, onTypeFilterChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Suche nach Hersteller, Farbe oder Tags..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
      </div>
      <div className="relative min-w-[160px]">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <select
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value)}
          className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl shadow-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer transition-all"
        >
          <option value="">Alle Materialien</option>
          {FILAMENT_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
