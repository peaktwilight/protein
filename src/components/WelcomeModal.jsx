import React from 'react'
import { Package, UserPlus } from 'lucide-react'
import { STARTER_PRODUCTS_COUNT } from '../store'

function WelcomeModal({ onChooseDoruk, onStartFresh }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg max-w-sm w-full p-8 animate-slide-up">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
              <line x1="6" y1="17" x2="18" y2="17" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Protein Tracker
        </h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Find the cheapest high-protein foods at your local stores
        </p>

        <div className="space-y-3">
          <button
            onClick={onChooseDoruk}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Package className="w-4 h-4" />
            Start with Sample Data ({STARTER_PRODUCTS_COUNT} products)
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
