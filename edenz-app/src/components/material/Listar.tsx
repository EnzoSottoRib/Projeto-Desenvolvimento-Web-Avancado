import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import "../css/Home.css";


interface Material {
    id?: number;
    nome: string;
}


function MaterialListar() {
  const [materiais, setMateriais] = useState<Material[]>([]);

 
  useEffect(() => {
    axios
      .get("http://localhost:5178/api/material")
      .then(resposta => {
        setMateriais(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao buscar materiais!", erro);
      });
  }, []); 

  function deletar(id: number) {
    axios
      .delete(`http://localhost:5178/api/material/${id}`)
      .then((resposta) => {
        console.log("Material deletado:", resposta.data);
        alert("Material deletado!")
        setMateriais(materiais.filter(material => material.id !== id));
      })
      .catch((erro) => {
        console.error("Erro ao deletar material!", erro);
      });
  }

  return (
    <div id='divMain'>
      <h1>Listar Materiais</h1>
      
      <table>
        <thead>
          <tr>
            <th>Nome</th>
             <th>Deletar</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {materiais.map(material => (
            <tr key={material.id}>
              <td>{material.nome}</td>
              <td>
                <button onClick={() => deletar(material.id!)}>
                  Deletar
                </button>
              </td>
              <td>
                <Link to={`/editar/material/${material.id}`} className="btn-link">
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

export default MaterialListar