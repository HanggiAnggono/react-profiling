import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto p-4">
            <Dashboard />
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
