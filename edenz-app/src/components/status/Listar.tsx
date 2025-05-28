import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../../css/ComponentsListar.css";

interface Status {
    id?: number;
    nome: string;
}


function StatusListar() {
  const [status, setStatus] = useState<Status[]>([]);

 
  useEffect(() => {
    axios
      .get("http://localhost:5178/api/status")
      .then(resposta => {
        setStatus(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao buscar status:", erro);
      });
  }, []); 

  function deletar(id: number) {
    axios
      .delete(`http://localhost:5178/api/status/${id}`)
      .then((resposta) => {
        console.log("Statu deletado:", resposta.data);
        alert("Status Deletado!")
        setStatus(status.filter(status => status.id !== id));
      })
      .catch((erro) => {
        console.error("Erro ao deletar status:", erro);
      });
  }

  return (
    <div id='divMain'>
      <h1>Listar Status</h1>
      
      <table>
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {status.map(status => (
            <tr key={status.id}>
              <td>{status.nome}</td>
              <td>
                <button onClick={() => deletar(status.id!)}>
                  Deletar
                </button>
              </td>
              <td>
                <Link to={`/editar/status/${status.id}`} className="btn-link">
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

export default StatusListar