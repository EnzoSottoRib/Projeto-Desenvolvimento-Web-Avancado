import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/ComponentsListar.css";

interface Engenheiro {
  id?: number;
  nome: string;
}

interface Status {
  id?: number;
  nome: string;
}

interface Trilho {
  id?: number;
  nome: string;
}

interface Obra {
  id?: number;
  IdUsuario: number;
  IdEngenheiro: number;
  IdStatus: number;
  IdTrilho: number;
  nome: string;
  trilhoQtd: string;
  localizacao: string;
  dataInicio: string;
  dataFim: string;
  custoPrevisto: number;
  custoReal: number;
  complexidade: string;
  impactoAmbiental: string;
  descricao: string;
  engenheiro?: Engenheiro;
  status?: Status;
  trilho?: Trilho;
}

function ObraListar() {
  const [obras, setObras] = useState<Obra[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5178/api/obra")
      .then((res) => {
        setObras(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar obras:", err);
        alert("Erro ao carregar obras.");
      });
  }, []);

  function deletarObra(id: number) {
    axios
      .delete(`http://localhost:5178/api/obra/${id}`)
      .then(() => {
        alert("Obra deletada com sucesso!");
        setObras(obras.filter((o) => o.id !== id));
      })
      .catch((err) => {
        console.error("Erro ao deletar obra:", err);
        alert("Erro ao deletar obra.");
      });
  }

  function formatarData(dataStr: string) {
    if (!dataStr) return "";
    const dt = new Date(dataStr);
    return dt.toLocaleDateString("pt-BR");
  }

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // Estilo para as divs scrolláveis dentro das células
  const scrollableCellStyle: React.CSSProperties = {
    maxWidth: 150,
    overflowX: "auto",
    whiteSpace: "nowrap",
  };

  return (
    <div className="divMain">
      <h1>Listar Obras</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Localização</th>
            <th>Engenheiro</th>
            <th>Status</th>
            <th>Trilho</th>
            <th>Qtd Trilho</th>
            <th>Data Início</th>
            <th>Data Fim</th>
            <th>Custo Previsto</th>
            <th>Custo Real</th>
            <th>Complexidade</th>
            <th>Impacto Ambiental</th>
            <th>Descrição</th>
            <th>Deletar</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {obras.map((obra) => (
            <tr key={obra.id}>
              <td>{obra.id}</td>
              <td>{obra.nome}</td>
              <td>
                <div style={scrollableCellStyle}>{obra.localizacao}</div>
              </td>
              <td>{obra.engenheiro?.nome || "N/A"}</td>
              <td>{obra.status?.nome || "N/A"}</td>
              <td>{obra.trilho?.nome || "N/A"}</td>
              <td>{obra.trilhoQtd}</td>
              <td>{formatarData(obra.dataInicio)}</td>
              <td>{formatarData(obra.dataFim)}</td>
              <td>{formatarMoeda(obra.custoPrevisto)}</td>
              <td>{formatarMoeda(obra.custoReal)}</td>
              <td>
                <div style={scrollableCellStyle}>{obra.complexidade}</div>
              </td>
              <td>
                <div style={scrollableCellStyle}>{obra.impactoAmbiental}</div>
              </td>
              <td>
                <div style={scrollableCellStyle}>{obra.descricao}</div>
              </td>
              <td>
                <button onClick={() => obra.id && deletarObra(obra.id)}>
                  Deletar
                </button>
              </td>
              <td>
                <Link to={`/editar/obra/${obra.id}`} className="btn-link">
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

export default ObraListar;
