import React, { useState } from 'react';
import axios from 'axios';

interface Manutencao {
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

function ManutencaoAdicionar() {
  const [manutencao, setManutencao] = useState<Manutencao>({
    idObra: 0,
    idMaterial: 0,
    materialQtd: '',
    idEquipamento: 0,
    equipamentoQtd: '',
    idTrilho: 0,
    trilhoQtd: '',
    descricao: '',
    data: '',
  });

  function enviarManutencao(e: React.FormEvent) {
    e.preventDefault();

    axios
      .post('http://localhost:5178/api/manutencao', manutencao)
      .then((resposta) => {
        console.log('Manutenção cadastrada:', resposta.data);
        alert('Manutenção cadastrada com sucesso!');
      })
      .catch((erro) => {
        console.error('Erro ao cadastrar manutenção:', erro);
        alert('Erro ao cadastrar manutenção.');
      });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = e.target;
    setManutencao({ ...manutencao, [id]: value });
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cadastro de Manutenção</h2>
      </div>
      <form onSubmit={enviarManutencao}>
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

        <button type="submit">Cadastrar</button>
      </form>

      <footer>
        <p>Todos os direitos reservados © Edenz LTDA</p>
      </footer>
    </div>
  );
}

export default ManutencaoAdicionar;
