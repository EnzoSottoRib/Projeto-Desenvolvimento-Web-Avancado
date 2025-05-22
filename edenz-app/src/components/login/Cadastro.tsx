import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import fotoTrem from '../../img/trem.jpg';

interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string
}

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      alert(mensagem)
      return;
    }

    const novoUsuario: Usuario = {
      nome,
      email,
      senha,
      cpf,
    };

    try {
      const response = await fetch("http://localhost:5178/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
        setCpf("");
        alert(mensagem);
      } else {
        const erroMsg = await response.text();
        setMensagem(`Erro: ${erroMsg}`);
        alert(mensagem);
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setMensagem("Erro na comunicação com o servidor.");
      alert(mensagem);
    }
  };


  return (
    <div className="login-container">
      <button className="back-button">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          ← Voltar
        </Link>
      </button>
      <img
        src={fotoTrem}
        alt="Sistema de Denúncias Ambientais"
        className="cadastro-logo"
        width={380}
      />

      <form onSubmit={handleSubmit}>
        <h2>Cadastro de Usuário</h2>

        <div className="input-container">
          <label>Nome</label>
          <input
            placeholder="Digite seu Nome"
            type="text"
            id="nome"
            name="nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Cpf</label>
          <input
            placeholder="Digite seu Cpf"
            type="text"
            id="cpf"
            name="cpf"
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>

       
        <div className="input-container">
          <label>Email</label>
          <input
            placeholder="Digite seu Email"
            type="text"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>Senha</label>
          <input
            placeholder="Digite sua Senha"
            type="password"
            id="senha"
            name="senha"
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>Repita sua senha</label>
          <input
            type="password"
            placeholder="Digite sua Senha Novamente"
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>

        <button type="submit" className="btn register">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
