import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ element }) => {
  const [tokenValido, setTokenValido] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verificarToken = async () => {
      try {
        if (!token) {
          setTokenValido(false);
          return;
        }

        // Valida o token no backend
        await axios.get('http://188.245.104.72:3003/auth/validate-token', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTokenValido(true);  // Se o token for válido, não faz nada
      } catch (error) {
        console.error('Token inválido ou expirado:', error);
        setTokenValido(false);
        localStorage.removeItem('token');  // Remove o token inválido
      }
    };

    verificarToken();
  }, [token]);

  // Se o token for inválido, redireciona para login
  if (!tokenValido) {
    return <Navigate to="/login" replace />;
  }

  return element;  // Se estiver tudo ok, renderiza o componente protegido
};

export default PrivateRoute;
