const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "bootlover_user",
    password: String(process.env.DB_PASSWORD || "senhaSegura123"),
    database: process.env.DB_NAME || "bootlover_db",
    port: parseInt(process.env.DB_PORT, 10) || 5432,
});

const checkSubscription = async (req, res, next) => {
    const userId = req.user.id; // Supondo que o user id tenha sido adicionado no authMiddleware

    try {
        // Verifica o status da assinatura do usuário
        const result = await pool.query(
            "SELECT status FROM assinaturas WHERE usuario_id = $1",
            [userId]
        );

        if (result.rows.length === 0 || result.rows[0].status !== "ativa") {
            return res.status(403).json({ error: "Sua assinatura está inativa. Realize o pagamento para acessar as funcionalidades." });
        }

        // Se a assinatura estiver ativa, continua para a próxima rota
        next();
    } catch (err) {
        console.error("Erro ao verificar assinatura:", err);
        res.status(500).json({ error: "Erro ao verificar a assinatura." });
    }
};

module.exports = checkSubscription;
