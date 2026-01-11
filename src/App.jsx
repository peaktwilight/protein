import React, { useState, useEffect } from 'react'
import useStore from './store'
import ProductTable from './components/ProductTable'
import ProductTableMobile from './components/ProductTableMobile'
import ProductCard from './components/ProductCard'
import AddProductModal from './components/AddProductModal'
import WelcomeModal from './components/WelcomeModal'
import DailyTracker from './components/DailyTracker'
import { Download, Upload, Plus, Grid, List, Target, RotateCcw } from 'lucide-react'

function App() {
  const [viewMode, setViewMode] = useState('table')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [sortBy, setSortBy] = useState('score')
  const [filterLocation, setFilterLocation] = useState('all')
  const [showDailyTracker, setShowDailyTracker] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const {
    products,
    isFirstTime,
    initWithDoruksData,
    initEmpty,
    addProduct,
    updateProduct,
    deleteProduct,
    exportData,
    importData,
    resetToWelcome
  } = useStore()

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          importData(data)
        } catch (error) {
          alert('Error importing data')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowAddModal(true)
  }

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, { ...editingProduct, ...product })
    } else {
      addProduct(product)
    }
    setShowAddModal(false)
    setEditingProduct(null)
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'score': return parseFloat(b.score) - parseFloat(a.score)
      case 'proteinPerCHF': return parseFloat(b.proteinPerCHF) - parseFloat(a.proteinPerCHF)
      case 'taste': return b.taste - a.taste
      case 'price': return a.price - b.price
      case 'protein': return b.protein - a.protein
      case 'calories': return a.calories - b.calories
      default: return 0
    }
  })

  const filteredProducts = filterLocation === 'all'
    ? sortedProducts
    : sortedProducts.filter(p => p.location === filterLocation)

  const locations = ['all', ...new Set(products.map(p => p.location))]

  const bestValue = products.length ? [...products].sort((a, b) => parseFloat(b.proteinPerCHF) - parseFloat(a.proteinPerCHF))[0] : null
  const topScorer = products.length ? [...products].sort((a, b) => parseFloat(b.score) - parseFloat(a.score))[0] : null

  return (
    <div className="min-h-screen bg-gray-50">
      {isFirstTime && (
        <WelcomeModal
          onChooseDoruk={initWithDoruksData}
          onStartFresh={initEmpty}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 32 32" className="w-5 h-5 text-white" fill="currentColor">
                <rect x="13" y="6" width="6" height="20" />
                <rect x="6" y="13" width="20" height="6" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Swiss Protein Tracker
            </h1>
          </div>
          <p className="text-gray-500 text-sm sm:text-base">
            A tool I built for myself, now free for everyone in Switzerland
          </p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Products</p>
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Best Value</p>
            <p className="text-lg font-bold text-gray-900 truncate">{bestValue?.name || '-'}</p>
            {bestValue && <p className="text-xs text-green-600 font-medium">{bestValue.proteinPerCHF}g/CHF</p>}
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Top Scorer</p>
            <p className="text-lg font-bold text-gray-900 truncate">{topScorer?.name || '-'}</p>
            {topScorer && <p className="text-xs text-gray-500 font-medium">Score: {topScorer.score}</p>}
          </div>
          <button
            onClick={() => setShowDailyTracker(true)}
            className="bg-red-600 hover:bg-red-700 rounded-lg p-4 text-left transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-red-200" />
              <p className="text-xs text-red-200 uppercase tracking-wide">Daily</p>
            </div>
            <p className="text-2xl font-bold text-white">Track</p>
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            {/* View Toggle */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Table</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-1 sm:flex-initial">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 sm:flex-initial px-3 pr-8 py-2 rounded-lg bg-white text-gray-900 text-sm border border-gray-200 focus:border-red-600 focus:outline-none"
              >
                <option value="score">Sort by Score</option>
                <option value="proteinPerCHF">Sort by Value</option>
                <option value="taste">Sort by Taste</option>
                <option value="price">Sort by Price</option>
                <option value="protein">Sort by Protein</option>
                <option value="calories">Sort by Calories</option>
              </select>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="flex-1 sm:flex-initial px-3 pr-8 py-2 rounded-lg bg-white text-gray-900 text-sm border border-gray-200 focus:border-red-600 focus:outline-none"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc === 'all' ? 'All Stores' : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
              <button
                onClick={exportData}
                className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm flex items-center gap-1.5 transition-colors"
                title="Export"
              >
                <Download className="w-4 h-4" />
              </button>
              <label className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Import"
              >
                <Upload className="w-4 h-4" />
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              <button
                onClick={() => {
                  if (confirm('Reset all data?')) resetToWelcome()
                }}
                className="px-3 py-2 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg text-gray-500 hover:text-red-600 text-sm flex items-center gap-1.5 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          {viewMode === 'table' ? (
            isMobile ? (
              <ProductTableMobile
                products={filteredProducts}
                onEdit={handleEdit}
                onDelete={deleteProduct}
              />
            ) : (
              <ProductTable
                products={filteredProducts}
                onEdit={handleEdit}
                onDelete={deleteProduct}
              />
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={deleteProduct}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm mb-1">
            100% free, no ads, no signup
          </p>
          <p className="text-gray-500 text-sm mb-3">
            Made by <a href="https://doruk.ch" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-600 transition-colors">Doruk</a> • Open source & community-driven
          </p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <a
              href="https://github.com/peaktwilight/protein"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              Contribute on GitHub
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="https://www.linkedin.com/in/doruk-ozturk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>

      {showAddModal && (
        <AddProductModal
          product={editingProduct}
          onClose={() => {
            setShowAddModal(false)
            setEditingProduct(null)
          }}
          onSave={handleSaveProduct}
        />
      )}

      {showDailyTracker && (
        <DailyTracker
          products={products}
          onClose={() => setShowDailyTracker(false)}
        />
      )}
    </div>
  )
}

export default App
