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

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const dateValue = e.target.value;
    setEngenheiro({ ...engenheiro, dataNascimento: dateValue });
  }

  function enviarEngenheiro(e: React.FormEvent) {
    e.preventDefault();

    const engenheiroParaEnviar = {
      nome: engenheiro.nome,
      cpf: engenheiro.cpf,
      dataNascimento: engenheiro.dataNascimento,
      registroCREA: engenheiro.registroCREA,
      contato: engenheiro.contato,
    };

    fetch('http://localhost:5178/api/engenheiro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(engenheiroParaEnviar),
    })
      .then(async (response) => {
        if (!response.ok) {
          // Captura os detalhes do erro do backend
          const errorData = await response.json();
          throw new Error(errorData.title || JSON.stringify(errorData.errors) || 'Erro ao cadastrar');
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
            type="date"
            id="dataNascimento"
            value={engenheiro.dataNascimento}
            onChange={handleDateChange}
            required
            max={new Date().toISOString().split('T')[0]} 
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
