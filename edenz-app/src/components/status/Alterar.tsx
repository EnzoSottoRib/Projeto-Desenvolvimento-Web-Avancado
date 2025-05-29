import React, { useEffect ,useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

interface Status {
    id?: number;
    nome: string;
}

function StatusAlterar() {
  const { id } = useParams(); 
  const [statusItem, setStatusItem] = useState<Status | null>(null);
  const [nome, setNome] = useState("");


  useEffect(() => {
    if (id) {
      axios
        .get<Status>(`http://localhost:5178/api/status/${id}`)
        .then((resposta) => {
          const statusData = resposta.data;
          setStatusItem(statusData);
          setNome(statusData.nome);
        })
        .catch((erro) => {
          console.error("Erro ao buscar status:", erro);
          alert("Erro ao carregar os dados do status!"); 
        });
    }
  }, [id]); 

  function enviarStatus(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim()) { 
      alert("O nome do status é obrigatório.");
      return;
    }

    const statusData: Status = {
      id: Number(id), 
      nome
    };

    axios
      .put(`http://localhost:5178/api/status/${id}`, statusData)
      .then((resposta) => {
        console.log("Status atualizado", resposta.data);
        alert("Status Atualizado!!!"); 
      })
      .catch((erro) => {
        console.error("Erro ao atualizar status", erro);
        alert("Erro ao atualizar status!"); 
      });
  }

  if (!statusItem) return <div>Carregando...</div>; 

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Editar Status</h2>
      </div>
      <form onSubmit={enviarStatus}>
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

export default StatusAlterar;
