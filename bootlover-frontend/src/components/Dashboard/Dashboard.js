import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/dashboard.scss"; // Estilo do dashboard

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-content">
      <h1>Bem-vindo ao seu painel, {user ? user.nome : "usuário"}</h1>
      <p>Aqui você pode acessar seus jogos, editar seu perfil, e muito mais.</p>

      <div className="profile-actions">
        <button onClick={() => navigate("/editar-perfil")}>Editar Perfil</button>
      </div>
    </div>
  );
};

export default Dashboard;
