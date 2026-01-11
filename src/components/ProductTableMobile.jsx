import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

function ProductTableMobile({ products, onEdit, onDelete }) {
  const getScoreStyle = (score) => {
    const numScore = parseFloat(score)
    if (numScore >= 100) return 'text-green-700 bg-green-50'
    if (numScore >= 80) return 'text-amber-700 bg-amber-50'
    if (numScore >= 60) return 'text-orange-700 bg-orange-50'
    return 'text-red-700 bg-red-50'
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
    <div className="space-y-3">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-4">
          {/* Header Row */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0 pr-3">
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.brand}</p>
            </div>
            <span className={`px-2.5 py-1 rounded text-lg font-bold ${getScoreStyle(product.score)}`}>
              {product.score}
            </span>
          </div>

          {/* Location */}
          <span className={`inline-flex px-2 py-1 rounded text-xs font-medium mb-3 ${getLocationStyle(product.location)}`}>
            {product.location}
          </span>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 text-center mb-3">
            <div className="bg-gray-50 rounded p-2">
              <p className="text-xs text-gray-500">Value</p>
              <p className="font-semibold text-green-700 text-sm">{product.proteinPerCHF}g</p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <p className="text-xs text-gray-500">Taste</p>
              <p className="font-semibold text-gray-900 text-sm">{product.taste} {getTasteEmoji(product.taste)}</p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <p className="text-xs text-gray-500">Price</p>
              <p className="font-semibold text-gray-900 text-sm">{product.price.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <p className="text-xs text-gray-500">Protein</p>
              <p className="font-semibold text-gray-900 text-sm">{product.protein}g</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3 border-t border-gray-100">
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
      ))}
    </div>
  )
}

export default ProductTableMobile
