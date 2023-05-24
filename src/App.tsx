import { useState, createContext, useEffect } from 'react'
import { BrowserRouter ,Routes, Route } from "react-router-dom"
import Fakturor from './pages/Fakturor'
import Faktura from './pages/Faktura'
import CreateTaskAndProject from './pages/CreateTaskAndProject'
import CreateInvoice from './pages/CreateInvoice'
import TImetrack from './pages/Timetrack'
import TIdTagningar from './pages/TIdTagningar'
import './App.css'

export const contextApp = createContext()

function App() {
  

  const [count, setCount] = useState(0)
  const [taskData, setTaskData] = useState()
  const [projectData, setprojectData] = useState()
  
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
    .then( results => results.json()
    ).then(data => setTaskData(data))
  
    fetch('http://localhost:3000/projects')
    .then( results => results.json()
    ).then(data => setprojectData(data))
  },[])
 

  return (
    <>
    <contextApp.Provider value={taskData}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<CreateTaskAndProject/>}/>
      <Route path="/fakturor" element={<Fakturor/>}/>
      <Route path="/tid" element={<TImetrack/>}/>
      <Route path="/tidlista" element={<TIdTagningar/>}/>
      <Route path="/skapa" element={<CreateInvoice/>}/>
      <Route path="/faktura/:id" element={<Faktura/>}/>
    </Routes>
    </BrowserRouter>
  </contextApp.Provider>
    </>
  )
}

export default App
