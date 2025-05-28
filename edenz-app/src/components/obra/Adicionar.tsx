import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Obra {
  id?: string;
  idUsuario: string;
  idEngenheiro: string;
  idStatus: string;
  idTrilho: string;
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
  id: string;
  nome: string;
}

interface Status {
  id: string;
  nome: string;
}

interface Trilho {
  id: string;
  nome: string;
}

const CustomMessage = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 p-4 rounded-md shadow-lg border ${bgColor} flex items-center justify-between animate-fade-in-down`}>
      <p className={`font-semibold ${textColor}`}>{message}</p>
      <button onClick={onClose} className="ml-4 text-lg font-bold text-gray-600 hover:text-gray-800">
        &times;
      </button>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [engenheiros, setEngenheiros] = useState<Engenheiro[]>([]);
  const [statusOptions, setStatusOptions] = useState<Status[]>([]);
  const [trilhos, setTrilhos] = useState<Trilho[]>([]);

  const [obra, setObra] = useState<Obra>({
    idUsuario: 'user-mock-id',
    idEngenheiro: '',
    idStatus: '',
    idTrilho: '',
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

        // Define os valores iniciais para os dropdowns se houver dados
        setObra(prev => ({
          ...prev,
          idEngenheiro: engenheirosRes.data.length > 0 ? engenheirosRes.data[0].id : '',
          idStatus: statusRes.data.length > 0 ? statusRes.data[0].id : '',
          idTrilho: trilhosRes.data.length > 0 ? trilhosRes.data[0].id : '',
        }));
      } catch (error) {
        console.error("Erro ao carregar dados dos dropdowns:", error);
        showMessage("Erro ao carregar opções para engenheiros, status ou trilhos.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setObra({ ...obra, [id]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setObra({ ...obra, [id]: parseFloat(value) || 0 });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setObra({ ...obra, [id]: value });
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const validateForm = (): boolean => {
    if (!obra.nome || obra.nome.length < 4 || obra.nome.length > 50) {
      showMessage("O nome da obra deve ter entre 4 e 50 caracteres.", "error");
      return false;
    }
    if (!obra.localizacao || obra.localizacao.length < 2 || obra.localizacao.length > 50) {
      showMessage("A localização deve ter entre 2 e 50 caracteres.", "error");
      return false;
    }
    if (!obra.dataInicio || obra.dataInicio.length < 7 || obra.dataInicio.length > 13) {
      showMessage("A data de início deve ter entre 7 e 13 caracteres.", "error");
      return false;
    }
    if (!obra.dataFim || obra.dataFim.length < 7 || obra.dataFim.length > 13) {
      showMessage("A data de fim deve ter entre 7 e 13 caracteres.", "error");
      return false;
    }
    if (obra.custoPrevisto <= 0) {
      showMessage("O custo previsto deve ser um valor positivo.", "error");
      return false;
    }
    if (obra.custoReal < 0) {
      showMessage("O custo real não pode ser negativo.", "error");
      return false;
    }
    if (!obra.complexidade || obra.complexidade.length < 1 || obra.complexidade.length > 20) {
      showMessage("A complexidade deve ter entre 1 e 20 caracteres.", "error");
      return false;
    }
    if (!obra.impactoAmbiental || obra.impactoAmbiental.length < 1 || obra.impactoAmbiental.length > 30) {
      showMessage("O impacto ambiental deve ter entre 1 e 30 caracteres.", "error");
      return false;
    }
    if (!obra.descricao || obra.descricao.length < 1 || obra.descricao.length > 100) {
      showMessage("A descrição deve ter entre 1 e 100 caracteres.", "error");
      return false;
    }
    if (!obra.trilhoQtd || obra.trilhoQtd.length < 1 || obra.trilhoQtd.length > 15) {
      showMessage("A quantidade de trilho deve ter entre 1 e 15 caracteres.", "error");
      return false;
    }
    if (!obra.idEngenheiro) {
      showMessage("Selecione um engenheiro.", "error");
      return false;
    }
    if (!obra.idStatus) {
      showMessage("Selecione um status.", "error");
      return false;
    }
    if (!obra.idTrilho) {
      showMessage("Selecione um tipo de trilho.", "error");
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
      // Simula o envio para uma API (substitua por sua chamada fetch/axios real)
      console.log("Dados da Obra a serem enviados:", obra);
      // Exemplo de como você faria uma requisição POST com axios:
      // await axios.post('http://localhost:5178/api/obra', obra);
      showMessage("Obra validada e dados logados no console!", "success");
      setObra({
        idUsuario: 'user-mock-id',
        idEngenheiro: engenheiros.length > 0 ? engenheiros[0].id : '',
        idStatus: statusOptions.length > 0 ? statusOptions[0].id : '',
        idTrilho: trilhos.length > 0 ? trilhos[0].id : '',
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
      showMessage("Erro ao processar obra. Verifique o console para mais detalhes.", "error");
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
      <CustomMessage message={message?.text || ''} type={message?.type || 'success'} onClose={() => setMessage(null)} />

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
                <option value="">Carregando engenheiros...</option>
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
                <option value="">Carregando status...</option>
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
                <option value="">Carregando trilhos...</option>
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
