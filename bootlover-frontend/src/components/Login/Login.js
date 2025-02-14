import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://188.245.104.72:3003/auth/login", {
        email,
        senha,
      });

      const { token, userId, nome, assinaturaStatus } = response.data;

      // Armazenar informações no localStorage
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("assinaturaStatus", assinaturaStatus);
      localStorage.setItem("userName", nome);  // Armazenar o nome do usuário

      toast.success("Login realizado com sucesso!");
      window.location.href = "/chat"; // Redirecionar para a página de chat
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email"
        style={styles.input}
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite sua senha"
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>Entrar</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "300px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Login;
