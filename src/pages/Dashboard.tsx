import React, { useState, useEffect } from 'react'
import { useData } from '../context/DataContext'
import DataTable from '../components/DataTable'
import ChartComponent from '../components/ChartComponent'
import StatCard from '../components/StatCard'
import SearchInput from '../components/SearchInput'

const DataTableMem = React.memo(DataTable);

const Dashboard: React.FC = () => {
  const [keyword, setKeyword] = useState('')
  const { items, loading, error } = useData({keyword})

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <SearchInput
        onChange={setKeyword}
        value={keyword}
        placeholder="Search..."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <StatCard color="blue" title="Total Users" value="1,234" />
        <StatCard color="green" title="Active Users" value="567" />
        <StatCard color="yellow" title="New Signups" value="89" />
      </div>
      {/* <ChartComponent data={items} type="bar" /> */}
      <DataTableMem loading={false} />
    </div>
  )
}

export default Dashboard
