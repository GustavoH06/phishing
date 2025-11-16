<<<<<<< HEAD:phishing/phishing-front/src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import SideNav from '/src/components/Modules/sidenav/SideNav.jsx'
import ProtectedRoute from '/src/components/Modules/ProtectedRoute/ProtectedRoute.jsx'
import Login from './components/Pages/Login/Login';

import Home from './components/Pages/Home/Home';
import CampanhaGerencia from './components/Pages/CampanhaFiltros/CampanhaGerencia';
import CampanhaInfo from './components/Pages/CampanhaInfo/CampanhaInfo';
import CampanhaCriar from './components/Pages/CampanhaCriar/CampanhaCriar';
import GrupoCriar from './components/Pages/GrupoCriar/GrupoCriar';
import GruposGerencia from './components/Pages/GruposGerenciar/GruposGerencia';
=======
import { Routes, Route } from "react-router-dom";
import SideNav from '/src/components/Modules/sidenav/SideNav.jsx'
import Home from './components/Pages/Home/Home';
import CampanhaGerencia from './components/Pages/CampanhaGerencia/CampanhaGerencia';
import CampanhaInfo from './components/Pages/CampanhaInfo/CampanhaInfo';
import CampanhaCriar from './components/Pages/CampanhaCriar/CampanhaCriar';
import GrupoCriar from './components/Pages/GrupoCriar/GrupoCriar';
import GrupoGerencia from './components/Pages/GruposGerenciar/GrupoGerencia';
>>>>>>> 647d9699611897686f5400d42287f1a397ff634f:phishing/phishing-front/phishingfront/src/App.jsx
import TemplatesGerencia from "./components/Pages/TemplateGerenci/TemplatesGerencia";
import TemplateCriar from "./components/Pages/TemplateCriar/TemplateCriar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar autenticação ao carregar o app
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className='container'>
      {isAuthenticated && <SideNav />}
      
      <Routes>
<<<<<<< HEAD:phishing/phishing-front/src/App.jsx
        <Route path="/login" element={<Login />} />
        
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path="/campanhaGerencia" element={
          <ProtectedRoute>
            <CampanhaGerencia/>
          </ProtectedRoute>
        } />
        
        <Route path="/campanhaInfo" element={
          <ProtectedRoute>
            <CampanhaInfo />
          </ProtectedRoute>
        } />
        
        <Route path="/campanhaCriar" element={
          <ProtectedRoute>
            <CampanhaCriar />
          </ProtectedRoute>
        } />
        
        <Route path="/gruposGerencia" element={
          <ProtectedRoute>
            <GruposGerencia />
          </ProtectedRoute>
        } />
        
        <Route path="/gruposCriar" element={
          <ProtectedRoute>
            <GrupoCriar />
          </ProtectedRoute>
        } />
        
        <Route path="/templateGerencia" element={
          <ProtectedRoute>
            <TemplatesGerencia />
          </ProtectedRoute>
        } />
        
        <Route path="/templateCriar" element={
          <ProtectedRoute>
            <TemplateCriar />
          </ProtectedRoute>
        } />
        
        <Route path="/" element={<Navigate to="/home" replace />} />
=======
        <Route path="/home" element={<Home />} />
        <Route path="/campanhaGerencia" element={<CampanhaGerencia/>} />
        <Route path="/campanhaInfo" element={<CampanhaInfo />} />
        <Route path="/campanhaCriar" element={<CampanhaCriar />} />
        <Route path="/campanhaInfo" element={<CampanhaInfo />} />
        <Route path="/grupoGerencia" element={<GrupoGerencia />} />
        <Route path="/grupoCriar" element={<GrupoCriar /> } />
        <Route path="/templateGerencia" element={<TemplatesGerencia />} />
        <Route path="/templateCriar" element={<TemplateCriar />} />
>>>>>>> 647d9699611897686f5400d42287f1a397ff634f:phishing/phishing-front/phishingfront/src/App.jsx
      </Routes>
    </div>
  );
}

export default App;