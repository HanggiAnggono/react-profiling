import { useState, useEffect } from 'react'
import { generateData } from '../utils/dataGenerator'

interface DataItem {
  id: number
  name: string
  value: number
  category: string
  status: 'active' | 'inactive' | 'pending'
  timestamp: string
}

export const useData = ({ keyword }: { keyword: string }) => {
  const [items, setItems] = useState<DataItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const refreshData = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setItems(generateData(500))
      setError(null)
    } catch (err) {
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()
  }, []) // Bottleneck: Unnecessarily refreshes data on counter change

  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(keyword.toLowerCase())
  })

  // Bottleneck: Creating a new object on every render
  const value = {
    items: filteredItems,
    loading,
    error,
    refreshData,
  }

  return value
}
