const express = require("express");
const { OpenAI } = require("openai");
const checkSubscription = require("../middleware/checkSubscription");

const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Lista de palavras de saudação
const palavrasSaudacao = ["oi", "olá", "e aí", "fala", "bom dia", "boa tarde", "boa noite"];

// Estado por usuário (último horário de interação)
const estadoUsuarios = new Map(); // Armazena { userId: { ultimoHorarioInteracao } }

// Função para verificar se a mensagem é uma saudação
const isSaudacao = (mensagem) => {
    const mensagemLower = mensagem.toLowerCase();
    return palavrasSaudacao.some((saudacao) => mensagemLower.includes(saudacao));
};

// Função para verificar se passou mais de 2 horas desde a última interação
const passouTempoLimite = (userId) => {
    const estadoUsuario = estadoUsuarios.get(userId);
    if (!estadoUsuario || !estadoUsuario.ultimoHorarioInteracao) return true;
    const agora = new Date();
    const diferencaHoras = (agora - estadoUsuario.ultimoHorarioInteracao) / (1000 * 60 * 60); // Diferença em horas
    return diferencaHoras > 2;
};

// Atualiza o estado do usuário com o último horário de interação
const atualizarHorarioInteracao = (userId) => {
    estadoUsuarios.set(userId, { ultimoHorarioInteracao: new Date() });
};

// Prompt especializado para o agente
const promptBase = [
    {
        role: "system",
        content: `
        Você é um agente especializado em ajudar homens a iniciar conversas e conquistar mulheres em ambientes sociais, como festas, bares ou encontros. 
        Suas respostas devem ser diretas, confiantes, criativas e baseadas nas preferências descritas pelo usuário. 
        Seja sucinto, evite respostas longas e sempre se concentre no contexto de conquista social. Não discuta temas fora desse contexto.`
    }
];

// Endpoint do Chat (com validação de assinatura)
router.post("/", checkSubscription, async (req, res) => {
    const { mensagem, userId } = req.body;  // Agora recebemos o userId junto com a mensagem

    if (!mensagem || mensagem.trim() === "") {
        return res.status(400).json({ error: "Mensagem não pode estar vazia." });
    }

    // Determina se deve incluir a saudação descontraída
    const incluirSaudacao = isSaudacao(mensagem) || passouTempoLimite(userId);

    if (incluirSaudacao) {
        atualizarHorarioInteracao(userId);  // Atualiza o último horário de interação para este usuário
    }

    // Mensagem de saudação dinâmica
    const saudacao = incluirSaudacao 
        ? "Fala jogador! Como posso te ajudar hoje com aquela conquista especial?" 
        : "";

    try {
        // Envia a mensagem para a OpenAI com o prompt especializado
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini-2024-07-18",
            messages: [
                ...promptBase,
                { role: "user", content: saudacao + " " + mensagem }
            ],
            max_tokens: 100,  // Limitando a resposta a 100 tokens
            temperature: 0.6,  // Ajuste para respostas mais concisas e menos criativas
        });

        const resposta = response.choices[0].message.content.trim();
        res.json({ mensagem: resposta });
    } catch (err) {
        console.error("Erro no chat com OpenAI:", err);
        res.status(500).json({ error: "Erro ao processar a mensagem no chat." });
    }
});

module.exports = router;
