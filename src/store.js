import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DORUKS_DATA = [
  {
    id: 1,
    name: "Pouletbrust-Filet",
    brand: "COUNTRY'S BE",
    location: "Aldi",
    taste: 7,
    price: 7.25,
    size: 500,
    protein: 115.0,
    calories: 510,
    proteinPer100: 23.0,
    caloriesPer100: 102
  },
  {
    id: 2,
    name: "Proteinbrot",
    brand: "Migros",
    location: "Migros",
    taste: 3,
    price: 3.30,
    size: 400,
    protein: 104.0,
    calories: 1192,
    proteinPer100: 26.0,
    caloriesPer100: 298
  },
  {
    id: 3,
    name: "High Protein Milk Drink",
    brand: "Milbona",
    location: "Lidl",
    taste: 9,
    price: 2.39,
    size: 1000,
    protein: 70.0,
    calories: 390,
    proteinPer100: 7.0,
    caloriesPer100: 39
  },
  {
    id: 4,
    name: "High Protein Milk Drink",
    brand: "Crane",
    location: "Aldi",
    taste: 9,
    price: 2.39,
    size: 1000,
    protein: 70.0,
    calories: 390,
    proteinPer100: 7.0,
    caloriesPer100: 39
  },
  {
    id: 5,
    name: "SKYR Nature",
    brand: "Milsani",
    location: "Aldi",
    taste: 5,
    price: 2.65,
    size: 500,
    protein: 55.0,
    calories: 320,
    proteinPer100: 11.0,
    caloriesPer100: 64
  },
  {
    id: 6,
    name: "High Protein Pudding Choco",
    brand: "Coop Q&P",
    location: "Coop",
    taste: 7,
    price: 3.85,
    size: 400,
    protein: 44.0,
    calories: 336,
    proteinPer100: 11.0,
    caloriesPer100: 84
  },
  {
    id: 7,
    name: "High Protein Raspberry",
    brand: "Oh!",
    location: "Migros",
    taste: 9,
    price: 1.95,
    size: 500,
    protein: 35.0,
    calories: 250,
    proteinPer100: 7.0,
    caloriesPer100: 50
  },
  {
    id: 8,
    name: "High Protein Vanilla Drink",
    brand: "Coop",
    location: "Coop",
    taste: 7,
    price: 2.00,
    size: 500,
    protein: 40.0,
    calories: 280,
    proteinPer100: 8.0,
    caloriesPer100: 56
  },
  {
    id: 9,
    name: "High Protein Drink Zero Vanille",
    brand: "Oh!",
    location: "Migros",
    taste: 8,
    price: 2.10,
    size: 500,
    protein: 36.5,
    calories: 310,
    proteinPer100: 7.3,
    caloriesPer100: 62
  },
  {
    id: 10,
    name: "High Protein Drink Vanille",
    brand: "Milbona",
    location: "Lidl",
    taste: 7,
    price: 1.35,
    size: 350,
    protein: 35.0,
    calories: 213.5,
    proteinPer100: 10.0,
    caloriesPer100: 61
  },
  {
    id: 11,
    name: "High Protein Toastbrot in Scheiben",
    brand: "Migros",
    location: "Migros",
    taste: 5,
    price: 2.25,
    size: 250,
    protein: 32.5,
    calories: 655,
    proteinPer100: 13.0,
    caloriesPer100: 262
  },
  {
    id: 12,
    name: "Mozzarella Light",
    brand: "Milbona",
    location: "Lidl",
    taste: 5,
    price: 0.95,
    size: 125,
    protein: 25.6,
    calories: 206.3,
    proteinPer100: 20.5,
    caloriesPer100: 165
  },
  {
    id: 13,
    name: "Cottage Cheese",
    brand: "Coop Q&P",
    location: "Coop",
    taste: 3,
    price: 1.40,
    size: 250,
    protein: 27.5,
    calories: 247.5,
    proteinPer100: 11.0,
    caloriesPer100: 99
  },
  {
    id: 14,
    name: "Protein Pudding Choco",
    brand: "Oh!",
    location: "Migros",
    taste: 8,
    price: 2.00,
    size: 200,
    protein: 20.0,
    calories: 160,
    proteinPer100: 10.0,
    caloriesPer100: 80
  },
  {
    id: 15,
    name: "Whey Protein Yoghurt Vanille",
    brand: "Oh!",
    location: "Migros",
    taste: 9,
    price: 1.60,
    size: 180,
    protein: 17.1,
    calories: 109.8,
    proteinPer100: 9.5,
    caloriesPer100: 61
  },
  {
    id: 16,
    name: "Thick Peas / Kichererbsen",
    brand: "M-Classic",
    location: "Migros",
    taste: 6,
    price: 1.10,
    size: 250,
    protein: 17.5,
    calories: 347.5,
    proteinPer100: 7.0,
    caloriesPer100: 139
  },
  {
    id: 17,
    name: "Red Thai Curry",
    brand: "Coop Q&P",
    location: "Coop",
    taste: 9,
    price: 2.90,
    size: 350,
    protein: 22.4,
    calories: 595,
    proteinPer100: 6.4,
    caloriesPer100: 170
  },
  {
    id: 18,
    name: "Red Thai Curry",
    brand: "M-Classic",
    location: "Migros",
    taste: 10,
    price: 3.00,
    size: 400,
    protein: 21.2,
    calories: 624,
    proteinPer100: 5.3,
    caloriesPer100: 156
  },
  {
    id: 19,
    name: "Penne Arrabiata",
    brand: "Chef Select",
    location: "Lidl",
    taste: 9,
    price: 2.79,
    size: 400,
    protein: 13.6,
    calories: 504,
    proteinPer100: 3.4,
    caloriesPer100: 126
  },
  {
    id: 20,
    name: "Banana Quark",
    brand: "M-Classic",
    location: "Migros",
    taste: 9,
    price: 0.60,
    size: 125,
    protein: 8.1,
    calories: 135,
    proteinPer100: 6.5,
    caloriesPer100: 108
  },
  {
    id: 21,
    name: "High Protein Drink Choco",
    brand: "Coop",
    location: "Coop",
    taste: 7,
    price: 1.95,
    size: 500,
    protein: 40.0,
    calories: 290,
    proteinPer100: 8.0,
    caloriesPer100: 58
  },
  {
    id: 22,
    name: "Whey Isolate Neutral",
    brand: "Lee-Sport",
    location: "Online",
    taste: 6,
    price: 31.90,
    size: 1000,
    protein: 900.0,
    calories: 3720,
    proteinPer100: 90.0,
    caloriesPer100: 372
  },
  {
    id: 23,
    name: "Ísey Skyr",
    brand: "Ísey",
    location: "Migros",
    taste: 6,
    price: 1.30,
    size: 170,
    protein: 16.15,
    calories: 134.3,
    proteinPer100: 9.5,
    caloriesPer100: 79
  },
  {
    id: 24,
    name: "Spaghetti Bolognese",
    brand: "M-Budget",
    location: "Migros",
    taste: 9,
    price: 2.80,
    size: 400,
    protein: 21.2,
    calories: 532,
    proteinPer100: 5.3,
    caloriesPer100: 133
  },
  {
    id: 25,
    name: "Poulet Mah Mee",
    brand: "M-Budget",
    location: "Migros",
    taste: 6,
    price: 3.75,
    size: 400,
    protein: 27.2,
    calories: 532,
    proteinPer100: 6.8,
    caloriesPer100: 133
  },
  {
    id: 26,
    name: "Chicken Nuggets",
    brand: "M-Budget",
    location: "Migros",
    taste: 8,
    price: 7.00,
    size: 750,
    protein: 105.0,
    calories: 1343,
    proteinPer100: 14.0,
    caloriesPer100: 179
  },
  {
    id: 27,
    name: "Pommes Frites",
    brand: "M-Budget",
    location: "Migros",
    taste: 8,
    price: 8.00,
    size: 2500,
    protein: 50.0,
    calories: 3650,
    proteinPer100: 2.0,
    caloriesPer100: 146
  },
  {
    id: 28,
    name: "Vegetable Meatballs",
    brand: "M-Budget",
    location: "Migros",
    taste: 7,
    price: 2.95,
    size: 220,
    protein: 41.8,
    calories: 332,
    proteinPer100: 19.0,
    caloriesPer100: 151
  }
]

const calculateScore = (product) => {
  const proteinPerCHF = product.protein / product.price
  return (
    (proteinPerCHF * 10) +
    (product.taste * 3) -
    ((product.caloriesPer100 || 0) * 0.1)
  ).toFixed(1)
}

const useStore = create(
  persist(
    (set, get) => ({
      products: [],
      isFirstTime: true,
      
      initWithDoruksData: () => {
        const productsWithScores = DORUKS_DATA.map(p => ({
          ...p,
          proteinPerCHF: (p.protein / p.price).toFixed(2),
          score: calculateScore(p)
        }))
        set({ products: productsWithScores, isFirstTime: false })
      },
      
      initEmpty: () => {
        set({ products: [], isFirstTime: false })
      },
      
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: Date.now(),
          proteinPerCHF: (product.protein / product.price).toFixed(2),
          score: calculateScore(product)
        }
        set(state => ({ products: [...state.products, newProduct] }))
      },
      
      updateProduct: (id, product) => {
        const updatedProduct = {
          ...product,
          proteinPerCHF: (product.protein / product.price).toFixed(2),
          score: calculateScore(product)
        }
        set(state => ({
          products: state.products.map(p => p.id === id ? updatedProduct : p)
        }))
      },
      
      deleteProduct: (id) => {
        set(state => ({
          products: state.products.filter(p => p.id !== id)
        }))
      },
      
      exportData: () => {
        const data = get().products
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `protein-tracker-${new Date().toISOString().split('T')[0]}.json`
        a.click()
      },
      
      importData: (data) => {
        const productsWithScores = data.map(p => ({
          ...p,
          proteinPerCHF: (p.protein / p.price).toFixed(2),
          score: calculateScore(p)
        }))
        set({ products: productsWithScores })
      },
      
      resetToWelcome: () => {
        set({ products: [], isFirstTime: true })
      }
    }),
    {
      name: 'protein-tracker-storage'
    }
  )
)

export default useStore