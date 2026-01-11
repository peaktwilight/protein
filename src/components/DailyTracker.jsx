import React, { useState, useEffect } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'

function DailyTracker({ products, onClose }) {
  const [dailyGoal, setDailyGoal] = useState(() => {
    return parseInt(localStorage.getItem('dailyProteinGoal')) || 140
  })
  const [consumedProducts, setConsumedProducts] = useState(() => {
    const saved = localStorage.getItem('dailyConsumption')
    const savedDate = localStorage.getItem('consumptionDate')
    const today = new Date().toDateString()
    if (saved && savedDate === today) {
      return JSON.parse(saved)
    }
    return []
  })
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    localStorage.setItem('dailyProteinGoal', dailyGoal.toString())
  }, [dailyGoal])

  useEffect(() => {
    localStorage.setItem('dailyConsumption', JSON.stringify(consumedProducts))
    localStorage.setItem('consumptionDate', new Date().toDateString())
  }, [consumedProducts])

  const totalProtein = consumedProducts.reduce((sum, item) => sum + item.protein * item.quantity, 0)
  const totalCalories = consumedProducts.reduce((sum, item) => sum + item.calories * item.quantity, 0)
  const totalCost = consumedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const progress = Math.min((totalProtein / dailyGoal) * 100, 100)

  const addProduct = () => {
    if (!selectedProduct) return
    const product = products.find(p => p.id.toString() === selectedProduct)
    if (!product) return

    const existing = consumedProducts.find(c => c.id === product.id)
    if (existing) {
      setConsumedProducts(prev => prev.map(c =>
        c.id === product.id ? { ...c, quantity: c.quantity + quantity } : c
      ))
    } else {
      setConsumedProducts(prev => [...prev, { ...product, quantity }])
    }
    setSelectedProduct('')
    setQuantity(1)
  }

  const removeProduct = (id) => {
    setConsumedProducts(prev => prev.filter(c => c.id !== id))
  }

  const getProgressColor = () => {
    if (progress >= 100) return 'bg-red-600'
    if (progress >= 80) return 'bg-green-600'
    if (progress >= 50) return 'bg-amber-500'
    return 'bg-gray-400'
  }

  const getLocationStyle = (location) => {
    switch (location) {
      case 'Migros': return 'bg-orange-100 text-orange-700'
      case 'Coop': return 'bg-red-100 text-red-700'
      case 'Lidl': return 'bg-blue-100 text-blue-700'
      case 'Aldi': return 'bg-cyan-100 text-cyan-700'
      case 'Online': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Daily Tracker</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(90vh-60px)]">
          {/* Progress */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="text-3xl font-bold text-gray-900">{totalProtein.toFixed(0)}g</span>
                <span className="text-gray-500 ml-1">/ {dailyGoal}g</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${getProgressColor()} transition-all duration-500 rounded-full`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              {progress >= 100 ? 'Goal reached!' : `${(dailyGoal - totalProtein).toFixed(0)}g remaining`}
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 uppercase mb-1">Calories</p>
              <p className="text-xl font-bold text-gray-900">{totalCalories}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 uppercase mb-1">Cost</p>
              <p className="text-xl font-bold text-gray-900">CHF {totalCost.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 uppercase mb-1">Items</p>
              <p className="text-xl font-bold text-gray-900">{consumedProducts.length}</p>
            </div>
          </div>

          {/* Goal Setting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daily Goal</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <input
                type="number"
                min="50"
                max="250"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(parseInt(e.target.value) || 140)}
                className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-center font-medium focus:border-red-600 focus:outline-none"
              />
              <span className="text-gray-500">g</span>
            </div>
          </div>

          {/* Add Product */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Product</label>
            <div className="flex gap-2">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:border-red-600 focus:outline-none"
              >
                <option value="">Select product...</option>
                {products.sort((a, b) => b.score - a.score).map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.brand}) - {product.protein}g
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0.5"
                max="10"
                step="0.5"
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                className="w-16 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-center font-medium focus:border-red-600 focus:outline-none"
              />
              <button
                onClick={addProduct}
                disabled={!selectedProduct}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 rounded-lg text-white font-medium flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Consumed Products */}
          {consumedProducts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Today's Consumption</label>
                <button
                  onClick={() => setConsumedProducts([])}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Reset
                </button>
              </div>
              <div className="space-y-2">
                {consumedProducts.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 truncate">{item.name}</span>
                        {item.quantity > 1 && (
                          <span className="text-xs font-medium bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                            x{item.quantity}
                          </span>
                        )}
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${getLocationStyle(item.location)}`}>
                          {item.location}
                        </span>
                      </div>
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span className="text-green-700 font-medium">{(item.protein * item.quantity).toFixed(1)}g protein</span>
                        <span>CHF {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors ml-2"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DailyTracker
