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
import EngenheiroListar from './components/engenheiro/Listar';
import EngenheiroAdicionar from './components/engenheiro/Adicionar';
import ObraListar from './components/obra/Listar';
import ObraAdicionar from './components/obra/Adicionar';
import StatusListar from './components/status/Listar';
import StatusAdicionar from './components/status/Adicionar';
import UsuarioListar from './components/usuario/Listar';
import UsuarioAdicionar from './components/usuario/Adicionar';
import TrilhoAlterar from './components/trilho/Alterar';
import MaterialAlterar from './components/material/Alterar';
import EquipamentoAlterar from './components/equipamento/Alterar';
import TipoManutencaoAlterar from './components/tipoManutencao/Alterar';
import ManutencaoAlterar from './components/manutencao/Alterar';
import EngenheiroAlterar from './components/engenheiro/Alterar';
import ObraAlterar from './components/obra/Alterar';
import StatusAlterar from './components/status/Alterar';
import UsuarioAlterar from './components/usuario/Alterar';


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
         <Route path="/editar/trilho/:id" element={<TrilhoAlterar/>}></Route>  
        {/* material */}
        <Route path="/listar/material" element={<MaterialListar/>}></Route>
        <Route path="/adicionar/material" element={<MaterialAdicionar/>}></Route>
        <Route path="/editar/material/:id" element={<MaterialAlterar/>}></Route>  
        {/* equipamento */}
        <Route path="/listar/equipamento" element={<EquipamentoListar/>}></Route>
        <Route path="/adicionar/equipamento" element={<EquipamentoAdicionar/>}></Route>
        <Route path="/editar/equipamento/:id" element={<EquipamentoAlterar/>}></Route>  
        {/* Tipo de manutenção */}
        <Route path="/listar/tipo-manutencao" element={<TipoManutencaoListar/>}></Route>
        <Route path="/adicionar/tipo-manutencao" element={<TipoManutencaoAdicionar/>}></Route>
        <Route path="/editar/tipo-manutencao/:id" element={<TipoManutencaoAlterar/>}></Route>  
        {/* Manutenção */}
        <Route path="/listar/manutencao" element={<ManutencaoListar/>}></Route>
        <Route path="/adicionar/manutencao" element={<ManutencaoAdicionar/>}></Route>
        <Route path="/editar/manutencao/:id" element={<ManutencaoAlterar/>}></Route>  
        {/* Engenheiro */}
        <Route path="/listar/engenheiro" element={<EngenheiroListar/>}></Route>
        <Route path="/adicionar/engenheiro" element={<EngenheiroAdicionar/>}></Route>
        <Route path="/editar/engenheiro/:id" element={<EngenheiroAlterar/>}></Route>  
        {/* Obra */}
        <Route path="/listar/obra" element={<ObraListar/>}></Route>
        <Route path="/adicionar/obra" element={<ObraAdicionar/>}></Route>
        <Route path="/editar/obra/:id" element={<ObraAlterar/>}></Route>  
        {/* Status */}
        <Route path="/listar/status" element={<StatusListar/>}></Route>
        <Route path="/adicionar/status" element={<StatusAdicionar/>}></Route>
        <Route path="/editar/status/:id" element={<StatusAlterar/>}></Route>  
        {/* Usuario */}
        <Route path="/listar/usuario" element={<UsuarioListar/>}></Route>
        <Route path="/adicionar/usuario" element={<UsuarioAdicionar/>}></Route>
        <Route path="/editar/usuario/:id" element={<UsuarioAlterar/>}></Route>  

    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
