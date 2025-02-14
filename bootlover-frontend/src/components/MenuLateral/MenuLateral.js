import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MenuLateral.css";

const MenuLateral = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://188.245.104.72:3003/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar os dados do usuário", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redireciona para a home após logout
  };

  return (
    <div className="sidebar">
      <div className="logo">Boot Lover</div>
      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/jogos/roleta">
            <i className="fas fa-dice"></i>
            <span>Jogo da Roleta</span>
          </Link>
        </li>
        <li>
          <Link to="/jogos/cartas">
            <i className="fas fa-clone"></i>
            <span>Jogo das Cartas</span>
          </Link>
        </li>
        <li>
          <Link to="/chat">
            <i className="fas fa-comments"></i>
            <span>Chat</span>
          </Link>
        </li>
      </ul>

      <div className="user-info">
        {user ? (
          <>
            <p>Bem-vindo, {user.nome}</p>
            <Link to="/perfil">Perfil</Link> {/* Atualizado */}
            <br />
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Cadastrar</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuLateral;
