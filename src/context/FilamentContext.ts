import { createContext } from 'react';
import type { Filament, Manufacturer, StorageLocation, PrintJob } from '../types';

export interface FilamentContextType {
  filaments: Filament[];
  manufacturers: Manufacturer[];
  locations: StorageLocation[];
  prints: PrintJob[];
  addFilament: (filament: Omit<Filament, 'id'>) => void;
  updateFilament: (filament: Filament) => void;
  deleteFilament: (id: string) => void;
  addManufacturer: (name: string) => Manufacturer;
  addLocation: (location: Omit<StorageLocation, 'id'>) => void;
  deleteLocation: (id: string) => void;
  logPrint: (print: Omit<PrintJob, 'id'>) => void;
  resetData: () => void;
}

export const FilamentContext = createContext<FilamentContextType | undefined>(undefined);
