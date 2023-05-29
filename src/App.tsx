import { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fakturor from './pages/Fakturor';
import Faktura from './pages/Faktura';
import CreateTaskAndProject from './pages/CreateTaskAndProject';
import CreateInvoice from './pages/CreateInvoice';
import TImetrack from './pages/Timetrack';
import TIdTagningar from './pages/TIdTagningar';
import AllTasks from './pages/Alltasks';
import AllProjects from './pages/AllProjects';
import Overblick from './pages/Overblick';
import { Outlet, Link } from "react-router-dom";

import './App.css';

interface ContextApp {
  taskData: {
      name: string,
      id: number
  };
  setTaskData: React.Dispatch<any>;
  projectData: {
    name: string,
    id: number
  };
  setProjectData: React.Dispatch<any>;
  timeData: any;
  setTimeData: React.Dispatch<any>;
  invoiceData: any;
  setInvoiceData: React.Dispatch<any>;
}

export const contextApp = createContext<ContextApp | null>(null);

function App() {
  const [taskData, setTaskData] = useState<any>();
  const [projectData, setProjectData] = useState<any>();
  const [timeData, setTimeData] = useState<any>();
  const [invoiceData, setInvoiceData] = useState<any>();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(results => results.json())
      .then(data => setTaskData(data));

    fetch('http://localhost:3000/projects')
      .then(results => results.json())
      .then(data => setProjectData(data));

    fetch('http://localhost:3000/timelog')
      .then(results => results.json())
      .then(data => setTimeData(data));

    fetch('http://localhost:3000/invoice')
      .then(results => results.json())
      .then(data => setInvoiceData(data));
  }, []);

  function openMenu() {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  }

  return (
    <>
      <contextApp.Provider value={{ taskData, setTaskData, projectData, setProjectData, timeData, setTimeData, invoiceData, setInvoiceData }}>
        <BrowserRouter>
          <div
            onClick={openMenu}
            className="MenyToggle"
          >
            |||
          </div>
          <div className="navDesktop">
            <Link to="">Skapa task/projekt</Link>
            <Link to="/tid">Tidtagning</Link>
            <Link to="/fakturor">Fakturor</Link>
            <Link to="/skapa">Skapa faktura</Link>
            <Link to="/allprojects">Alla projekt</Link>
            <Link to="/alltasks">Alla task</Link>
            <Link to="/tidlista">Tidlogg</Link>
            <Link to="/overblick">Överblick</Link>
          </div>
          {menuOpen &&
            <div className="navDesktopMobile">
              <Link to="">Skapa task/projekt</Link>
              <Link to="/tid">Tidtagning</Link>
              <Link to="/fakturor">Fakturor</Link>
              <Link to="/skapa">Skapa faktura</Link>
              <Link to="/allprojects">Alla projekt</Link>
              <Link to="/alltasks">Alla task</Link>
              <Link to="/tidlista">Tidlogg</Link>
              <Link to="/overblick">Överblick</Link>
            </div>
          }

          <Routes>
            <Route path="/" element={<CreateTaskAndProject />} />
            <Route path="/fakturor" element={<Fakturor />} />
            <Route path="/tid" element={<TImetrack />} />
            <Route path="/tidlista" element={<TIdTagningar />} />
            <Route path="/skapa" element={<CreateInvoice />} />
            <Route path="/faktura/:id" element={<Faktura />} />
            <Route path="/alltasks" element={<AllTasks />} />
            <Route path="/allprojects" element={<AllProjects />} />
            <Route path="/overblick" element={<Overblick />} />
          </Routes>
        </BrowserRouter>
      </contextApp.Provider>
    </>
  );
}

export default App;

