import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

function ProductTable({ products, onEdit, onDelete }) {
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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Product</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Store</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Score</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Value</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Taste</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Price</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Protein</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Cal</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide w-20"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-500">{product.brand}</div>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getLocationStyle(product.location)}`}>
                  {product.location}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex px-2 py-1 rounded text-sm font-bold ${getScoreStyle(product.score)}`}>
                  {product.score}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="text-green-700 font-semibold">{product.proteinPerCHF}g</span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="text-gray-900">{product.taste}/10</span>
                <span className="ml-1">{getTasteEmoji(product.taste)}</span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="text-gray-900 font-medium">CHF {product.price.toFixed(2)}</span>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="text-gray-900 font-medium">{product.protein}g</div>
                <div className="text-xs text-gray-500">{product.size}g pkg</div>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="text-gray-900">{product.calories}</div>
                <div className="text-xs text-gray-500">{product.caloriesPer100}/100g</div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this product?')) onDelete(product.id)
                    }}
                    className="p-1.5 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
