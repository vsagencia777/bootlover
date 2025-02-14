import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../../styles/components/form.scss'; // Estilo para o formulário

function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://188.245.104.72:3003/auth/register", {
        nome,
        email,
        senha,
      });
      toast.success("Cadastro realizado com sucesso! Redirecionando...");
      navigate("/login"); // Redireciona para a tela de login após o sucesso
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Erro: ${error.response.data.message}`);
      } else {
        toast.error("Erro ao fazer cadastro. Tente novamente.");
      }
      console.error("Erro ao fazer cadastro:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Cadastrar</h2>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
        <p>
          Já tem uma conta? <a href="/login">Faça login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
