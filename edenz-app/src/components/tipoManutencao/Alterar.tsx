import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
//import "../css/Home.css";

interface Tipomanutencao {
    id?: number;
    nome: string;
}


function TipoManutencaoAlterar() {
  const { id } = useParams();
  const [tipoManutencao, setTipoManutencao] = useState<Tipomanutencao | null>(null);
  const [nome, setNome] = useState("");


  useEffect(() => {
    if (id) {
      axios
        .get<Tipomanutencao>(`http://localhost:5178/api/tipomanutencao/${id}`)
        .then((resposta) => {
          const tipoManutencaoData = resposta.data;
          setTipoManutencao(tipoManutencaoData);
          setNome(tipoManutencaoData.nome);
        })
        .catch((erro) => {
          console.error("Erro ao buscar tipos de manutenção:", erro);
        });
    }
  }, [id]);

  function enviarTipoManutencao(e: any) {
    e.preventDefault();

    const tipoManutencaoData: Tipomanutencao = {
      id: Number(id),
      nome
    };

    axios
      .put(`http://localhost:5178/api/tipomanutencao/${id}`, tipoManutencaoData)
      .then((resposta) => {
        console.log("Tipo de manutenção atualizado", resposta.data);
        alert("Tipo de manutenção atualizado!!!")
      })
      .catch((erro) => {
        console.error("Erro ao atualizar tipo de manutenção", erro);
      });
  }

  if (!tipoManutencao) return <div>Carregando...</div>; 

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Editar Tipo de Manutenção</h2>
      </div>
      <form onSubmit={enviarTipoManutencao}>
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

export default TipoManutencaoAlterar