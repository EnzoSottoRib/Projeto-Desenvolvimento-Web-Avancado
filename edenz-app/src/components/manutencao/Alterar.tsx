import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Manutencao {
  id: number;
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

function ManutencaoAlterar() {
  const { id } = useParams();
  const [manutencao, setManutencao] = useState<Manutencao | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Manutencao>(`http://localhost:5178/api/manutencao/${id}`)
        .then((res) => {
          setManutencao(res.data);
        })
        .catch((err) => {
          console.error('Erro ao buscar manutenção:', err);
          alert('Erro ao buscar manutenção.');
        });
    }
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id: fieldId, value } = e.target;
    if (manutencao) {
      setManutencao({ ...manutencao, [fieldId]: fieldId.includes('id') ? Number(value) : value });
    }
  }

  function enviarAtualizacao(e: React.FormEvent) {
    e.preventDefault();
    if (manutencao) {
      axios
        .put(`http://localhost:5178/api/manutencao/${id}`, manutencao)
        .then((res) => {
          console.log('Manutenção atualizada:', res.data);
          alert('Manutenção atualizada com sucesso!');
        })
        .catch((err) => {
          console.error('Erro ao atualizar manutenção:', err);
          alert('Erro ao atualizar manutenção.');
        });
    }
  }

  if (!manutencao) return <div>Carregando...</div>;

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Editar Manutenção</h2>
      </div>
      <form onSubmit={enviarAtualizacao}>
        <div className="form-group">
          <label htmlFor="idObra">ID da Obra</label>
          <input type="number" id="idObra" value={manutencao.idObra} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="idMaterial">ID do Material</label>
          <input type="number" id="idMaterial" value={manutencao.idMaterial} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="materialQtd">Quantidade de Material</label>
          <input type="text" id="materialQtd" value={manutencao.materialQtd} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="idEquipamento">ID do Equipamento</label>
          <input type="number" id="idEquipamento" value={manutencao.idEquipamento} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="equipamentoQtd">Quantidade de Equipamento</label>
          <input type="text" id="equipamentoQtd" value={manutencao.equipamentoQtd} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="idTrilho">ID do Trilho</label>
          <input type="number" id="idTrilho" value={manutencao.idTrilho} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="trilhoQtd">Quantidade de Trilho</label>
          <input type="text" id="trilhoQtd" value={manutencao.trilhoQtd} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea id="descricao" value={manutencao.descricao} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="data">Data</label>
          <input type="text" id="data" placeholder="dd/mm/aaaa" value={manutencao.data} onChange={handleChange} required />
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default ManutencaoAlterar;
