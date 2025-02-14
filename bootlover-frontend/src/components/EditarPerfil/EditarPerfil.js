import React, { useState, useEffect } from "react";
import axios from "axios";

const EditarPerfil = () => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Pegar o perfil do usuário
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://188.245.104.72:3003/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
          setNome(response.data.nome); // Inicializando com o nome atual
        })
        .catch((error) => {
          console.error("Erro ao carregar perfil", error);
        });
    }
  }, []);

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Envia a atualização para o backend
        const response = await axios.put(
          "http://188.245.104.72:3003/auth/profile", // A URL correta do backend
          { nome, senha },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Perfil atualizado com sucesso!");

        // Atualiza o nome do usuário localmente
        setUser({ ...user, nome });

      } catch (error) {
        console.error("Erro ao atualizar o perfil:", error);
        alert("Erro ao atualizar perfil.");
      }
    }
  };

  return (
    <div>
      <h2>Editar Perfil</h2>
      {user ? (
        <form onSubmit={handleSaveChanges}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <label>Nova Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button type="submit">Salvar Alterações</button>
        </form>
      ) : (
        <p>Carregando informações do perfil...</p>
      )}
    </div>
  );
};

export default EditarPerfil;
