import React, { useState } from 'react';
import axios from 'axios';

interface Status {
  id?: number;
  nome: string;
}

export default function App() {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const enviarStatus = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("O nome do status é obrigatório.");
      return;
    }

    setLoading(true);
    try {
      const status: Status = {
        nome: nome,
      };

      const response = await axios.post("http://localhost:5178/api/status", status);
      
      console.log("Status cadastrado:", response.data);
      alert("Status cadastrado com sucesso!");
      setNome(""); // Limpa o campo após o cadastro

    } catch (error: any) {
      console.error("Erro ao cadastrar status:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        alert(`Erro ao cadastrar: ${JSON.stringify(error.response.data.errors)}`);
      } else {
        alert("Erro ao conectar com o servidor ou cadastrar status.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="form-container bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Cadastro de Status</h2>
        <form onSubmit={enviarStatus} className="space-y-4">
          <div className="form-group">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Status</label>
            <input
              placeholder="Ex: Concluída"
              type="text"
              id="nome"
              value={nome}
              required
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Status'}
          </button>
        </form>
      </div>
    </div>
  );
}
