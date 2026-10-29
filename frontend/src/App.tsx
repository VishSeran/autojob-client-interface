import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LogIn from './features/auth/pages/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <Routes>

      <Route
        path='/login'
        element={<LogIn/>}
      />

    </Routes>
  );
}

export default App
