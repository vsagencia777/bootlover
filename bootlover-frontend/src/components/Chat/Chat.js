import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";  // Importando o ícone de seta
import "../../styles/components/chat.scss";

const Chat = () => {
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(null);
  const [digitando, setDigitando] = useState(false);
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const chatContainerRef = useRef(null);

  useEffect(() => {
    const verificarAssinatura = async () => {
      if (!userId || !token) {
        toast.error("Usuário não autenticado.");
        setAssinaturaAtiva(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://188.245.104.72:3003/assinaturas/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.status === "ativa") {
          setAssinaturaAtiva(true);
        } else {
          setAssinaturaAtiva(false);
          toast.error("Assinatura inativa. Renove para continuar.");
        }
      } catch (error) {
        console.error("Erro ao verificar assinatura:", error);
        setAssinaturaAtiva(false);
      }
    };
    verificarAssinatura();
  }, [userId, token]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [mensagens]);

  const enviarMensagem = async () => {
    if (!assinaturaAtiva) {
      toast.error("Assinatura inativa. Renove para continuar.");
      return;
    }
    if (mensagem.trim() === "") {
      toast.warning("A mensagem não pode estar vazia.");
      return;
    }

    const novaMensagemUsuario = { autor: userName || "Usuário", texto: mensagem };
    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    setMensagem("");

    try {
      setDigitando(true);  
      const response = await axios.post(
        "http://188.245.104.72:3003/chat",
        { mensagem, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const respostaAgente = response.data.mensagem || "Sem resposta do agente.";
      const novaMensagemAgente = { autor: "Jefrey", texto: respostaAgente };
      setMensagens((prev) => [...prev, novaMensagemAgente]);
      setDigitando(false);  
    } catch (error) {
      console.error("Erro ao obter a resposta do agente:", error);
      toast.error("Erro ao obter a resposta do agente.");
      setDigitando(false);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Jefrey</h2>
      <div className="chat-box" ref={chatContainerRef}>
        {mensagens.map((msg, index) => (
          <motion.div
            key={index}
            className={`message-container ${msg.autor === userName ? "user-message" : "agent-message"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="message-author">{msg.autor}</div>
            <div>{msg.texto}</div>
          </motion.div>
        ))}
        {digitando && (
          <motion.div className="message-container agent-message" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="message-author">Jefrey</div>
            <div>Está digitando...</div>
          </motion.div>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="input"
        />
        <button onClick={enviarMensagem} className="button">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;
