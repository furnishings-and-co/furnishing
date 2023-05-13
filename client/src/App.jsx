import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { RRoutes } from './components/Routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
   <RRoutes/>
    </div>
  )
}

export default App
