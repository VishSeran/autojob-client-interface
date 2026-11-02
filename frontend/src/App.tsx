import './App.css'
import { Route, Routes } from 'react-router-dom'
import LogIn from './features/auth/pages/login'
import Dashboard from './features/dashboard/page/dashboard'
import {Toaster} from "sonner"

function App() {
  

  return (

    <>

      <Routes>

        <Route
          path='/login'
          element={<LogIn/>}
        />

        <Route 
          path='/dashboard'
          element={<Dashboard />}
        />

      </Routes>

      <Toaster
        position='top-right'
        richColors
        closeButton
        duration={4000}

      />
    </>
    


  );
}

export default App
