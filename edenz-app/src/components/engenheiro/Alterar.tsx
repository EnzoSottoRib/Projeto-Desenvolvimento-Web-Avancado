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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Engenheiro, 'id'>>({
    nome: '',
    cpf: '',
    dataNascimento: '',
    registroCREA: '',
    contato: ''
  });

  useEffect(() => {
    const fetchEngenheiro = async () => {
      try {
        const resposta = await axios.get<Engenheiro>(`http://localhost:5178/api/engenheiro/${id}`);
        const dados = resposta.data;
        
        const dataFormatada = dados.dataNascimento 
          ? new Date(dados.dataNascimento).toISOString().split('T')[0]
          : '';
        
        setEngenheiro(dados);
        setFormData({
          nome: dados.nome,
          cpf: dados.cpf,
          dataNascimento: dataFormatada,
          registroCREA: dados.registroCREA,
          contato: dados.contato
        });
      } catch (erro) {
        console.error("Erro ao buscar engenheiro", erro);
        setError("Erro ao carregar dados do engenheiro");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEngenheiro();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, dataNascimento: e.target.value }));
  };

  const enviarEngenheiro = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const engenheiroAtualizado = {
        id: Number(id),
        ...formData
      };

      const resposta = await axios.put(
        `http://localhost:5178/api/engenheiro/${id}`,
        engenheiroAtualizado
      );

      console.log("Engenheiro atualizado:", resposta.data);
      alert("Engenheiro atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao atualizar engenheiro:", erro);
      
      if (axios.isAxiosError(erro) && erro.response) {
        const errorMessage = erro.response.data?.title || 
                           JSON.stringify(erro.response.data?.errors) || 
                           "Erro ao atualizar engenheiro";
        alert(errorMessage);
      } else {
        alert("Erro ao atualizar engenheiro!");
      }
    }
  };

  if (loading) return <div>Carregando engenheiro...</div>;
  if (error) return <div>{error}</div>;
  if (!engenheiro) return <div>Engenheiro não encontrado</div>;

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
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            value={formData.dataNascimento}
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
            value={formData.registroCREA}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contato">Contato</label>
          <input
            type="text"
            id="contato"
            value={formData.contato}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EngenheiroAlterar;