import React, { useEffect, useState } from "react";
import axios from "axios";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

function UsuarioListar() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5178/api/usuario")
      .then((res) => {
        setUsuarios(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuários:", err);
        alert("Erro ao carregar usuários. Verifique se a API está rodando.");
      });
  }, []);

  return (
    <div className="divMain">
      <h1>Listar Usuários</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.cpf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuarioListar;
