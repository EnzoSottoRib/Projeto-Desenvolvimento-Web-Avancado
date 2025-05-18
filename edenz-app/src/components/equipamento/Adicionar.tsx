import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
// import "../css/Home.css";

interface Equipamento {
    id?: number;
    nome: string;
}

function EquipamentoAdicionar() {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [nome, setNome] = useState("");


  function enviarEquipamento(e: React.FormEvent) {
    e.preventDefault();

    const equipamento: Equipamento = {
      nome,
    };

        fetch("http://localhost:5178/api/equipamento", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(equipamento),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Equipamento cadastrado:", data);
            alert("Equipamento Cadastrado");
        })
        .catch((error) => {
            console.error("Erro ao cadastrar equipamento!", error);
        });
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cadastro de Equipamento</h2>
      </div>
      <form onSubmit={enviarEquipamento}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            placeholder="Ex: EPI"
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

export default EquipamentoAdicionar