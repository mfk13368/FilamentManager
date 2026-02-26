import { useState, useMemo } from 'react'
import { Plus, Database, MapPin, Settings } from 'lucide-react'
import { FilamentList } from './components/FilamentList'
import { FilamentFilters } from './components/FilamentFilters'
import { FilamentModal } from './components/FilamentModal'
import { LocationModal } from './components/LocationModal'
import { PrintHistory } from './components/PrintHistory'
import { PrintLogModal } from './components/PrintLogModal'
import { SettingsModal } from './components/SettingsModal'
import { useFilaments } from './hooks/useFilaments'
import type { Filament } from './types'

function App() {
  const { filaments, manufacturers } = useFilaments()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [isFilamentModalOpen, setIsFilamentModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isPrintLogModalOpen, setIsPrintLogModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [activeFilament, setActiveFilament] = useState<Filament | undefined>(undefined)

  const filteredFilaments = useMemo(() => {
    return filaments.filter(f => {
      const manufacturer = manufacturers.find(m => m.id === f.manufacturerId)
      const matchesSearch = 
        manufacturer?.name.toLowerCase().includes(search.toLowerCase()) ||
        f.colorName.toLowerCase().includes(search.toLowerCase()) ||
        f.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
        f.type.toLowerCase().includes(search.toLowerCase())
      
      const matchesType = typeFilter === '' || f.type === typeFilter
      
      return matchesSearch && matchesType
    })
  }, [filaments, manufacturers, search, typeFilter])

  const handleEditFilament = (f: Filament) => {
    setActiveFilament(f)
    setIsFilamentModalOpen(true)
  }

  const handleAddFilament = () => {
    setActiveFilament(undefined)
    setIsFilamentModalOpen(true)
  }

  const handleLogPrint = (f: Filament) => {
    setActiveFilament(f)
    setIsPrintLogModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100">
              <Database className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">Filament Manager</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              title="Lagerorte verwalten"
            >
              <MapPin size={22} />
            </button>
            <button 
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              title="Einstellungen & Statistiken"
            >
              <Settings size={22} />
            </button>
            <button 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 active:scale-95 ml-2"
              onClick={handleAddFilament}
            >
              <Plus size={20} strokeWidth={3} />
              <span className="hidden sm:inline">Neu</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold mb-1.5 text-gray-900">Deine Sammlung</h2>
            <p className="text-gray-500 font-medium">Du verwaltest aktuell <span className="text-blue-600 font-bold">{filaments.length}</span> Filamente.</p>
          </div>
        </div>

        <FilamentFilters 
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
        />

        <FilamentList 
          filaments={filteredFilaments}
          onEditFilament={handleEditFilament}
          onLogPrint={handleLogPrint}
        />

        <div className="mt-20">
          <PrintHistory />
        </div>
      </main>

      {isFilamentModalOpen && (
        <FilamentModal 
          key={activeFilament?.id || 'new'}
          filament={activeFilament}
          onClose={() => setIsFilamentModalOpen(false)}
        />
      )}

      {isLocationModalOpen && (
        <LocationModal 
          onClose={() => setIsLocationModalOpen(false)}
        />
      )}

      {isPrintLogModalOpen && activeFilament && (
        <PrintLogModal 
          filament={activeFilament}
          manufacturer={manufacturers.find(m => m.id === activeFilament.manufacturerId)}
          onClose={() => setIsPrintLogModalOpen(false)}
        />
      )}

      {isSettingsModalOpen && (
        <SettingsModal 
          onClose={() => setIsSettingsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App
