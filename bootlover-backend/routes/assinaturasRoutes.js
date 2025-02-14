const express = require("express");
const { Pool } = require("pg");

const router = express.Router();
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Criar uma nova assinatura
router.post("/create", async (req, res) => {
    const { usuario_id } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO assinaturas (usuario_id, status) VALUES ($1, 'ativa') RETURNING id",
            [usuario_id]
        );
        res.status(201).json({ message: "Assinatura criada com sucesso!", assinaturaId: result.rows[0].id });
    } catch (err) {
        console.error("Erro ao criar assinatura:", err);
        res.status(500).json({ error: "Erro ao criar assinatura." });
    }
});

// Consultar assinatura por usuário
router.get("/:usuario_id", async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM assinaturas WHERE usuario_id = $1", [usuario_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Assinatura não encontrada." });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Erro ao consultar assinatura:", err);
        res.status(500).json({ error: "Erro ao consultar assinatura." });
    }
});

// Atualizar assinatura (cancelar ou alterar status)
router.put("/:usuario_id", async (req, res) => {
    const { usuario_id } = req.params;
    const { status } = req.body;

    try {
        const result = await pool.query(
            "UPDATE assinaturas SET status = $1, atualizado_em = CURRENT_TIMESTAMP WHERE usuario_id = $2 RETURNING *",
            [status, usuario_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Assinatura não encontrada." });
        }
        res.json({ message: "Assinatura atualizada com sucesso!", assinatura: result.rows[0] });
    } catch (err) {
        console.error("Erro ao atualizar assinatura:", err);
        res.status(500).json({ error: "Erro ao atualizar assinatura." });
    }
});

// Listar todas as assinaturas (admin)
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM assinaturas");
        res.json(result.rows);
    } catch (err) {
        console.error("Erro ao listar assinaturas:", err);
        res.status(500).json({ error: "Erro ao listar assinaturas." });
    }
});

module.exports = router;

