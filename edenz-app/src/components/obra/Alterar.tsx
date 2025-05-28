import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Importe useParams e useNavigate

interface Obra {
  id?: number;
  idUsuario: number;
  idEngenheiro: number;
  idStatus: number;
  idTrilho: number;
  trilhoQtd: string;
  nome: string;
  localizacao: string;
  dataInicio: string;
  dataFim: string;
  custoPrevisto: number;
  custoReal: number;
  complexidade: string;
  impactoAmbiental: string;
  descricao: string;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

interface Engenheiro {
  id: number;
  nome: string;
}

interface Status {
  id: number;
  nome: string;
}

interface Trilho {
  id: number;
  nome: string;
}

export default function ObraAlterar() {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const navigate = useNavigate(); // Hook para navegação programática

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [engenheiros, setEngenheiros] = useState<Engenheiro[]>([]);
  const [statusOptions, setStatusOptions] = useState<Status[]>([]);
  const [trilhos, setTrilhos] = useState<Trilho[]>([]);

  const [obra, setObra] = useState<Obra>({
    idUsuario: 0,
    idEngenheiro: 0,
    idStatus: 0,
    idTrilho: 0,
    trilhoQtd: '',
    nome: '',
    localizacao: '',
    dataInicio: '',
    dataFim: '',
    custoPrevisto: 0,
    custoReal: 0,
    complexidade: '',
    impactoAmbiental: '',
    descricao: '',
  });

  useEffect(() => {
    const fetchObraData = async () => {
      setLoading(true);
      setErrorMessage('');

      let userId = 0;
      const usuarioLogadoString = localStorage.getItem("usuario");
      if (usuarioLogadoString) {
        try {
          const usuarioObj: Usuario = JSON.parse(usuarioLogadoString);
          userId = usuarioObj.id;
        } catch (e) {
          console.error("Erro ao parsear usuário do localStorage:", e);
          setErrorMessage("Erro ao carregar dados do usuário logado.");
        }
      } else {
        console.warn("Nenhum usuário encontrado no localStorage. Definindo ID de usuário como 0.");
        setErrorMessage("Nenhum usuário logado encontrado. Por favor, faça login.");
      }

      // Primeiro, tente carregar as opções de dropdown
      try {
        const [engenheirosRes, statusRes, trilhosRes] = await Promise.all([
          axios.get<Engenheiro[]>('http://localhost:5178/api/engenheiro'),
          axios.get<Status[]>('http://localhost:5178/api/status'),
          axios.get<Trilho[]>('http://localhost:5178/api/trilho'),
        ]);

        setEngenheiros(engenheirosRes.data);
        setStatusOptions(statusRes.data);
        setTrilhos(trilhosRes.data);

        // Se há um ID na URL, tente carregar os dados da obra existente
        if (id) {
          const obraId = Number(id);
          if (isNaN(obraId)) {
            setErrorMessage("ID da obra inválido na URL.");
            setLoading(false);
            return;
          }

          const obraRes = await axios.get<Obra>(`http://localhost:5178/api/obra/${obraId}`);
          const obraExistente = obraRes.data;

          // Define o id da obra e o id do usuário logado (se houver)
          setObra({ ...obraExistente, id: obraId, idUsuario: userId });

        } else {
          // Se não há ID na URL (modo de criação, mas esta tela é para atualização)
          // Você pode querer redirecionar ou tratar como um erro.
          // Por enquanto, apenas defina o id do usuário.
          setObra(prev => ({
            ...prev,
            idUsuario: userId,
            // Valores padrão para dropdowns se for uma tela de criação e não de edição
            idEngenheiro: engenheirosRes.data.length > 0 ? engenheirosRes.data[0].id : 0,
            idStatus: statusRes.data.length > 0 ? statusRes.data[0].id : 0,
            idTrilho: trilhosRes.data.length > 0 ? trilhosRes.data[0].id : 0,
          }));
        }

      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
        setErrorMessage("Erro ao carregar dados. Verifique a conexão com a API e o CORS.");
        setEngenheiros([]);
        setStatusOptions([]);
        setTrilhos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchObraData();
  }, [id]); // Dependência no 'id' para recarregar se o ID da URL mudar

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (['idEngenheiro', 'idStatus', 'idTrilho'].includes(id)) {
      setObra({ ...obra, [id]: Number(value) });
    } else {
      setObra({ ...obra, [id]: value });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setObra({ ...obra, [id]: parseFloat(value) || 0 });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setObra({ ...obra, [id]: value });
  };

  const validateForm = (): boolean => {
    setErrorMessage(''); // Limpa mensagens de erro anteriores

    // Validações existentes
    if (!obra.nome || obra.nome.length < 4 || obra.nome.length > 50) {
      setErrorMessage("O nome da obra deve ter entre 4 e 50 caracteres.");
      return false;
    }
    if (!obra.localizacao || obra.localizacao.length < 2 || obra.localizacao.length > 50) {
      setErrorMessage("A localização deve ter entre 2 e 50 caracteres.");
      return false;
    }
    if (!obra.dataInicio) {
      setErrorMessage("A data de início é obrigatória.");
      return false;
    }
    if (!obra.dataFim) {
      setErrorMessage("A data de fim é obrigatória.");
      return false;
    }
    if (obra.dataInicio && obra.dataFim && new Date(obra.dataFim) < new Date(obra.dataInicio)) {
      setErrorMessage("A data de fim não pode ser anterior à data de início.");
      return false;
    }

    if (obra.custoPrevisto === 0 && obra.custoPrevisto !== 0) { // Garante que 0 é permitido se for um valor real
        setErrorMessage("O custo previsto é obrigatório e deve ser um valor válido.");
        return false;
    }
    if (obra.custoReal < 0) {
      setErrorMessage("O custo real não pode ser negativo.");
      return false;
    }
    if (!obra.complexidade || obra.complexidade.length < 1 || obra.complexidade.length > 20) {
      setErrorMessage("A complexidade deve ter entre 1 e 20 caracteres.");
      return false;
    }
    if (!obra.impactoAmbiental || obra.impactoAmbiental.length < 1 || obra.impactoAmbiental.length > 30) {
      setErrorMessage("O impacto ambiental deve ter entre 1 e 30 caracteres.");
      return false;
    }
    if (!obra.descricao || obra.descricao.length < 1 || obra.descricao.length > 100) {
      setErrorMessage("A descrição deve ter entre 1 e 100 caracteres.");
      return false;
    }
    if (!obra.trilhoQtd || obra.trilhoQtd.length < 1 || obra.trilhoQtd.length > 15) {
      setErrorMessage("A quantidade de trilho deve ter entre 1 e 15 caracteres.");
      return false;
    }

    if (obra.idEngenheiro === 0) {
      setErrorMessage("Selecione um engenheiro.");
      return false;
    }
    if (obra.idStatus === 0) {
      setErrorMessage("Selecione um status.");
      return false;
    }
    if (obra.idTrilho === 0) {
      setErrorMessage("Selecione um tipo de trilho.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!obra.id) {
      setErrorMessage("Não foi possível atualizar: ID da obra não encontrado.");
      return;
    }

    setLoading(true);
    setErrorMessage('');
    alert("Obra atualizada com sucesso!");

    try {
      const formattedObra = {
        ...obra,
        // Garante que as datas estão no formato correto, se necessário para a API
        dataInicio: obra.dataInicio,
        dataFim: obra.dataFim,
        idUsuario: obra.idUsuario, // Certifica que o idUsuario está sendo enviado
      };


      await axios.put(`http://localhost:5178/api/obra/${obra.id}`, formattedObra);


    } catch (error) {
      console.error("Erro ao atualizar obra:", error);
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        let msg = '';
        if (typeof errorData === 'string') {
          msg = errorData;
        } else if (errorData.errors) {
          for (const key in errorData.errors) {
            msg += `${key}: ${errorData.errors[key].join(', ')}\n`;
          }
        } else if (errorData.title) {
            msg = errorData.title;
        } else {
            msg = "Detalhes do erro não disponíveis.";
        }
        setErrorMessage(`Erro ao atualizar obra: ${msg}`);
      } else {
        setErrorMessage(`Erro de conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && (!obra.id && !errorMessage)) { // Carregando inicial ou se não há erro
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-indigo-600 text-lg font-semibold">Carregando dados da obra...</div>
      </div>
    );
  }

  // Se houver um erro antes mesmo de tentar carregar os dados
  if (errorMessage && !loading && !obra.nome) { // Se há erro e a obra não foi carregada
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="form-container bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Erro!</strong>
            <span className="block sm:inline ml-2" dangerouslySetInnerHTML={{ __html: errorMessage.replace(/\n/g, '<br/>') }}></span>
          </div>
          <button
            onClick={() => navigate(-1)} // Volta para a página anterior
            className="w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="form-container bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Atualização de Obra {obra.id ? `(ID: ${obra.id})` : ''}</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          ID do Usuário Logado: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{obra.idUsuario === 0 ? 'N/A' : obra.idUsuario}</span>
        </p>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Erro!</strong>
            <span className="block sm:inline ml-2" dangerouslySetInnerHTML={{ __html: errorMessage.replace(/\n/g, '<br/>') }}></span>
          </div>
        )}


        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group col-span-full">
            <label htmlFor="idUsuario" className="block text-sm font-medium text-gray-700">ID do Usuário</label>
            <input
              type="text"
              id="idUsuario"
              value={obra.idUsuario === 0 ? '' : obra.idUsuario.toString()}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 cursor-not-allowed sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome da Obra</label>
            <input
              type="text"
              id="nome"
              value={obra.nome}
              onChange={handleChange}
              required
              maxLength={50}
              minLength={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">Localização</label>
            <input
              type="text"
              id="localizacao"
              value={obra.localizacao}
              onChange={handleChange}
              required
              maxLength={50}
              minLength={2}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700">Data de Início</label>
            <input
              type="date"
              id="dataInicio"
              value={obra.dataInicio ? obra.dataInicio.split('T')[0] : ''} // Formata para 'YYYY-MM-DD'
              onChange={handleDateChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700">Data de Fim</label>
            <input
              type="date"
              id="dataFim"
              value={obra.dataFim ? obra.dataFim.split('T')[0] : ''} // Formata para 'YYYY-MM-DD'
              onChange={handleDateChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="custoPrevisto" className="block text-sm font-medium text-gray-700">Custo Previsto</label>
            <input
              type="number"
              id="custoPrevisto"
              value={obra.custoPrevisto}
              onChange={handleNumberChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="custoReal" className="block text-sm font-medium text-gray-700">Custo Real</label>
            <input
              type="number"
              id="custoReal"
              value={obra.custoReal}
              onChange={handleNumberChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="complexidade" className="block text-sm font-medium text-gray-700">Complexidade</label>
            <input
              type="text"
              id="complexidade"
              value={obra.complexidade}
              onChange={handleChange}
              required
              maxLength={20}
              minLength={1}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="impactoAmbiental" className="block text-sm font-medium text-gray-700">Impacto Ambiental</label>
            <input
              type="text"
              id="impactoAmbiental"
              value={obra.impactoAmbiental}
              onChange={handleChange}
              required
              maxLength={30}
              minLength={1}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="idEngenheiro" className="block text-sm font-medium text-gray-700">Engenheiro Responsável</label>
            <select
              id="idEngenheiro"
              value={obra.idEngenheiro}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={0} disabled>Selecione um engenheiro...</option>
              {engenheiros.length > 0 ? (
                engenheiros.map((eng) => (
                  <option key={eng.id} value={eng.id}>{eng.nome}</option>
                ))
              ) : (
                <option value={0} disabled>Nenhum engenheiro disponível</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="idStatus" className="block text-sm font-medium text-gray-700">Status da Obra</label>
            <select
              id="idStatus"
              value={obra.idStatus}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={0} disabled>Selecione um status...</option>
              {statusOptions.length > 0 ? (
                statusOptions.map((status) => (
                  <option key={status.id} value={status.id}>{status.nome}</option>
                ))
              ) : (
                <option value={0} disabled>Nenhum status disponível</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="idTrilho" className="block text-sm font-medium text-gray-700">Tipo de Trilho</label>
            <select
              id="idTrilho"
              value={obra.idTrilho}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={0} disabled>Selecione um tipo de trilho...</option>
              {trilhos.length > 0 ? (
                trilhos.map((trilho) => (
                  <option key={trilho.id} value={trilho.id}>{trilho.nome}</option>
                ))
              ) : (
                <option value={0} disabled>Nenhum trilho disponível</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="trilhoQtd" className="block text-sm font-medium text-gray-700">Quantidade de Trilho</label>
            <input
              type="text"
              id="trilhoQtd"
              value={obra.trilhoQtd}
              onChange={handleChange}
              required
              maxLength={15}
              minLength={1}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="form-group col-span-full">
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              id="descricao"
              value={obra.descricao}
              onChange={handleChange}
              required
              maxLength={100}
              minLength={1}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
            ></textarea>
          </div>

          <div className="col-span-full flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Atualizando...' : 'Atualizar Obra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}