import { useEffect ,useState } from 'react';
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  tipo: number; 
}

function Login(){
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioEnviar, setUsuarioEnviar] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [id, setId] = useState(0);
  const navigate = useNavigate();

  

  useEffect(() => {
    // Simulação de uma chamada à API para buscar os usuários cadastrados
    fetch("http://localhost:5104/api/usuario/listar") // Altere para a URL correta da sua API
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  }, []);

    function enviarEmail(e: React.FormEvent) {
      e.preventDefault();

      if (email === '') {
        alert("Preencha todos os campos");
        return;
      }

      const templateParams = {
        from_name: "Sistema De Denúncias Ambientais(SDA)",
        email: email
      } 

    }


    function verificarCadastro(e: React.FormEvent) {
      e.preventDefault();

      let usuarioEncontrado = false;

     
    
      usuarios.forEach((usuario) => {
        if (usuario.email === email && usuario.senha === senha) {
          usuarioEncontrado = true;
          setId(usuario.id);
          // setUsuarioEnviar(usuario);
          console.log("Usuario: " + id)
        }
      });
    
      if (usuarioEncontrado) {
        // alert("Login bem-sucedido!");
        //  <Link to={`/denuncia/${id}`} className="btn-link">
                                    
        //                          </Link>
        console.log("ID denuncia: " + id);
        navigate(`/denuncia/${id}`);
      } else {
        alert("Email ou senha incorretos!");
      }
    }

    
    
    return <div className="login-container">
    <button className="back-button"><Link to ="/" style={{ textDecoration: "none", color: 'black'}}>← Voltar</Link></button>
    {/* <img src={fotoLogo} alt="Sistema de Denúncias Ambientais" className="login-logo" /> */}
    
    <form onSubmit={verificarCadastro}>
    <h2>Login de Usuário</h2>

    <div className="input-container">
          <label>Email</label>
          <input
            placeholder="Digite seu Email"
            type="text"
            id="email"
            name="email"
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>Senha</label>
          <input
            placeholder="Digite sua Senha"
            type="password"
            id="senha"
            name="senha"
            onChange={(e: any) => setSenha(e.target.value)}
          />
        </div>
        
    

    <button className="btn login" >LOGIN</button>
    </form>
    <button className="btn register"><Link to ="/cadastro" style={{ textDecoration: "none", color: 'black'}}>Cadastrar</Link></button>
    <form onSubmit={enviarEmail}>
    
    <button style={{ backgroundColor: "black"}}>Esqueceu sua senha?</button>
    </form>
  </div>
}

export default Login;