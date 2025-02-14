import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Perfil.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Troquei useHistory por useNavigate

const Perfil = () => {
  const [perfil, setPerfil] = useState({ nome: "", email: "", assinaturaStatus: "", vencimento: "" });
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const navigate = useNavigate(); // Usando useNavigate agora

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://188.245.104.72:3003/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPerfil({
          nome: response.data.nome,
          email: response.data.email,
          assinaturaStatus: response.data.assinaturaStatus || "Sem assinatura",
          vencimento: response.data.vencimento || "Não definido",
        });
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        toast.error("Erro ao carregar informações do perfil.");
      }
    };

    fetchPerfil();
  }, []);

  const handleAlterarSenha = async () => {
    if (novaSenha !== confirmarNovaSenha) {
      toast.error("A nova senha e a confirmação não correspondem.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        "http://188.245.104.72:3003/auth/profile",
        { senhaAtual, novaSenha },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Senha alterada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarNovaSenha("");
    } catch (err) {
      console.error("Erro ao alterar senha:", err);
      toast.error("Erro ao alterar senha. Verifique a senha atual.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div className="perfil-container">
      <h2>Perfil do Usuário</h2>

      <div className="info-section">
        <label>Nome:</label>
        <input type="text" value={perfil.nome} readOnly />

        <label>Email:</label>
        <input type="email" value={perfil.email} readOnly />

        <label>Status da Assinatura:</label>
        <input type="text" value={perfil.assinaturaStatus} readOnly />

        <label>Vencimento da Assinatura:</label>
        <input type="text" value={new Date(perfil.vencimento).toLocaleDateString()} readOnly />
      </div>

      <div className="senha-section">
        <h3>Alterar Senha</h3>
        <label>Senha Atual:</label>
        <input
          type="password"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
        />

        <label>Nova Senha:</label>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />

        <label>Confirmar Nova Senha:</label>
        <input
          type="password"
          value={confirmarNovaSenha}
          onChange={(e) => setConfirmarNovaSenha(e.target.value)}
        />

        <button onClick={handleAlterarSenha}>Alterar Senha</button>
      </div>

      {/* Botão de Logout */}
      <button onClick={handleLogout} className="logout-button">Sair</button>
    </div>
  );
};

export default Perfil;
