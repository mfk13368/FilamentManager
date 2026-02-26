import React, { useState, useEffect, useCallback } from 'react';
import type { Filament, Manufacturer, StorageLocation, PrintJob } from '../types';
import { COMMON_MANUFACTURERS } from '../data/initialData';
import { FilamentContext } from './FilamentContext';

export const FilamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filaments, setFilaments] = useState<Filament[]>(() => {
    const saved = localStorage.getItem('filaments');
    return saved ? JSON.parse(saved) : [];
  });

  const [manufacturers, setManufacturers] = useState<Manufacturer[]>(() => {
    const saved = localStorage.getItem('manufacturers');
    return saved ? JSON.parse(saved) : COMMON_MANUFACTURERS;
  });

  const [locations, setLocations] = useState<StorageLocation[]>(() => {
    const saved = localStorage.getItem('locations');
    return saved ? JSON.parse(saved) : [];
  });

  const [prints, setPrints] = useState<PrintJob[]>(() => {
    const saved = localStorage.getItem('prints');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('filaments', JSON.stringify(filaments));
  }, [filaments]);

  useEffect(() => {
    localStorage.setItem('manufacturers', JSON.stringify(manufacturers));
  }, [manufacturers]);

  useEffect(() => {
    localStorage.setItem('locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('prints', JSON.stringify(prints));
  }, [prints]);

  const addFilament = useCallback((f: Omit<Filament, 'id'>) => {
    setFilaments(prev => [...prev, { ...f, id: crypto.randomUUID() }]);
  }, []);

  const updateFilament = useCallback((f: Filament) => {
    setFilaments(prev => prev.map(fil => fil.id === f.id ? f : fil));
  }, []);

  const deleteFilament = useCallback((id: string) => {
    setFilaments(prev => prev.filter(fil => fil.id !== id));
  }, []);

  const addManufacturer = (name: string) => {
    const existing = manufacturers.find(m => m.name.toLowerCase() === name.toLowerCase());
    if (existing) return existing;
    
    const newM = { id: crypto.randomUUID(), name };
    setManufacturers(prev => [...prev, newM]);
    return newM;
  };

  const addLocation = useCallback((l: Omit<StorageLocation, 'id'>) => {
    setLocations(prev => [...prev, { ...l, id: crypto.randomUUID() }]);
  }, []);

  const deleteLocation = useCallback((id: string) => {
    setLocations(prev => prev.filter(l => l.id !== id));
    setFilaments(prev => prev.map(f => f.storageLocationId === id ? { ...f, storageLocationId: undefined } : f));
  }, []);

  const logPrint = useCallback((p: Omit<PrintJob, 'id'>) => {
    const newPrint = { ...p, id: crypto.randomUUID() };
    setPrints(prev => [...prev, newPrint]);
    
    setFilaments(prev => prev.map(f => {
      if (f.id === p.filamentId) {
        return { ...f, currentWeight: f.currentWeight - p.weightUsed };
      }
      return f;
    }));
  }, []);

  const resetData = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  return (
    <FilamentContext.Provider value={{
      filaments, manufacturers, locations, prints,
      addFilament, updateFilament, deleteFilament,
      addManufacturer, addLocation, deleteLocation, logPrint, resetData
    }}>
      {children}
    </FilamentContext.Provider>
  );
};
