import { useContext } from 'react';
import { FilamentContext } from '../context/FilamentContext';

export const useFilaments = () => {
  const context = useContext(FilamentContext);
  if (!context) throw new Error('useFilaments must be used within FilamentProvider');
  return context;
};
