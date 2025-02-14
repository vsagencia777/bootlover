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

// Rota para receber o Webhook
router.post("/payment", async (req, res) => {
    const { usuario_id, status_pagamento } = req.body;

    try {
        console.log("Dados recebidos no webhook:", req.body);

        // Validar dados recebidos
        if (!usuario_id || !status_pagamento) {
            return res.status(400).json({ error: "Dados inválidos recebidos no Webhook." });
        }

        // Atualizar o status da assinatura no banco de dados
        let novoStatus = "pendente";
        if (status_pagamento === "paid") {
            novoStatus = "ativa";
        } else if (status_pagamento === "failed" || status_pagamento === "canceled") {
            novoStatus = "cancelada";
        }

        const result = await pool.query(
            "UPDATE assinaturas SET status = $1, atualizado_em = CURRENT_TIMESTAMP WHERE usuario_id = $2 RETURNING *",
            [novoStatus, usuario_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Assinatura não encontrada para o usuário." });
        }

        console.log("Status atualizado com sucesso:", result.rows[0]);
        res.status(200).json({ message: "Status da assinatura atualizado com sucesso!", assinatura: result.rows[0] });
    } catch (err) {
        console.error("Erro ao processar o webhook:", err);
        res.status(500).json({ error: "Erro ao processar o Webhook." });
    }
});

module.exports = router;

