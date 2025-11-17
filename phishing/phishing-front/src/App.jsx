import { Routes, Route } from "react-router-dom";
import SideNav from '/src/components/Modules/sidenav/SideNav.jsx'
import Home from './components/Pages/Home/Home';
import CampanhaGerencia from './components/Pages/CampanhaGerencia/CampanhaGerencia';
import CampanhaInfo from './components/Pages/CampanhaInfo/CampanhaInfo';
import CampanhaCriar from './components/Pages/CampanhaCriar/CampanhaCriar';
import GrupoCriar from './components/Pages/GrupoCriar/GrupoCriar';
import TemplatesGerencia from "./components/Pages/TemplateGerencia/TemplatesGerencia";
import TemplateCriar from "./components/Pages/TemplateCriar/TemplateCriar";
import LoginAdmin from "./components/Pages/Login/Login";
import GrupoGerencia from "./components/Pages/GrupoGerenciar/GrupoGerencia.jsx";


function App() {
  return (
    <div className='container'>
      
      <SideNav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/campanhaGerencia" element={<CampanhaGerencia/>} />
        <Route path="/campanhaInfo" element={<CampanhaInfo />} />
        <Route path="/campanhaCriar" element={<CampanhaCriar />} />
        <Route path="/campanhaInfo" element={<CampanhaInfo />} />
        <Route path="/campanha/:id" element={<CampanhaInfo />} />
        <Route path="/grupoGerencia" element={<GrupoGerencia />} />
        <Route path="/grupoCriar" element={<GrupoCriar /> } />
        <Route path="/templateGerencia" element={<TemplatesGerencia />} />
        <Route path="/templateCriar" element={<TemplateCriar />} />
        <Route path="/login" element={<LoginAdmin />} />
      </Routes>
    </div>
  );
}

export default App;