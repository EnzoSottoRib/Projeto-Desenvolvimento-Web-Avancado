import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import "../css/Home.css";

interface Equipamento {
    id?: number;
    nome: string;
}

function EquipamentoListar() {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);

 
  useEffect(() => {
    axios
      .get("http://localhost:5178/api/equipamento")
      .then(resposta => {
        setEquipamentos(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao buscar equipamento", erro);
      });
  }, []); 

  function deletar(id: number) {
    axios
      .delete(`http://localhost:5178/api/equipamento/${id}`)
      .then((resposta) => {
        console.log("Equipamento deletado!", resposta.data);
       alert("Equipamento Deletado!")
        setEquipamentos(equipamentos.filter(equipamento => equipamento.id !== id));
      })
      .catch((erro) => {
        console.error("Erro ao deletar equipamento!", erro);
      });
  }

  return (
    <div id='divMain'>
      <h1>Listar Equipamento</h1>
      
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Deletar</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {equipamentos.map(equipamento => (
            <tr key={equipamento.id}>
              <td>{equipamento.nome}</td>
              <td>
                <button onClick={() => deletar(equipamento.id!)}>
                  Deletar
                </button>
              </td>
              <td>
                <Link to={`/editar/equipamento/${equipamento.id}`} className="btn-link">
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

export default EquipamentoListar