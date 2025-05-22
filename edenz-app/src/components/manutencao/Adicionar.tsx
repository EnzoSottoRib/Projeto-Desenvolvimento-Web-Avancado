import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    Nome: string; 
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
   id?: number;
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
  const [obras, setObras] = useState<Obra[]>([]);
  const [materias, setMateriais] = useState<Material[]>([]);
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [nome, setNome] = useState("");
  const [materialQtd, setMaterialQtd] = useState("");
  const [equipamentoQtd, setEquipamentoQtd] = useState("");
  const [trilhoQtd, setTrilhoQtd] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [obraId, setObraId] = useState<number>(0);
  const [materialId, setMaterialId] = useState<number>(0);
  const [equipamentoId, setEquipamentoId] = useState<number>(0);
  const [trilhoId, setTrilhoId] = useState<number>(0);

  useEffect(() => {
    axios
      .get<Obra[]>("http://localhost:5020/api/obra/listar")
      .then((resposta) => {
        setObras(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar obras!", erro);
      });
  }, []);

  useEffect(() => {
    axios
      .get<Material[]>("http://localhost:5020/api/material/listar")
      .then((resposta) => {
        setMateriais(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar materiais!", erro);
      });
  }, []);

  useEffect(() => {
    axios
      .get<Equipamento[]>("http://localhost:5020/api/equipamento/listar")
      .then((resposta) => {
        setEquipamentos(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar equipamentos!", erro);
      });
  }, []);

  function enviarManutencao(e: React.FormEvent) {
    e.preventDefault();

    const manutencao: Manutencao = {
      idObra: Number(obraId),
      idMaterial: Number(materialId),
      materialQtd, 
      idEquipamento: Number(equipamentoId), 
      equipamentoQtd, 
      idTrilho: Number(equipamentoId),  
      trilhoQtd, 
      descricao, 
      data,
    }

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

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cadastro de Manutenção</h2>
      </div>
      <form onSubmit={enviarManutencao}>
        {/* <div className="form-group">
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

        <button type="submit">Cadastrar</button> */}
      </form>

      <footer>
        <p>Todos os direitos reservados © Edenz LTDA</p>
      </footer>
    </div>
  );
}

export default ManutencaoAdicionar;
