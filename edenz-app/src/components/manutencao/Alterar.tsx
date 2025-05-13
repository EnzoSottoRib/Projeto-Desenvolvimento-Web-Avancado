import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../img/tremHome.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
// import "../css/Home.css";

// interface Trilho {
//     id?: number;
//     nome: string;
// }


function ManutencaoAlterar() {
  // const { id } = useParams();
  // const [trilho, setTrilho] = useState<Trilho | null>(null);
  // const [nome, setNome] = useState("");


  // useEffect(() => {
  //   if (id) {
  //     axios
  //       .get<Trilho>(`http://localhost:5178/api/trilho/${id}`)
  //       .then((resposta) => {
  //         const trilhoData = resposta.data;
  //         setTrilho(trilhoData);
  //         setNome(trilhoData.nome);
  //       })
  //       .catch((erro) => {
  //         console.error("Erro ao buscar trilhos:", erro);
  //       });
  //   }
  // }, [id]);

  // function enviarTrilho(e: any) {
  //   e.preventDefault();

  //   const trilhoData: Trilho = {
  //     id: Number(id),
  //     nome
  //   };

  //   axios
  //     .put(`http://localhost:5178/api/trilho/${id}`, trilhoData)
  //     .then((resposta) => {
  //       console.log("Trilho atualizado", resposta.data);
  //       alert("Trilho Atualizado!!!")
  //     })
  //     .catch((erro) => {
  //       console.error("Erro ao atualizar trilho", erro);
  //     });
  // }

  // if (!trilho) return <div>Carregando...</div>; 

  return (
    <div className="form-container">
      {/* <div className="form-header">
        <h2>Editar Trilho</h2>
      </div>
      <form onSubmit={enviarTrilho}>
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
      </form> */}
    </div>
  );
}

export default ManutencaoAlterar