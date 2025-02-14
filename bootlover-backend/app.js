// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// Log para verificar as variáveis de ambiente
console.log('Variáveis carregadas do .env:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const express = require("express");
const cors = require("cors"); // Importando o CORS
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/authMiddleware");  // Middleware de autenticação
const checkSubscription = require("./middleware/checkSubscription");  // Middleware de verificação de assinatura
const authRoutes = require("./routes/authRoutes");
const assinaturasRoutes = require("./routes/assinaturasRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const jogosRoutes = require("./routes/jogosRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
const port = process.env.PORT || 3003;

// Habilitar CORS
app.use(cors({
  origin: 'http://188.245.104.72:3000', // Permitir acesso somente do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

// Configuração do PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Verificar conexão com o banco de dados
pool.connect((err, client, release) => {
    if (err) {
        console.error("Erro ao conectar no banco de dados:", err);
    } else {
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
    }
    release();
});

// Middleware
app.use(bodyParser.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/assinaturas", assinaturasRoutes);
app.use("/webhook", webhookRoutes);

// Rotas de jogos e chat, com autenticação e validação de assinatura
app.use("/jogos", authMiddleware, checkSubscription, jogosRoutes);
app.use("/chat", authMiddleware, checkSubscription, chatRoutes);

// Rota inicial
app.get("/", (req, res) => {
    res.send("Boot Lover Backend está funcionando!");
});

// Servidor
const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// Configurar o timeout do servidor para 1 minuto (60000 ms)
server.setTimeout(60000);
