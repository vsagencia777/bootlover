import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/MenuLateral/MenuLateral';
import Dashboard from './components/Dashboard/Dashboard';
import Roleta2D from './components/Roleta2D/Roleta2D';
import JogoCartas from './components/Cartas/Cartas';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Perfil from './components/Perfil/Perfil'; // Atualizado para usar "Perfil"
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faGamepad, faDice, faUserEdit } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        await axios.get('http://188.245.104.72:3003/auth/validate-token', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        toast.error('Sessão expirada. Faça login novamente.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verificarToken();

    // Responsividade
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://188.245.104.72:3003/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Erro ao buscar perfil do usuário', error);
        }
      }
    };
    getUserProfile();
  }, []);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="container-fluid">
      <div className="row">
        {screenWidth >= 1024 && !isAuthPage && (
          <div className="col-md-4">
            <Sidebar user={user} />
          </div>
        )}

        <div className={isAuthPage ? 'col-12' : 'col-12 col-md-8'}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/jogos/roleta" element={<PrivateRoute element={<Roleta2D />} />} />
            <Route path="/jogos/cartas" element={<PrivateRoute element={<JogoCartas />} />} />
            <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
            <Route path="/perfil" element={<PrivateRoute element={<Perfil />} />} /> {/* Atualizado */}
          </Routes>
        </div>
      </div>

      {screenWidth < 1024 && !isAuthPage && (
        <div className="d-md-none fixed-bottom bg-dark text-light text-center p-2">
          <div className="d-flex justify-content-around">
            <div onClick={() => window.location.href = '/chat'} className="nav-icon">
              <FontAwesomeIcon icon={faCommentDots} size="lg" />
              <div>Chat</div>
            </div>
            <div onClick={() => window.location.href = '/jogos/cartas'} className="nav-icon">
              <FontAwesomeIcon icon={faGamepad} size="lg" />
              <div>Cartas</div>
            </div>
            <div onClick={() => window.location.href = '/jogos/roleta'} className="nav-icon">
              <FontAwesomeIcon icon={faDice} size="lg" />
              <div>Roleta</div>
            </div>
            <div onClick={() => window.location.href = '/perfil'} className="nav-icon">
              <FontAwesomeIcon icon={faUserEdit} size="lg" />
              <div>Perfil</div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
