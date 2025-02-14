const express = require("express");
const checkSubscription = require("../middleware/checkSubscription"); // Middleware de verificação de assinatura
const authMiddleware = require("../middleware/authMiddleware"); // Middleware de autenticação

const router = express.Router();

// Opções da Roleta
const opcoesRoleta = [
    "Poste uma foto de casal no stories",
    "Beijo de cinema",
    "Fazer uma cantada pra alguém da festa",
    "30 segundos pra dar um selinho em alguém (se perder me beija)",
    "Escolha alguém pra dar um beijo",
    "Rodada de bebida",
];

// Rota do Jogo da Roleta
router.get("/roleta", authMiddleware, checkSubscription, (req, res) => {
    try {
        const resultado = opcoesRoleta[Math.floor(Math.random() * opcoesRoleta.length)];

        res.json({
            message: "Resultado da Roleta",
            resultado,
        });
    } catch (err) {
        console.error("Erro ao jogar roleta:", err);
        res.status(500).json({ error: "Erro ao jogar roleta." });
    }
});

// Opções das Cartas
const opcoesCartas = [
    { id: 1, comando: "Beijo na boca" },
    { id: 2, comando: "Pague um drink" },
    { id: 3, comando: "Dar 3 selinhos" },
    { id: 4, comando: "Tapa na cara" },
    { id: 5, comando: "Escolha alguém pra beijar" },
    { id: 6, comando: "Faça uma cantada (se for boa, ganha um beijo)" },
    { id: 7, comando: "Dar 3 beijos em qualquer lugar do rosto" },
    { id: 8, comando: "Quer pegar meu amigo/minha amiga?" },
];

// Rota do Jogo das Cartas
router.get("/cartas", authMiddleware, checkSubscription, (req, res) => {
    try {
        const cartasEmbaralhadas = [...opcoesCartas].sort(() => Math.random() - 0.5);
        const cartaEscolhida = cartasEmbaralhadas[0];

        res.json({
            message: "Resultado do Jogo das Cartas",
            carta: cartaEscolhida,
        });
    } catch (err) {
        console.error("Erro ao jogar Jogo das Cartas:", err);
        res.status(500).json({ error: "Erro ao jogar Jogo das Cartas." });
    }
});

module.exports = router;
