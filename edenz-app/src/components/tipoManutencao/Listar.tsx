import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import "../css/Home.css";


interface TipoManutencao {
    id?: number;
    nome: string;
}



function TipoManutencaoListar() {
  const [tiposManutencao, setTiposManutencao] = useState<TipoManutencao[]>([]);

 
  useEffect(() => {
    axios
      .get("http://localhost:5178/api/tipomanutencao")
      .then(resposta => {
        setTiposManutencao(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao buscar tipos de manutenção", erro);
      });
  }, []); 

  function deletar(id: number) {
    axios
      .delete(`http://localhost:5178/api/tipomanutencao/${id}`)
      .then((resposta) => {
        console.log("Tipo de manutenção deletado!", resposta.data);
       alert("Tipo de manutenção Deletado!")
        setTiposManutencao(tiposManutencao.filter(tipoManutencao => tipoManutencao.id !== id));
      })
      .catch((erro) => {
        console.error("Erro ao deletar tipo de manutenção!", erro);
      });
  }

  return (
    <div id='divMain'>
      <h1>Listar Tipos de Manutenção</h1>
      
      <table>
        <thead>
          <tr>
            <th>Nome</th>
             <th>Deletar</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {tiposManutencao.map(tipoManutencao => (
            <tr key={tipoManutencao.id}>
              <td>{tipoManutencao.nome}</td>
              <td>
                <button onClick={() => deletar(tipoManutencao.id!)}>
                  Deletar
                </button>
              </td>
              <td>
                <Link to={`/editar/tipoManutencao/${tipoManutencao.id}`} className="btn-link">
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

export default TipoManutencaoListar