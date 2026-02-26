import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { FilamentProvider } from '../context/FilamentProvider';
import { useFilaments } from '../hooks/useFilaments';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FilamentProvider>{children}</FilamentProvider>
);

describe('Consumption Logic', () => {
  it('should update filament weight when a print is logged', async () => {
    const { result } = renderHook(() => useFilaments(), { wrapper });

    // 1. Add a filament
    act(() => {
      result.current.addFilament({
        manufacturerId: '1',
        type: 'PLA',
        colorName: 'Red',
        initialWeight: 1000,
        currentWeight: 1000,
        diameter: 1.75,
        tags: [],
        notes: ''
      });
    });

    // We need to wait for state updates or find the filament in the list
    const filament = result.current.filaments.find(f => f.colorName === 'Red');
    expect(filament).toBeDefined();
    if (!filament) return;
    
    expect(filament.currentWeight).toBe(1000);

    // 2. Log a print
    act(() => {
      result.current.logPrint({
        filamentId: filament.id,
        weightUsed: 150,
        date: new Date().toISOString(),
        notes: 'Test print'
      });
    });

    // 3. Verify weight update
    const updatedFilament = result.current.filaments.find(f => f.id === filament.id);
    expect(updatedFilament?.currentWeight).toBe(850);
    expect(result.current.prints.length).toBe(1);
    expect(result.current.prints[0].weightUsed).toBe(150);
  });
});
