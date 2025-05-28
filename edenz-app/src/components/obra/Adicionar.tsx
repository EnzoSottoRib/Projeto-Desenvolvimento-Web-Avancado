import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Obra {
  id?: string;
  idUsuario: string;
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

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const [engenheiros, setEngenheiros] = useState<Engenheiro[]>([]);
  const [statusOptions, setStatusOptions] = useState<Status[]>([]);
  const [trilhos, setTrilhos] = useState<Trilho[]>([]);

  const [obra, setObra] = useState<Obra>({
    idUsuario: '',
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
    const usuarioLogadoString = localStorage.getItem("usuario");
    let userId = '';
    if (usuarioLogadoString) {
      try {
        const usuarioObj = JSON.parse(usuarioLogadoString);
        userId = usuarioObj.id ? String(usuarioObj.id) : crypto.randomUUID();
      } catch (e) {
        console.error("Erro ao parsear usuário do localStorage:", e);
        userId = crypto.randomUUID();
      }
    } else {
      userId = crypto.randomUUID();
    }
    setObra(prev => ({ ...prev, idUsuario: userId }));

    const fetchDropdownData = async () => {
      try {
        const [engenheirosRes, statusRes, trilhosRes] = await Promise.all([
          axios.get<Engenheiro[]>('http://localhost:5178/api/engenheiro'),
          axios.get<Status[]>('http://localhost:5178/api/status'),
          axios.get<Trilho[]>('http://localhost:5178/api/trilho'),
        ]);

        setEngenheiros(engenheirosRes.data);
        setStatusOptions(statusRes.data);
        setTrilhos(trilhosRes.data);

        setObra(prev => ({
          ...prev,
          idEngenheiro: engenheirosRes.data.length > 0 ? engenheirosRes.data[0].id : 0,
          idStatus: statusRes.data.length > 0 ? statusRes.data[0].id : 0,
          idTrilho: trilhosRes.data.length > 0 ? trilhosRes.data[0].id : 0,
        }));
      } catch (error) {
        console.error("Erro ao carregar dados dos dropdowns:", error);
        alert("Erro ao carregar opções para engenheiros, status ou trilhos. Verifique se o servidor está rodando.");
        setEngenheiros([]); // Limpa as opções para indicar que não foram carregadas
        setStatusOptions([]);
        setTrilhos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'idEngenheiro' || id === 'idStatus' || id === 'idTrilho') {
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
    if (!obra.nome || obra.nome.length < 4 || obra.nome.length > 50) {
      alert("O nome da obra deve ter entre 4 e 50 caracteres.");
      return false;
    }
    if (!obra.localizacao || obra.localizacao.length < 2 || obra.localizacao.length > 50) {
      alert("A localização deve ter entre 2 e 50 caracteres.");
      return false;
    }
    if (!obra.dataInicio || obra.dataInicio.length < 7 || obra.dataInicio.length > 13) {
      alert("A data de início deve ter entre 7 e 13 caracteres.");
      return false;
    }
    if (!obra.dataFim || obra.dataFim.length < 7 || obra.dataFim.length > 13) {
      alert("A data de fim deve ter entre 7 e 13 caracteres.");
      return false;
    }
    if (obra.custoPrevisto <= 0) {
      alert("O custo previsto deve ser um valor positivo.");
      return false;
    }
    if (obra.custoReal < 0) {
      alert("O custo real não pode ser negativo.");
      return false;
    }
    if (!obra.complexidade || obra.complexidade.length < 1 || obra.complexidade.length > 20) {
      alert("A complexidade deve ter entre 1 e 20 caracteres.");
      return false;
    }
    if (!obra.impactoAmbiental || obra.impactoAmbiental.length < 1 || obra.impactoAmbiental.length > 30) {
      alert("O impacto ambiental deve ter entre 1 e 30 caracteres.");
      return false;
    }
    if (!obra.descricao || obra.descricao.length < 1 || obra.descricao.length > 100) {
      alert("A descrição deve ter entre 1 e 100 caracteres.");
      return false;
    }
    if (!obra.trilhoQtd || obra.trilhoQtd.length < 1 || obra.trilhoQtd.length > 15) {
      alert("A quantidade de trilho deve ter entre 1 e 15 caracteres.");
      return false;
    }
    
    // Validação para dropdowns: verifica se há opções e se uma opção válida foi selecionada
    if (engenheiros.length > 0 && (obra.idEngenheiro === 0 || !obra.idEngenheiro)) {
      alert("Selecione um engenheiro.");
      return false;
    } else if (engenheiros.length === 0) {
      alert("Não há engenheiros disponíveis para seleção. Por favor, cadastre um engenheiro primeiro.");
      return false;
    }

    if (statusOptions.length > 0 && (obra.idStatus === 0 || !obra.idStatus)) {
      alert("Selecione um status.");
      return false;
    } else if (statusOptions.length === 0) {
      alert("Não há status disponíveis para seleção. Por favor, cadastre um status primeiro.");
      return false;
    }

    if (trilhos.length > 0 && (obra.idTrilho === 0 || !obra.idTrilho)) {
      alert("Selecione um tipo de trilho.");
      return false;
    } else if (trilhos.length === 0) {
      alert("Não há trilhos disponíveis para seleção. Por favor, cadastre um trilho primeiro.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5178/api/obra', obra);
      alert("Obra cadastrada com sucesso!");
      setObra({
        idUsuario: obra.idUsuario,
        idEngenheiro: engenheiros.length > 0 ? engenheiros[0].id : 0,
        idStatus: statusOptions.length > 0 ? statusOptions[0].id : 0,
        idTrilho: trilhos.length > 0 ? trilhos[0].id : 0,
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
    } catch (error) {
      console.error("Erro ao processar obra:", error);
      // Detalha o erro se for um erro de validação do servidor (código 400)
      if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
        const errorData = error.response.data;
        let errorMessage = "Erro de validação: ";
        if (typeof errorData === 'object' && errorData !== null) {
            // Tenta extrair mensagens de erro do corpo da resposta
            if (errorData.errors) { // Para erros de validação ASP.NET Core ModelState
                for (const key in errorData.errors) {
                    errorMessage += `${key}: ${errorData.errors[key].join(', ')}. `;
                }
            } else if (errorData.title) { // Para outros erros com título
                errorMessage += errorData.title;
            } else {
                errorMessage += JSON.stringify(errorData);
            }
        } else if (typeof errorData === 'string') {
            errorMessage += errorData;
        } else {
            errorMessage += "Detalhes não disponíveis.";
        }
        alert(errorMessage);
      } else {
        alert("Erro ao processar obra. Verifique o console para mais detalhes.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-indigo-600 text-lg font-semibold">Carregando dados...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="form-container bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Cadastro de Obra</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          ID do Usuário: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{obra.idUsuario}</span>
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group col-span-full">
            <label htmlFor="idUsuario" className="block text-sm font-medium text-gray-700">ID do Usuário</label>
            <input
              type="text"
              id="idUsuario"
              value={obra.idUsuario}
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
              value={obra.dataInicio}
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
              value={obra.dataFim}
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
              {engenheiros.length > 0 ? (
                engenheiros.map((eng) => (
                  <option key={eng.id} value={eng.id}>{eng.nome}</option>
                ))
              ) : (
                <option value={0}>Carregando engenheiros...</option>
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
              {statusOptions.length > 0 ? (
                statusOptions.map((status) => (
                  <option key={status.id} value={status.id}>{status.nome}</option>
                ))
              ) : (
                <option value={0}>Carregando status...</option>
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
              {trilhos.length > 0 ? (
                trilhos.map((trilho) => (
                  <option key={trilho.id} value={trilho.id}>{trilho.nome}</option>
                ))
              ) : (
                <option value={0}>Carregando trilhos...</option>
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

          <div className="col-span-full flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processando...' : 'Cadastrar Obra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
