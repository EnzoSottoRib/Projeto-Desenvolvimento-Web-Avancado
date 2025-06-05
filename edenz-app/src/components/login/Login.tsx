import { useEffect ,useState } from 'react';
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../../css/Login.css";

interface LoginDTO {
  email: string;
  senha: string;
}

function Login(){
   const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  

  const verificarLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuario: LoginDTO = {
      email,
      senha,
    };

    try {
      const response = await fetch("http://localhost:5178/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("usuario", JSON.stringify(data));

        alert("Login realizado com sucesso!");
        navigate("/home"); // redireciona para a página home
      } else {
        const erroMsg = await response.text();
        setErro(erroMsg || "Email ou senha inválidos.");
        alert("Email ou senha inválidos!");
      }
    } catch (err) {
      setErro("Erro na comunicação com o servidor.");
      alert("Eddo não esperado, reinicie a página!");
      console.error(err);
    }
  };

    
    
    return <div className="login-container">
    <button className="back-button"><Link to ="/" style={{ textDecoration: "none", color: 'black'}}>← Voltar</Link></button>
    
    <form onSubmit={verificarLogin}>
    <h2>Login de Usuário</h2>

    <div className="input-container">
          <label>Email</label>
          <input
          autoComplete="off"
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
          autoComplete="off"
            placeholder="Digite sua Senha"
            type="password"
            id="senha"
            name="senha"
            onChange={(e: any) => setSenha(e.target.value)}
          />
        </div>
        
    

    <button className="btn login" >LOGIN</button>
  
    <button className="btn register"><Link to ="/usuario/cadastrar" style={{ textDecoration: "none", color: 'black'}}>Cadastrar</Link></button>

    
 
    </form>
  </div>
}

export default Login;