import React from 'react'
import { Package, UserPlus } from 'lucide-react'
import { STARTER_PRODUCTS_COUNT } from '../store'

function WelcomeModal({ onChooseDoruk, onStartFresh }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg max-w-sm w-full p-8 animate-slide-up">
        {/* Swiss Cross */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="w-8 h-8 text-white" fill="currentColor">
              <rect x="13" y="6" width="6" height="20" />
              <rect x="6" y="13" width="20" height="6" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Swiss Protein Tracker
        </h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Track protein, hit goals, save money
        </p>

        <div className="space-y-3">
          <button
            onClick={onChooseDoruk}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Package className="w-4 h-4" />
            Start with {STARTER_PRODUCTS_COUNT} Products
          </button>
          <button
            onClick={onStartFresh}
            className="w-full py-3 px-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Start Fresh
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          Free • No ads • No signup
        </p>
      </div>
    </div>
  )
}

export default WelcomeModal
