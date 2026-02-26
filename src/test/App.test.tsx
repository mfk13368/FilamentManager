import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { FilamentProvider } from '../context/FilamentProvider';

describe('App Component', () => {
  it('renders the header and main title', () => {
    render(
      <FilamentProvider>
        <App />
      </FilamentProvider>
    );
    expect(screen.getByText('Filament Manager')).toBeDefined();
    expect(screen.getByText('Deine Sammlung')).toBeDefined();
  });
});
