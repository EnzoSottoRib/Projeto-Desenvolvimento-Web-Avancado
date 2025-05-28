import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Status {
  id?: number;
  nome: string;
}

export default function App() {
  const [statusList, setStatusList] = useState<Status[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Status[]>("http://localhost:5178/api/status")
      .then(resposta => {
        setStatusList(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao buscar status:", erro);
        alert("Erro ao carregar a lista de status!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deletarStatus = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5178/api/status/${id}`);
      alert("Status deletado com sucesso!");
      setStatusList(statusList.filter(status => status.id !== id));
    } catch (error) {
      console.error("Erro ao deletar status:", error);
      alert("Erro ao deletar status!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-indigo-600 text-lg font-semibold">Carregando status...</div>
      </div>
    );
  }

  return (
    <div id='divMain'>
      <h1>Listar Status</h1>
      
      {statusList.length === 0 ? (
        <p>Nenhum status cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {statusList.map(status => (
              <tr key={status.id}>
                <td>{status.nome}</td>
                <td>
                  <button onClick={() => status.id && deletarStatus(status.id!)}>
                    Deletar
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => alert(`Funcionalidade de Alterar para o Status ID: ${status.id}`)}
                    className="btn-link" // Mantendo a classe para possível estilo externo
                  >
                    Alterar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
