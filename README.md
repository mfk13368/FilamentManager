# Filament Manager App

Eine moderne, plattformunabhängige Web-App zur Verwaltung von 3D-Druck-Filamenten.

## Features

- **Filament-Bestand**: Behalte den Überblick über alle deine Filamente.
- **Verbrauchs-Tracking**: Logge deine Drucke (in Gramm), und die App berechnet automatisch die Restmenge.
- **Hersteller & Materialien**: Integrierte Liste gängiger Hersteller, erweiterbar um eigene Definitionen.
- **Lagerorte**: Verwalte deine Aufbewahrungsorte (z.B. "Trockenbox A", "Regal 1").
- **Tagging & Notizen**: Markiere Filamente mit eigenen Schlagworten (z.B. "Favorit", "Schnell") und speichere wichtige Hinweise.
- **Suche & Filter**: Schnelles Finden nach Farbe, Hersteller, Material oder Tags.
- **Datenschutz**: Alle Daten werden lokal in deinem Browser gespeichert (`localStorage`).

## Voraussetzungen

Um die App lokal auszuführen oder zu entwickeln, benötigst du:
- [Node.js](https://nodejs.org/) (Version 20 oder neuer empfohlen)
- Einen Webbrowser

## Installation & Start

1. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```

2. Starte den Entwicklungsserver:
   ```bash
   npm run dev
   ```
   Die App ist dann unter `http://localhost:5173` erreichbar.

3. Für den produktiven Einsatz bauen:
   ```bash
   npm run build
   ```

## Testing

Die App verfügt über automatisierte Tests, um die korrekte Berechnung des Verbrauchs sicherzustellen.

- **Unit- & Integrationstests** (Vitest):
  ```bash
  npm test
  ```

- **Linting** (ESLint):
  ```bash
  npm run lint
  ```

## Verwendete Technologien

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Testing**: Vitest, React Testing Library
