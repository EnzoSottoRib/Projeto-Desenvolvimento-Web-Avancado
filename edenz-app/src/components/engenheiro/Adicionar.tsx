import React, { useState } from 'react';

interface Engenheiro {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  registroCREA: string;
  contato: string;
}

function EngenheiroAdicionar() {
  const [engenheiro, setEngenheiro] = useState<Engenheiro>({
    nome: '',
    cpf: '',
    dataNascimento: '',
    registroCREA: '',
    contato: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setEngenheiro({ ...engenheiro, [id]: value });
  }

  function enviarEngenheiro(e: React.FormEvent) {
    e.preventDefault();

    const engenheiroParaEnviar = {
      ...engenheiro,
      DataNascimento: engenheiro.dataNascimento,
      RegistroCREA: engenheiro.registroCREA
    };

    fetch('http://localhost:5178/api/engenheiro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(engenheiro),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao cadastrar engenheiro');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Engenheiro cadastrado:', data);
        alert('Engenheiro cadastrado com sucesso!');
        setEngenheiro({
          nome: '',
          cpf: '',
          dataNascimento: '',
          registroCREA: '',
          contato: '',
        });
      })
      .catch((error) => {
        console.error('Erro ao cadastrar engenheiro:', error);
        alert('Erro ao cadastrar engenheiro!');
      });
  }

  return (
    <div className="form-container">
      <h2>Cadastro de Engenheiro</h2>
      <form onSubmit={enviarEngenheiro}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={engenheiro.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            value={engenheiro.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="text"
            id="dataNascimento"
            value={engenheiro.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="registroCREA">Registro CREA</label>
          <input
            type="text"
            id="registroCREA"
            value={engenheiro.registroCREA}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contato">Contato</label>
          <input
            type="text"
            id="contato"
            value={engenheiro.contato}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default EngenheiroAdicionar;
