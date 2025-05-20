import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
// import "../css/Home.css";


interface Material {
    id?: number;
    nome: string;
}

function MaterialAdicionar() {
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [nome, setNome] = useState("");


  function enviarMaterial(e: React.FormEvent) {
    e.preventDefault();

    const material: Material = {
      nome,
    };

        fetch("http://localhost:5178/api/material", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(material),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Material cadastrado:", data);
            alert("Material Cadastrado");
        })
        .catch((error) => {
            console.error("Erro ao cadastrar material!", error);
        });
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cadastro de Material</h2>
      </div>
      <form onSubmit={enviarMaterial}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            placeholder="Ex: Aço"
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

export default MaterialAdicionar