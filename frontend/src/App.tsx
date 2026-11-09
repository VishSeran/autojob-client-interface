import './App.css'
import { Route, Routes } from 'react-router-dom'
import LogIn from './features/auth/pages/login'
import Dashboard from './features/dashboard/page/dashboard'
import {Toaster} from "sonner"
import { ResumeProvider } from './contexts/ResumeContext'
import Resumes from './features/resumes/page/resumes'
import Workflow from './features/workflow/page/workflow'

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

        <Route 
          path='/resumes'
          element={
            <ResumeProvider>
              <Resumes />
            </ResumeProvider>
          }
        />

        <Route
          path='/workflows'
          element={<Workflow/>} 
        />

      </Routes>

      <Toaster
        position='top-right'
        richColors
        closeButton
        duration={6000}

      />
    </>
    


  );
}

export default App
