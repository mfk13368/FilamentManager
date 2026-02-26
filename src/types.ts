export type FilamentType = 'PLA' | 'PETG' | 'ABS' | 'TPU' | 'ASA' | 'Nylon' | 'PC' | 'Other';

export type Manufacturer = {
  id: string;
  name: string;
};

export type Filament = {
  id: string;
  manufacturerId: string;
  type: FilamentType;
  colorName: string;
  colorHex?: string;
  initialWeight: number; // in grams
  currentWeight: number; // in grams
  diameter: number; // 1.75 or 2.85
  price?: number;
  storageLocationId?: string;
  tags: string[];
  notes?: string;
};

export type StorageLocation = {
  id: string;
  name: string;
  description?: string;
};

export type PrintJob = {
  id: string;
  filamentId: string;
  weightUsed: number; // in grams
  date: string;
  notes?: string;
};
