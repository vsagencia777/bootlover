// src/api.js
import axios from 'axios';

const API_URL = 'http://188.245.104.72:3003'; // Substitua com o seu IP/porta

// Instância do axios para usar no Chat.js
const api = axios.create({
  baseURL: API_URL,
});

// Função para realizar o login
export const login = async (email, senha) => {
  try {
    const response = await api.post("/auth/login", { email, senha });
    return response.data; // Retorna o token e outros dados
  } catch (error) {
    throw error;
  }
};

// Função para realizar o cadastro
export const register = async (nome, email, senha) => {
  try {
    const response = await api.post("/auth/register", { nome, email, senha });
    return response.data; // Retorna dados do usuário ou confirmação
  } catch (error) {
    throw error;
  }
};

// Exportando a instância do axios
export default api;
