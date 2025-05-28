import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Interfaces para os modelos de dados
interface Obra {
  id?: number; // O ID pode ser opcional no momento do cadastro
  idUsuario: number; // Alterado para number, como na sua model C#
  idEngenheiro: number;
  idStatus: number;
  idTrilho: number;
  trilhoQtd: string;
  nome: string;
  localizacao: string;
  dataInicio: string; // Manter como string para o input type="date"
  dataFim: string;     // Manter como string para o input type="date"
  custoPrevisto: number;
  custoReal: number;
  complexidade: string;
  impactoAmbiental: string;
  descricao: string;
}

interface Usuario { // Adicionado interface para Usuario para pegar o ID do localStorage
  id: number;
  nome: string;
  email: string;
  cpf: string;
  // Adicione outras propriedades se necessário
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
  const [errorMessage, setErrorMessage] = useState<string>(''); // Para mensagens de erro ao usuário

  const [engenheiros, setEngenheiros] = useState<Engenheiro[]>([]);
  const [statusOptions, setStatusOptions] = useState<Status[]>([]);
  const [trilhos, setTrilhos] = useState<Trilho[]>([]);

  const [obra, setObra] = useState<Obra>({
    idUsuario: 0, // Inicializa com 0 ou valor padrão
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

  // Efeito para carregar o ID do usuário do localStorage e dados dos dropdowns
  useEffect(() => {
    const fetchInitialData = async () => {
      let userId = 0;
      const usuarioLogadoString = localStorage.getItem("usuario");
      if (usuarioLogadoString) {
        try {
          const usuarioObj: Usuario = JSON.parse(usuarioLogadoString);
          userId = usuarioObj.id; // Assume que o ID é um número
        } catch (e) {
          console.error("Erro ao parsear usuário do localStorage:", e);
          // Se houver erro, talvez você queira lidar com um ID de usuário padrão ou erro
          setErrorMessage("Erro ao carregar dados do usuário logado.");
        }
      } else {
        // Se não houver usuário logado, você pode redirecionar para login
        // Ou definir um ID padrão/temporário para testes (não recomendado em produção)
        console.warn("Nenhum usuário encontrado no localStorage. Definindo ID de usuário como 0.");
        setErrorMessage("Nenhum usuário logado encontrado. Por favor, faça login.");
      }

      setObra(prev => ({ ...prev, idUsuario: userId }));

      try {
        const [engenheirosRes, statusRes, trilhosRes] = await Promise.all([
          axios.get<Engenheiro[]>('http://localhost:5178/api/engenheiro'),
          axios.get<Status[]>('http://localhost:5178/api/status'),
          axios.get<Trilho[]>('http://localhost:5178/api/trilho'),
        ]);

        setEngenheiros(engenheirosRes.data);
        setStatusOptions(statusRes.data);
        setTrilhos(trilhosRes.data);

        // Preencher os dropdowns com a primeira opção ou 0 se não houver dados
        setObra(prev => ({
          ...prev,
          idEngenheiro: engenheirosRes.data.length > 0 ? engenheirosRes.data[0].id : 0,
          idStatus: statusRes.data.length > 0 ? statusRes.data[0].id : 0,
          idTrilho: trilhosRes.data.length > 0 ? trilhosRes.data[0].id : 0,
        }));
      } catch (error) {
        console.error("Erro ao carregar dados dos dropdowns:", error);
        setErrorMessage("Erro ao carregar opções para engenheiros, status ou trilhos. Verifique se o servidor está rodando e o CORS está configurado.");
        setEngenheiros([]);
        setStatusOptions([]);
        setTrilhos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []); // Array de dependências vazio para rodar apenas uma vez na montagem

  // Lidar com mudanças nos inputs de texto, textarea e select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    // Converte para número apenas para os IDs de FK
    if (['idEngenheiro', 'idStatus', 'idTrilho'].includes(id)) {
      setObra({ ...obra, [id]: Number(value) });
    } else {
      setObra({ ...obra, [id]: value });
    }
  };

  // Lidar com mudanças nos inputs de número
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setObra({ ...obra, [id]: parseFloat(value) || 0 });
  };

  // Lidar com mudanças nos inputs de data (já são strings no formato "YYYY-MM-DD")
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setObra({ ...obra, [id]: value });
  };

  // Função de validação do formulário
  const validateForm = (): boolean => {
    // Limpa mensagens de erro anteriores
    setErrorMessage('');

    // Validação de campos obrigatórios e comprimento mínimo/máximo
    if (!obra.nome || obra.nome.length < 4 || obra.nome.length > 50) {
      setErrorMessage("O nome da obra deve ter entre 4 e 50 caracteres.");
      return false;
    }
    if (!obra.localizacao || obra.localizacao.length < 2 || obra.localizacao.length > 50) {
      setErrorMessage("A localização deve ter entre 2 e 50 caracteres.");
      return false;
    }
    if (!obra.dataInicio) { // Input type="date" já lida com o formato
      setErrorMessage("A data de início é obrigatória.");
      return false;
    }
    if (!obra.dataFim) { // Input type="date" já lida com o formato
      setErrorMessage("A data de fim é obrigatória.");
      return false;
    }
    // Adicione uma validação para garantir que DataFim é posterior a DataInicio
    if (obra.dataInicio && obra.dataFim && new Date(obra.dataFim) < new Date(obra.dataInicio)) {
      setErrorMessage("A data de fim não pode ser anterior à data de início.");
      return false;
    }

    if (obra.custoPrevisto === 0) { // Pode ser 0, mas geralmente não é um bom padrão
        setErrorMessage("O custo previsto é obrigatório e deve ser um valor válido.");
        return false;
    }
    if (obra.custoReal < 0) { // Custo real pode ser 0, mas não negativo
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

    // Validação para dropdowns: verifica se uma opção válida foi selecionada
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

  // Lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Formata as datas para o padrão ISO 8601 que sua API .NET Core espera
      const formattedObra = {
        ...obra,
        dataInicio: new Date(obra.dataInicio).toISOString(),
        dataFim: new Date(obra.dataFim).toISOString(),
        idUsuario: obra.idUsuario, // Garante que o ID do usuário seja incluído
      };

      const response = await axios.post('http://localhost:5178/api/obra', formattedObra);
      alert("Obra cadastrada com sucesso! ID: " + response.data.id);
      
      // Limpa o formulário e redefine os valores dos dropdowns para o primeiro item ou 0
      setObra({
        idUsuario: obra.idUsuario, // Mantém o ID do usuário logado
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
      setErrorMessage(''); // Limpa qualquer mensagem de erro anterior

    } catch (error) {
      console.error("Erro ao processar obra:", error);
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        let msg = '';
        if (typeof errorData === 'string') {
          msg = errorData; // Mensagem simples de Bad Request
        } else if (errorData.errors) { // Erros de validação do ModelState
          for (const key in errorData.errors) {
            msg += `${key}: ${errorData.errors[key].join(', ')}\n`;
          }
        } else if (errorData.title) { // Outros erros com título
            msg = errorData.title;
        } else {
            msg = "Detalhes do erro não disponíveis.";
        }
        setErrorMessage(`Erro ao cadastrar obra: ${msg}`);
      } else {
        setErrorMessage(`Erro de conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Renderização condicional enquanto os dados estão sendo carregados
  if (loading && engenheiros.length === 0 && statusOptions.length === 0 && trilhos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-indigo-600 text-lg font-semibold">Carregando dados...</div>
      </div>
    );
  }

  // Renderização do formulário
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="form-container bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Cadastro de Obra</h2>
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
          {/* Campo de ID do Usuário (somente leitura) */}
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

          {/* Campos de texto e números */}
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

          {/* Dropdowns para FKs */}
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
              type="text" // Mantido como texto pela sua model, mas pode ser number se for sempre um número
              id="trilhoQtd"
              value={obra.trilhoQtd}
              onChange={handleChange}
              required
              maxLength={15}
              minLength={1}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Textarea para descrição */}
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

          {/* Botão de envio */}
          <div className="col-span-full flex justify-center mt-6">
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