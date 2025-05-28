import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

function ManutencaoAlterar() {
  const { id } = useParams();
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [obras, setObras] = useState<Obra[]>([]);
  const [nome, setNome] = useState("");
  const [idObra, setIdObra] = useState(0);
  const [materialId, setMaterialId] = useState(0);
  const [equipamentoId, setEquipamentoId] = useState(0);
  const [equipamentoQtd, setEquipamentoQtd] = useState("");
  const [materialQtd, setMaterialQtd] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get<Manutencao>(
          `http://localhost:5178/api/manutencao/${id}`
        )
        .then((resposta) => {
          const manutencao = resposta.data;
          setNome(manutencao.nome);
          setEquipamentoQtd(manutencao.equipamentoQtd);
          setMaterialQtd(manutencao.materialQtd);
          setDescricao(manutencao.descricao);
          setData(manutencao.data);
          setIdObra(manutencao.idObra);
          setMaterialId(manutencao.idMaterial);
          setEquipamentoId(manutencao.idEquipamento);
          buscarMateriais();
          buscarEquipamentos();
          buscarObras();
        });
    }
  }, []);

  function buscarMateriais() {
    axios
      .get<Material[]>("http://localhost:5178/api/material")
      .then((resposta) => {
        setMateriais(resposta.data);
      });
  }
  function buscarEquipamentos() {
    axios
      .get<Equipamento[]>("http://localhost:5178/api/equipamento")
      .then((resposta) => {
        setEquipamentos(resposta.data);
      });
  }
  function buscarObras() {
    axios
      .get<Obra[]>("http://localhost:5178/api/obra")
      .then((resposta) => {
        setObras(resposta.data);
      });
  }

  function enviarManutencao(e: any) {
    e.preventDefault();

    const manutencao: Manutencao = {
      id: Number(id),
      nome: nome,
      equipamentoQtd: equipamentoQtd,
      materialQtd: materialQtd,
      descricao: descricao,
      data: data,
      idObra: Number(idObra),
      idMaterial: Number(materialId),
      idEquipamento: Number(equipamentoId)
    };

    axios
      .put(`http://localhost:5178/api/manutencao/${id}`, manutencao)
      .then((resposta) => {
        console.log(resposta.data);
        alert("Manutenção atualizada com sucesso!");
      });
  }

  return (
    
    <div className="form-container">
    <div className="form-header">
        <h2>Edição de Manutenção</h2>
      </div>
      <form onSubmit={enviarManutencao}>
         <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input id="nome" value={nome} onChange={(e: any) => setNome(e.target.value)} required />
        </div>
         <div className="form-group">
          <label htmlFor="idObra">Obra</label>
          <select
          value={idObra} 
          onChange={(e: any) => setIdObra(Number(e.target.value))}
        >
          <option value={0}>Selecione uma obra</option> {1}
          {obras.map((obra) => (
            <option
              value={obra.id}
              key={obra.id}
            >
              {obra.nome}
            </option>
          ))}
        </select>
        </div>

        <div className="form-group">
          <label htmlFor="idMaterial">Material</label>
          <select
                    value={materialId}
                    onChange={(e) => setMaterialId(Number(e.target.value))}
                    required
                >
                    <option value={0}>Selecione um material</option>
                    {materiais.map((material) => (
                    <option key={material.id} value={material.id}>
                        {material.nome}
                    </option>
                    ))}
                </select>
        </div>

        <div className="form-group">
          <label htmlFor="materialQtd">Quantidade de Material</label>
          <input type="text" value={materialQtd} id="materialQtd" onChange={(e: any) => setMaterialQtd(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="idEquipamento">Equipamento</label>
          <select
                    value={equipamentoId}
                    onChange={(e) => setEquipamentoId(Number(e.target.value))}
                    required
                >
                    <option value={0}>Selecione um equipamento</option>
                    {equipamentos.map((equipamento) => (
                    <option key={equipamento.id} value={equipamento.id}>
                        {equipamento.nome}
                    </option>
                    ))}
                </select>
        </div>

        <div className="form-group">
          <label htmlFor="equipamentoQtd">Quantidade de Equipamento</label>
          <input value={equipamentoQtd} type="text" id="equipamentoQtd" onChange={(e: any) => setEquipamentoQtd(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea id="descricao" value={descricao} onChange={(e: any) => setDescricao(e.target.value)} required />
        </div>
       

        <div className="form-group">
          <label htmlFor="data">Data</label>
          <input type="date" id="data" value={data} placeholder="dd/mm/aaaa" onChange={(e: any) => setData(e.target.value)} required />
        </div>

        <button type="submit">Cadastrar</button> 
      </form>
  </div>
  );
}

export default ManutencaoAlterar;
