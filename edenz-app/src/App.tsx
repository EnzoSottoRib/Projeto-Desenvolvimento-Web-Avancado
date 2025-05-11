import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Home from "./components/home/Home";
import TrilhoListar from './components/trilho/Listar';
import TrilhoAdicionar from './components/trilho/Adicionar';
import MaterialListar from './components/material/Listar';
import MaterialAdicionar from './components/material/Adicionar';
import EquipamentoListar from './components/equipamento/Listar';
import EquipamentoAdicionar from './components/equipamento/Adicionar';
import TipoManutencaoListar from './components/tipoManutencao/Listar';
import TipoManutencaoAdicionar from './components/tipoManutencao/Adicionar';
import ManutencaoListar from './components/manutencao/Listar';
import ManutencaoAdicionar from './components/manutencao/Adicionar';


function App() {
  return (
    <div id="app">
      <BrowserRouter>
       <header>
        <nav className="nav-bar">
            <h1>Edenz</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                
                <li className="dropdown">   
                    <span className="dropdown-label">Trilho</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/trilho">Listar</Link></li>
                        <li><Link to="/adicionar/trilho">Adicionar</Link></li>
                    </ul>
                </li>

                <li className="dropdown">   
                    <span className="dropdown-label">Engenheiro</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/engenheiro">Listar</Link></li>
                        <li><Link to="/adicionar/engenheiro">Adicionar</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                <span className="dropdown-label">Equipamento</span>
                <ul className="dropdown-menu">
                    <li><Link to="/listar/equipamento">Listar</Link></li>
                    <li><Link to="/adicionar/equipamento">Adicionar</Link></li>
                </ul>
                </li>

                <li className="dropdown">
                <span className="dropdown-label">Manutencao</span>
                <ul className="dropdown-menu">
                    <li><Link to="/listar/manutencao">Listar</Link></li>
                    <li><Link to="/adicionar/manutencao">Adicionar</Link></li>
                </ul>
                </li>

                <li className="dropdown">   
                    <span className="dropdown-label">Obra</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/obra">Listar</Link></li>
                        <li><Link to="/adicionar/obra">Adicionar</Link></li>
                    </ul>
                </li>

                <li className="dropdown">   
                    <span className="dropdown-label">Status</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/status">Listar</Link></li>
                        <li><Link to="/adicionar/status">Adicionar</Link></li>
                    </ul>
                </li>
                <li className="dropdown">   
                    <span className="dropdown-label">Tipo de manutenção</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/tipo-manutencao">Listar</Link></li>
                        <li><Link to="/adicionar/tipo-manutencao">Adicionar</Link></li>
                    </ul>
                </li>
                <li className="dropdown">   
                    <span className="dropdown-label">Usuario</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/usuario">Listar</Link></li>
                        <li><Link to="/adicionar/usuario">Adicionar</Link></li>
                    </ul>
                </li>
                <li className="dropdown">   
                    <span className="dropdown-label">Material</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/material">Listar</Link></li>
                        <li><Link to="/adicionar/material">Adicionar</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
   
    <Routes>
    <Route path="/" element={<Home/>}></Route>

        {/* trilho */}
        <Route path="/listar/trilho" element={<TrilhoListar/>}></Route>
        <Route path="/adicionar/trilho" element={<TrilhoAdicionar/>}></Route>
        {/* material */}
        <Route path="/listar/material" element={<MaterialListar/>}></Route>
        <Route path="/adicionar/material" element={<MaterialAdicionar/>}></Route>
        {/* equipamento */}
        <Route path="/listar/equipamento" element={<EquipamentoListar/>}></Route>
        <Route path="/adicionar/equipamento" element={<EquipamentoAdicionar/>}></Route>
        {/* Tipo de manutenção */}
        <Route path="/listar/tipo-manutencao" element={<TipoManutencaoListar/>}></Route>
        <Route path="/adicionar/tipo-manutencao" element={<TipoManutencaoAdicionar/>}></Route>
        {/* Manutenção */}
        <Route path="/listar/manutencao" element={<ManutencaoListar/>}></Route>
        <Route path="/adicionar/manutencao" element={<ManutencaoAdicionar/>}></Route>

    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
