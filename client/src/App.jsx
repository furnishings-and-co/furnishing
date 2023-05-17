import { useState } from 'react'
import './App.css'
import { RRoutes } from './components/Routes'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <RRoutes count={count} setCount={setCount}/>
    </div>
  )
}

export default App
