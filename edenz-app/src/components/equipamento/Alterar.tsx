import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
// import "../css/Home.css";

interface Equipamento {
    id?: number;
    nome: string;
}


function EquipamentoAlterar() {
  const { id } = useParams();
  const [equipamento, setEquipamento] = useState<Equipamento | null>(null);
  const [nome, setNome] = useState("");


  useEffect(() => {
    if (id) {
      axios
        .get<Equipamento>(`http://localhost:5178/api/equipamento/${id}`)
        .then((resposta) => {
          const equipamentoData = resposta.data;
          setEquipamento(equipamentoData);
          setNome(equipamentoData.nome);
        })
        .catch((erro) => {
          console.error("Erro ao buscar equipamentos", erro);
        });
    }
  }, [id]);

  function enviarEquipamento(e: any) {
    e.preventDefault();

    const equipamentoData: Equipamento = {
      id: Number(id),
      nome
    };

    axios
      .put(`http://localhost:5178/api/equipamento/${id}`, equipamentoData)
      .then((resposta) => {
        console.log("Equipamento atualizado", resposta.data);
        alert("Equipamento atualizado!!!")
      })
      .catch((erro) => {
        console.error("Erro ao atualizar equipamento", erro);
      });
  }

  if (!equipamento) return <div>Carregando...</div>; 

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Editar Equipamento</h2>
      </div>
      <form onSubmit={enviarEquipamento}>
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

export default EquipamentoAlterar