import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Home from "./components/Home";


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
                        <li><Link to="/listar/arqueologo">Listar</Link></li>
                        <li><Link to="/adicionar/arqueologo">Adicionar</Link></li>
                    </ul>
                </li>

                <li className="dropdown">   
                    <span className="dropdown-label">Engenheiro</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/paleontologo">Listar</Link></li>
                        <li><Link to="/adicionar/paleontologo">Adicionar</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                <span className="dropdown-label">Equipamento</span>
                <ul className="dropdown-menu">
                    <li><Link to="/listar/fossil">Listar</Link></li>
                    <li><Link to="/adicionar/fossil">Adicionar</Link></li>
                </ul>
                </li>

                <li className="dropdown">
                <span className="dropdown-label">Manutencao</span>
                <ul className="dropdown-menu">
                    <li><Link to="/listar/artefato">Listar</Link></li>
                    <li><Link to="/adicionar/artefato">Adicionar</Link></li>
                </ul>
                </li>

                <li className="dropdown">   
                    <span className="dropdown-label">Obra</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/areaEspecializacao">Listar</Link></li>
                        <li><Link to="/adicionar/areaEspecializacao">Adicionar</Link></li>
                    </ul>
                </li>

                <li className="dropdown">   
                    <span className="dropdown-label">Status</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/formacaoAcademica">Listar</Link></li>
                        <li><Link to="/adicionar/formacaoAcademica">Adicionar</Link></li>
                    </ul>
                </li>
                <li className="dropdown">   
                    <span className="dropdown-label">Tipo de manutenção</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/formacaoAcademica">Listar</Link></li>
                        <li><Link to="/adicionar/formacaoAcademica">Adicionar</Link></li>
                    </ul>
                </li>
                <li className="dropdown">   
                    <span className="dropdown-label">Usuario</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/formacaoAcademica">Listar</Link></li>
                        <li><Link to="/adicionar/formacaoAcademica">Adicionar</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
   
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
