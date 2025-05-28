import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../../css/ComponentsListar.css";

interface Trilho {
    id?: number;
    nome: string;
}


function TrilhoListar() {
  const [trilhos, setTrilhos] = useState<Trilho[]>([]);

 
  useEffect(() => {
    axios
      .get("http://localhost:5178/api/trilho")
      .then(resposta => {
        setTrilhos(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao buscar trilhos:", erro);
      });
  }, []); 

  function deletar(id: number) {
    axios
      .delete(`http://localhost:5178/api/trilho/${id}`)
      .then((resposta) => {
        console.log("Trilho deletado:", resposta.data);
        alert("Trilho Deletado!")
        setTrilhos(trilhos.filter(trilho => trilho.id !== id));
      })
      .catch((erro) => {
        console.error("Erro ao deletar trilhos:", erro);
      });
  }

  return (
    <div id='divMain'>
      <h1>Listar Trilhos</h1>
      
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Deletar</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {trilhos.map(trilho => (
            <tr key={trilho.id}>
              <td>{trilho.nome}</td>
              <td>
                <button onClick={() => deletar(trilho.id!)}>
                  Deletar
                </button>
              </td>
              <td>
                <Link to={`/editar/trilho/${trilho.id}`} className="btn-link">
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

export default TrilhoListar