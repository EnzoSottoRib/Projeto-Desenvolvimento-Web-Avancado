import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
//import "../css/Home.css";

interface Material {
    id?: number;
    nome: string;
}


function MaterialAlterar() {
  const { id } = useParams();
  const [material, setMaterial] = useState<Material | null>(null);
  const [nome, setNome] = useState("");


  useEffect(() => {
    if (id) {
      axios
        .get<Material>(`http://localhost:5178/api/material/${id}`)
        .then((resposta) => {
          const trilhoData = resposta.data;
          setMaterial(trilhoData);
          setNome(trilhoData.nome);
        })
        .catch((erro) => {
          console.error("Erro ao buscar materiais!", erro);
        });
    }
  }, [id]);

  function enviarTrilho(e: any) {
    e.preventDefault();

    const materialData: Material = {
      id: Number(id),
      nome
    };

    axios
      .put(`http://localhost:5178/api/material/${id}`, materialData)
      .then((resposta) => {
        console.log("Material atualizado", resposta.data);
        alert("Material Atualizado!!!")
      })
      .catch((erro) => {
        console.error("Erro ao atualizar material", erro);
      });
  }

  if (!material) return <div>Carregando...</div>; 

   return (
    
    <div className="form-container">
      <div className="form-header">
        <h2>Editar Material</h2>
      </div>
      <form onSubmit={enviarTrilho}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
       
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
   );
}

export default MaterialAlterar