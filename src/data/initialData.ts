import type { Manufacturer, FilamentType } from '../types';

export const COMMON_MANUFACTURERS: Manufacturer[] = [
  { id: '1', name: 'Prusa Research' },
  { id: '2', name: 'eSUN' },
  { id: '3', name: 'Polymaker' },
  { id: '4', name: 'Overture' },
  { id: '5', name: 'Hatchbox' },
  { id: '6', name: 'Extrudr' },
  { id: '7', name: 'Filamentum' },
  { id: '8', name: 'Sunlu' },
  { id: '9', name: 'Anycubic' },
  { id: '10', name: 'Creality' },
];

export const FILAMENT_TYPES: FilamentType[] = [
  'PLA',
  'PETG',
  'ABS',
  'TPU',
  'ASA',
  'Nylon',
  'PC',
  'Other',
];
