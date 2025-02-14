import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import '../../styles/components/Roleta2D.scss';

const Roleta2D = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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

  const girarRoleta = () => {
    if (isSpinning || !assinaturaAtiva) {
      toast.error("Assinatura inativa. Renove para continuar.");
      return;
    }

    const roletaElement = document.getElementById("roleta-image");
    roletaElement.style.transition = "none";
    roletaElement.style.transform = "rotate(0deg)";

    setTimeout(() => {
      setIsSpinning(true);

      const opcoes = [
        "Poste uma foto de casal no stories",
        "Beijo de cinema",
        "Fazer uma cantada",
        "30 segundos pra dar um selinho",
        "Escolha alguém pra dar um beijo",
        "Rodada de bebida",
      ];

      const grausSegmento = 360 / opcoes.length;
      const randomIndex = Math.floor(Math.random() * opcoes.length);
      const ajusteCentral = grausSegmento / 2;

      const grausFinal = 360 * 3 + randomIndex * grausSegmento + ajusteCentral;

      roletaElement.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
      roletaElement.style.transform = `rotate(${grausFinal}deg)`;

      setTimeout(() => {
        setIsSpinning(false);
      }, 4000);
    }, 100);
  };

  if (assinaturaAtiva === null) {
    return <div>Verificando assinatura...</div>;
  }

  return (
    <div className="roleta2d-container">
      <h2>Roleta</h2>
      <div className="roleta-wrapper">
        <img
          id="roleta-image"
          src={`${process.env.PUBLIC_URL}/roleta-custom.png`}
          alt="Roleta"
          className="roleta-image"
        />
        <div className="ponteiro"></div>
      </div>
      <button onClick={girarRoleta} disabled={isSpinning}>
        Girar Roleta
      </button>
    </div>
  );
};

export default Roleta2D;
