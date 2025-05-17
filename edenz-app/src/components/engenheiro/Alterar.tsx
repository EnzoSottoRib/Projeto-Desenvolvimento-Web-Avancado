import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Engenheiro {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  registroCREA: string;
  contato: string;
}

function EngenheiroAlterar() {
  const { id } = useParams();
  const [engenheiro, setEngenheiro] = useState<Engenheiro | null>(null);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [registroCREA, setRegistroCREA] = useState("");
  const [contato, setContato] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get<Engenheiro>(`http://localhost:5178/api/engenheiro/${id}`)
        .then((resposta) => {
          const dados = resposta.data;
          setEngenheiro(dados);
          setNome(dados.nome);
          setCpf(dados.cpf);
          setDataNascimento(dados.dataNascimento);
          setRegistroCREA(dados.registroCREA);
          setContato(dados.contato);
        })
        .catch((erro) => {
          console.error("Erro ao buscar engenheiro", erro);
        });
    }
  }, [id]);

  function enviarEngenheiro(e: React.FormEvent) {
    e.preventDefault();

    const engenheiroAtualizado: Engenheiro = {
      id: Number(id),
      nome,
      cpf,
      dataNascimento,
      registroCREA,
      contato,
    };

    axios
      .put(`http://localhost:5178/api/engenheiro/${id}`, engenheiroAtualizado)
      .then((resposta) => {
        console.log("Engenheiro atualizado:", resposta.data);
        alert("Engenheiro atualizado com sucesso!");
      })
      .catch((erro) => {
        console.error("Erro ao atualizar engenheiro:", erro);
        alert("Erro ao atualizar engenheiro!");
      });
  }

  if (!engenheiro) return <div>Carregando engenheiro...</div>;

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Editar Engenheiro</h2>
      </div>
      <form onSubmit={enviarEngenheiro}>
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

        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="text"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="registroCREA">Registro CREA</label>
          <input
            type="text"
            id="registroCREA"
            value={registroCREA}
            onChange={(e) => setRegistroCREA(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contato">Contato</label>
          <input
            type="text"
            id="contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            required
          />
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EngenheiroAlterar;
