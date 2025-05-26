import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Equipamento {
    id?: number;
    nome: string;
}

interface Material {
    id?: number;
    nome: string;
}

interface Obra {
    id?: number;
    IdUsuario: number; 
    IdEngenheiro: number;  
    IdStatus: number; 
    idTrilho: Number,  
    nome: string;
    trilhoQtd: string; 
    Localização: string;  
    DataInicio: string;
    DataFim : string;
    CustoPrevisto: number; 
    CustoReal : number; 
    Complexidade: string;
    ImpactoAmbiental : string;
    Descricao : string;
}

interface Manutencao {
  id: number;
  material?: Material;
  obra?: Obra;
  equipamento?: Equipamento;
  idObra: number;
  idMaterial: number;
  materialQtd: string;
  idEquipamento: number;
  equipamentoQtd: string;
  idTrilho: number;
  trilhoQtd: string;
  descricao: string;
  data: string;
}

function ManutencaoListar() {
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5178/api/manutencao")
      .then((res) => {
        setManutencoes(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar manutenções:", err);
        alert("Erro ao carregar manutenções.");
      });
  }, []);

  function deletarManutencao(id: number) {
    axios
      .delete(`http://localhost:5178/api/manutencao/${id}`)
      .then(() => {
        alert("Manutenção deletada com sucesso!");
        setManutencoes(manutencoes.filter(m => m.id !== id));
      })
      .catch((err) => {
        console.error("Erro ao deletar manutenção:", err);
        alert("Erro ao deletar manutenção.");
      });
  }

  return (
    <div className="form-container">
      <h1>Listar Manutenções</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Obra</th>
            <th>ID Material</th>
            <th>Qtd Material</th>
            <th>ID Equipamento</th>
            <th>Qtd Equipamento</th>
            <th>ID Trilho</th>
            <th>Qtd Trilho</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {manutencoes.map(manutencao => (
            <tr key={manutencao.id}>
              <td>{manutencao.id}</td>
              <td>{manutencao.obra?.nome}</td>
              <td>{manutencao.idMaterial}</td>
              <td>{manutencao.materialQtd}</td>
              <td>{manutencao.idEquipamento}</td>
              <td>{manutencao.equipamentoQtd}</td>
              <td>{manutencao.idTrilho}</td>
              <td>{manutencao.trilhoQtd}</td>
              <td>{manutencao.descricao}</td>
              <td>{manutencao.data}</td>
              <td>
                <button onClick={() => deletarManutencao(manutencao.id)}>Deletar</button>
              </td>
              <td>
                <Link to={`/editar/manutencao/${manutencao.id}`} className="btn-link">
                  Alterar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManutencaoListar;
