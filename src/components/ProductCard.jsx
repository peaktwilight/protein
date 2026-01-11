import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

function ProductCard({ product, onEdit, onDelete }) {
  const getScoreStyle = (score) => {
    const numScore = parseFloat(score)
    if (numScore >= 100) return 'text-green-700 bg-green-50 border-green-200'
    if (numScore >= 80) return 'text-amber-700 bg-amber-50 border-amber-200'
    if (numScore >= 60) return 'text-orange-700 bg-orange-50 border-orange-200'
    return 'text-red-700 bg-red-50 border-red-200'
  }

  const getTasteEmoji = (taste) => {
    if (taste >= 9) return '😍'
    if (taste >= 7) return '😊'
    if (taste >= 5) return '😐'
    if (taste >= 3) return '😕'
    return '😣'
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
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0 pr-3">
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
        </div>
        <div className={`px-2.5 py-1.5 rounded border text-lg font-bold flex-shrink-0 ${getScoreStyle(product.score)}`}>
          {product.score}
        </div>
      </div>

      {/* Location Badge */}
      <span className={`inline-flex px-2 py-1 rounded text-xs font-medium mb-4 ${getLocationStyle(product.location)}`}>
        {product.location}
      </span>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Value</p>
          <p className="text-lg font-bold text-green-700">{product.proteinPerCHF}g/CHF</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Taste</p>
          <p className="text-lg font-bold text-gray-900">
            {product.taste}/10 {getTasteEmoji(product.taste)}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Price</span>
          <span className="font-medium text-gray-900">CHF {product.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Protein</span>
          <span className="text-gray-900">{product.protein}g <span className="text-gray-400">/ {product.size}g</span></span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Calories</span>
          <span className="text-gray-900">{product.calories} <span className="text-gray-400">({product.caloriesPer100}/100g)</span></span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => {
            if (confirm('Delete this product?')) onDelete(product.id)
          }}
          className="flex-1 py-2 bg-gray-50 hover:bg-red-50 rounded-lg text-sm text-gray-500 hover:text-red-600 font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProductCard
