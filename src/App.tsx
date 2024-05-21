import React from 'react';
import useFetchData from './hook/fetchData';
import './App.css'

const App: React.FC = () => {
  const {data, isLoading, error} = useFetchData();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error?.message}</div>
  }

  return (
    <div>
      <h1>Fetch Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App
