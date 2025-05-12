import { useState } from "react";
import { Link } from "react-router-dom";
import fotoLogo from "../img/logoHome.jpg";
import React from "react";

interface Usuario {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  tipo: number; 
}

function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");

  const [errors, setErrors] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    repetirSenha: "",
  });

  

  function cadastrarUsuario(e: any) {
    e.preventDefault();

    let novoErro = {
      nome: nome ? "" : "Nome é obrigatório!",
      cpf: cpf ? "" : "CPF é obrigatório!",
      email: email ? "" : "E-mail é obrigatório!",
      senha: senha ? "" : "Senha é obrigatória!",
      repetirSenha: repetirSenha
        ? senha === repetirSenha
          ? ""
          : "As senhas não coincidem!"
        : "Confirmação de senha é obrigatória!",
    };

    setErrors(novoErro);

    // Se algum campo estiver vazio, não envia o formulário
    if (Object.values(novoErro).some((msg) => msg !== "")) {
      return;
    }

    const usuario: Usuario = {
      nome: nome,
      cpf: cpf,
      email: email,
      senha: senha,
      tipo: 0
    };

    fetch("http://localhost:5104/api/usuario/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((resposta) => resposta.json())
      .then((usuario) => {
        console.log("Usuário cadastrado", usuario);
        alert("Usuário cadastrado com sucesso!");
      });
  }

  return (
    <div className="login-container">
      <button className="back-button">
        <Link to="/Login" style={{ textDecoration: "none", color: "black" }}>
          ← Voltar
        </Link>
      </button>
      <img
        src={fotoLogo}
        alt="Sistema de Denúncias Ambientais"
        className="cadastro-logo"
      />

      <form onSubmit={cadastrarUsuario}>
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
          {errors.nome && <span className="error">{errors.nome}</span>}
        </div>

        <div className="input-container">
          <label>CPF</label>
          <input
            placeholder="Digite seu CPF"
            type="text"
            id="cpf"
            name="cpf"
            onChange={(e) => setCpf(e.target.value)}
          />
          {errors.cpf && <span className="error">{errors.cpf}</span>}
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
          {errors.email && <span className="error">{errors.email}</span>}
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
          {errors.senha && <span className="error">{errors.senha}</span>}
        </div>

        <div className="input-container">
          <label>Repita sua senha</label>
          <input
            type="password"
            placeholder="Digite sua Senha Novamente"
            onChange={(e) => setRepetirSenha(e.target.value)}
          />
          {errors.repetirSenha && (
            <span className="error">{errors.repetirSenha}</span>
          )}
        </div>

        <button type="submit" className="btn register">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
