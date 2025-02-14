const express = require("express");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const router = express.Router();
const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "bootlover_user",
    password: String(process.env.DB_PASSWORD || "senhaSegura123"),
    database: process.env.DB_NAME || "bootlover_db",
    port: parseInt(process.env.DB_PORT, 10) || 5432,
});

// Função para calcular o vencimento (30 dias)
const calcularVencimento = () => {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 dias a partir de hoje
};

// Rota de Cadastro
router.post("/register", async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailExists = await pool.query("SELECT id FROM usuarios WHERE email = $1", [email]);
        if (emailExists.rows.length > 0) {
            return res.status(400).json({ error: "E-mail já cadastrado." });
        }

        const hashedPassword = await bcrypt.hash(String(senha), 10);

        const userResult = await pool.query(
            "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id",
            [nome, email, hashedPassword]
        );

        const userId = userResult.rows[0].id;

        // Criação inicial de assinatura com vencimento em 30 dias
        await pool.query(
            "INSERT INTO assinaturas (usuario_id, status, criado_em, atualizado_em, vencimento) VALUES ($1, $2, $3, $4, $5)",
            [userId, 'ativa', new Date(), new Date(), calcularVencimento()]
        );

        res.status(201).json({ message: "Usuário cadastrado com sucesso!", userId });
    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
        res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }
});

// Rota de Login
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        const userResult = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const user = userResult.rows[0];
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Senha inválida." });
        }

        const assinaturaResult = await pool.query(
            "SELECT status, vencimento FROM assinaturas WHERE usuario_id = $1",
            [user.id]
        );

        let assinaturaStatus = "sem assinatura";
        let vencimento = null;

        if (assinaturaResult.rows.length > 0) {
            assinaturaStatus = assinaturaResult.rows[0].status;
            vencimento = assinaturaResult.rows[0].vencimento;
        }

        const token = jwt.sign({ id: user.id }, "chaveSecreta", { expiresIn: "3d" });

        res.json({
            message: "Login realizado com sucesso!",
            token,
            userId: user.id,
            nome: user.nome,  // Incluindo o nome do usuário na resposta
            assinaturaStatus,
            vencimento,
        });
    } catch (err) {
        console.error("Erro ao realizar login:", err);
        res.status(500).json({ error: "Erro ao realizar login." });
    }
});


// Rota para buscar perfil do usuário
router.get("/profile", async (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, "chaveSecreta");
        const userId = decoded.id;

        // Buscar informações do usuário
        const userResult = await pool.query("SELECT nome, email FROM usuarios WHERE id = $1", [userId]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        // Buscar status da assinatura e data de vencimento
        const assinaturaResult = await pool.query(
            "SELECT status, criado_em + interval '1 year' AS vencimento FROM assinaturas WHERE usuario_id = $1",
            [userId]
        );

        let assinaturaStatus = "sem assinatura";
        let vencimento = null;

        if (assinaturaResult.rows.length > 0) {
            assinaturaStatus = assinaturaResult.rows[0].status;
            vencimento = assinaturaResult.rows[0].vencimento;
        }

        res.json({
            nome: userResult.rows[0].nome,
            email: userResult.rows[0].email,
            assinaturaStatus,
            vencimento,
        });
    } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        res.status(500).json({ error: "Erro ao buscar perfil." });
    }
});

// Rota para atualizar senha do perfil
router.put("/profile", async (req, res) => {
    const { senhaAtual, novaSenha } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, "chaveSecreta");
        const userId = decoded.id;

        // Verifica a senha atual
        const userResult = await pool.query("SELECT senha FROM usuarios WHERE id = $1", [userId]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const isPasswordValid = await bcrypt.compare(senhaAtual, userResult.rows[0].senha);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Senha atual inválida." });
        }

        // Atualiza para a nova senha
        const hashedNewPassword = await bcrypt.hash(novaSenha, 10);
        await pool.query("UPDATE usuarios SET senha = $1 WHERE id = $2", [hashedNewPassword, userId]);

        res.json({ message: "Senha atualizada com sucesso!" });
    } catch (err) {
        console.error("Erro ao atualizar perfil:", err);
        res.status(500).json({ error: "Erro ao atualizar perfil." });
    }
});

// Rota para validar o token JWT
router.get("/validate-token", (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido." });
    }

    try {
        jwt.verify(token, "chaveSecreta");
        res.sendStatus(200);
    } catch (err) {
        console.error("Token inválido ou expirado:", err);
        res.status(401).json({ error: "Token inválido ou expirado." });
    }
});

module.exports = router;
