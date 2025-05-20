import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
import axios from 'axios';
import "../../css/ComponentsCadastrar.css";

interface Trilho {
    id?: number;
    nome: string;
}

function TrilhoAdicionar() {

  const [trilhos, setTrilhos] = useState<Trilho[]>([]);
  const [nome, setNome] = useState("");

  function enviarTrilho(e: React.FormEvent) {
  e.preventDefault();

  const trilho: Trilho = {
    nome: nome,
  };

  fetch("http://localhost:5178/api/trilho", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trilho),
  })
  .then(async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erros de validação:", errorData.errors);
      alert(`Erro ao cadastrar: ${JSON.stringify(errorData.errors)}`);
      return;
    }
    return response.json();
  })
  .then((data) => {
    if (data) {
      console.log("Trilho cadastrado:", data);
      alert("Trilho Cadastrado");
      setNome(""); // Limpa o campo após cadastro
    }
  })
  .catch((error) => {
    console.error("Erro ao cadastrar trilho!", error);
    alert("Erro ao conectar com o servidor");
  });
}

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cadastro de Trilho</h2>
      </div>
      <form onSubmit={enviarTrilho}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            placeholder="Ex: TR-11"
            type="text"
            id="nome"
            value={nome}
            required
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default TrilhoAdicionar