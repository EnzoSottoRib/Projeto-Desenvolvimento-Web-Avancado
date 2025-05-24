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
    idTrilho: Number,  
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
  id?: number;
  idObra: number;
  idMaterial: number;
  idEquipamento: number;
  nome: string;
  materialQtd: string;
  equipamentoQtd: string;
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
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [obraId, setObraId] = useState<number>(0);
  const [materialId, setMaterialId] = useState<number>(0);
  const [equipamentoId, setEquipamentoId] = useState<number>(0);

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
      idEquipamento: Number(equipamentoId), 
      nome,
      materialQtd, 
      equipamentoQtd, 
      descricao, 
      data,
    }

    fetch('http://localhost:5178/api/manutencao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(manutencao),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao cadastrar manutencao');
        }
        return response.json();
      })
      .then((data) => {
        console.log('manutencao cadastrado:', data);
        alert('manutencao cadastrado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao cadastrar manutencao:', error);
        alert('Erro ao cadastrar manutencao!');
      });
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cadastro de Manutenção</h2>
      </div>
      <form onSubmit={enviarManutencao}>
         <div className="form-group">
          <label htmlFor="idObra">Obra</label>
          <input type="number" id="idObra" onChange={(e: any) => setObraId(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="idMaterial">Material</label>
          <input type="number" id="idMaterial" onChange={(e: any) => setMaterialId(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="materialQtd">Quantidade de Material</label>
          <input type="text" id="materialQtd" onChange={(e: any) => setMaterialQtd(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="idEquipamento">Equipamento</label>
          <input type="number" id="idEquipamento" onChange={(e: any) => setEquipamentoId(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="equipamentoQtd">Quantidade de Equipamento</label>
          <input type="text" id="equipamentoQtd" onChange={(e: any) => setEquipamentoQtd(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea id="descricao" onChange={(e: any) => setDescricao(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Nome</label>
          <textarea id="descricao" onChange={(e: any) => setNome(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="data">Data</label>
          <input type="text" id="data" placeholder="dd/mm/aaaa" onChange={(e: any) => setData(e.target.value)} required />
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
