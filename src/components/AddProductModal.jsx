import React, { useState, useEffect } from 'react'
import { X, Save } from 'lucide-react'

function AddProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    location: 'Migros',
    taste: 5,
    price: 0,
    size: 0,
    protein: 0,
    calories: 0,
    proteinPer100: 0,
    caloriesPer100: 0
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.brand || formData.price <= 0 || formData.protein <= 0) {
      alert('Please fill in all required fields')
      return
    }
    onSave(formData)
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target
    const newValue = type === 'number' ? parseFloat(value) || 0 : value

    setFormData(prev => {
      const updated = { ...prev, [name]: newValue }
      if ((name === 'protein' || name === 'size') && updated.size > 0) {
        updated.proteinPer100 = ((updated.protein / updated.size) * 100).toFixed(1)
      }
      if ((name === 'calories' || name === 'size') && updated.size > 0) {
        updated.caloriesPer100 = Math.round((updated.calories / updated.size) * 100)
      }
      return updated
    })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-60px)]">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:border-red-600 focus:outline-none"
              placeholder="e.g., High Protein Milk"
              required
            />
          </div>

          {/* Brand & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:border-red-600 focus:outline-none"
                placeholder="e.g., Milbona"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store *</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:border-red-600 focus:outline-none"
              >
                <option value="Migros">Migros</option>
                <option value="Coop">Coop</option>
                <option value="Lidl">Lidl</option>
                <option value="Aldi">Aldi</option>
                <option value="Online">Online</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Taste & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Taste (1-10) *</label>
              <input
                type="number"
                name="taste"
                value={formData.taste}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:border-red-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (CHF) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:border-red-600 focus:outline-none"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Size & Protein */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Size (g) *</label>
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:border-red-600 focus:outline-none"
                placeholder="500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Protein (g) *</label>
              <input
                type="number"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:border-red-600 focus:outline-none"
                placeholder="35"
                required
              />
            </div>
          </div>

          {/* Calories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Calories *</label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:border-red-600 focus:outline-none"
              placeholder="250"
              required
            />
          </div>

          {/* Calculated Values */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">Auto-calculated</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Protein/100g:</span>
                <span className="font-medium text-gray-900">{formData.proteinPer100}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Cal/100g:</span>
                <span className="font-medium text-gray-900">{formData.caloriesPer100}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Protein/CHF:</span>
                <span className="font-medium text-green-700">
                  {formData.price > 0 ? (formData.protein / formData.price).toFixed(2) : '0.00'}g
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Score:</span>
                <span className="font-medium text-gray-900">
                  {formData.price > 0 ? (
                    (formData.protein / formData.price * 10) +
                    (formData.taste * 3) -
                    (formData.caloriesPer100 * 0.1)
                  ).toFixed(1) : '0.0'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Save className="w-4 h-4" />
              {product ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal
