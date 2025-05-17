import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Engenheiro {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  registroCREA: string;
  contato: string;
}

function EngenheiroListar() {
  const [engenheiros, setEngenheiros] = useState<Engenheiro[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5178/api/engenheiro')
      .then((resposta) => {
        setEngenheiros(resposta.data);
      })
      .catch((erro) => {
        console.error('Erro ao buscar engenheiros', erro);
      });
  }, []);

  function deletar(id: number) {
    axios
      .delete(`http://localhost:5178/api/engenheiro/${id}`)
      .then((resposta) => {
        console.log('Engenheiro deletado!', resposta.data);
        alert('Engenheiro deletado!');
        setEngenheiros(engenheiros.filter((eng) => eng.id !== id));
      })
      .catch((erro) => {
        console.error('Erro ao deletar engenheiro!', erro);
      });
  }

  return (
    <div id="divMain">
      <h1>Listar Engenheiros</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Registro CREA</th>
            <th>Contato</th>
            <th colSpan={2}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {engenheiros.map((eng) => (
            <tr key={eng.id}>
              <td>{eng.nome}</td>
              <td>{eng.cpf}</td>
              <td>{eng.dataNascimento}</td>
              <td>{eng.registroCREA}</td>
              <td>{eng.contato}</td>
              <td>
                <button onClick={() => deletar(eng.id!)}>Deletar</button>
              </td>
              <td>
                <Link to={`/editar/engenheiro/${eng.id}`} className="btn-link">
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

export default EngenheiroListar;
