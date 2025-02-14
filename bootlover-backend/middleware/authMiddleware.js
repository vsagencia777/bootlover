const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Obtém o token do cabeçalho Authorization
    const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
        return res.status(403).json({ error: "Acesso negado. Token não fornecido." });
    }

    try {
        // Verifica e decodifica o token
        const decoded = jwt.verify(token, "chaveSecreta"); // A chave secreta deve ser a mesma usada ao gerar o token
        req.user = decoded; // Adiciona as informações do usuário no request
        next(); // Se o token for válido, continua a execução da próxima função (rota)
    } catch (err) {
        console.error("Erro ao verificar token:", err);
        return res.status(401).json({ error: "Token inválido ou expirado." });
    }
};

module.exports = authMiddleware;
