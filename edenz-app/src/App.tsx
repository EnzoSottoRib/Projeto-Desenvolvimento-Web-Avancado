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
import Login from './components/login/Login';
import Cadastro from './components/login/Cadastro';
import Autenticar from './components/autenticacao/Autenticar';


function App() {
  return (
    <div id="app">
      <BrowserRouter>
       <header>
        <nav className="nav-bar">
            <h1>Edenz</h1>
            <ul>
                <li><Link to="/home">Home</Link></li>
                
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
                        <li><Link to="/listar/tipomanutencao">Listar</Link></li>
                        <li><Link to="/adicionar/tipomanutencao">Adicionar</Link></li>
                    </ul>
                </li>
                <li className="dropdown">   
                    <span className="dropdown-label">Usuario</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/listar/usuario">Listar</Link></li>
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
    {/* Raiz = Login */}
    <Route path="/" element={<Login />} />

    {/* Cadastro */}
    <Route path="/usuario/cadastrar" element={<Cadastro />} />

    {/* Home */}
    <Route path="/home" element={<Autenticar><Home /></Autenticar>} />

    {/* trilho */}
    <Route path="/listar/trilho" element={<TrilhoListar />}/>
    <Route path="/adicionar/trilho" element={<TrilhoAdicionar />}/>
    <Route path="/editar/trilho/:id" element={<TrilhoAlterar />}/>

    {/* material */}
    <Route path="/listar/material" element={<Autenticar><MaterialListar /></Autenticar>} />
    <Route path="/adicionar/material" element={<Autenticar><MaterialAdicionar /></Autenticar>} />
    <Route path="/editar/material/:id" element={<Autenticar><MaterialAlterar /></Autenticar>} />

    {/* equipamento */}
    <Route path="/listar/equipamento" element={<EquipamentoListar />}/>
    <Route path="/adicionar/equipamento" element={<EquipamentoAdicionar/>}/>
    <Route path="/editar/equipamento/:id" element={<EquipamentoAlterar />}/>

    {/* Tipo de manutenção */}
    <Route path="/listar/tipomanutencao" element={<Autenticar><TipoManutencaoListar /></Autenticar>} />
    <Route path="/adicionar/tipomanutencao" element={<Autenticar><TipoManutencaoAdicionar /></Autenticar>} />
    <Route path="/editar/tipomanutencao/:id" element={<Autenticar><TipoManutencaoAlterar /></Autenticar>} />

    {/* Manutenção */}
    <Route path="/listar/manutencao" element={<Autenticar><ManutencaoListar /></Autenticar>} />
    <Route path="/adicionar/manutencao" element={<Autenticar><ManutencaoAdicionar /></Autenticar>} />
    <Route path="/editar/manutencao/:id" element={<Autenticar><ManutencaoAlterar /></Autenticar>} />

    {/* Engenheiro */}
    <Route path="/listar/engenheiro" element={<EngenheiroListar />}/>
    <Route path="/adicionar/engenheiro" element={<EngenheiroAdicionar />}/>
    <Route path="/editar/engenheiro/:id" element={<EngenheiroAlterar />}/>

    {/* Obra */}
    <Route path="/listar/obra" element={<Autenticar><ObraListar /></Autenticar>} />
    <Route path="/adicionar/obra" element={<Autenticar><ObraAdicionar /></Autenticar>} />
    <Route path="/editar/obra/:id" element={<Autenticar><ObraAlterar /></Autenticar>} />

    {/* Status */}
    <Route path="/listar/status" element={<Autenticar><StatusListar /></Autenticar>} />
    <Route path="/adicionar/status" element={<Autenticar><StatusAdicionar /></Autenticar>} />
    <Route path="/editar/status/:id" element={<Autenticar><StatusAlterar /></Autenticar>} />

    {/* Usuario */}
    <Route path="/listar/usuario" element={<Autenticar><UsuarioListar /></Autenticar>} />
    <Route path="/editar/usuario/:id" element={<Autenticar><UsuarioAlterar /></Autenticar>} />
</Routes>

    </BrowserRouter>
   </div>
  );
}

export default App;
