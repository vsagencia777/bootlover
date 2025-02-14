import React, { useState, useEffect } from "react";
import { useSpring, animated } from '@react-spring/web'; // Importa o React Spring
import "./Cartas.css";

const Cartas = () => {
  const cartasFrente = Array.from({ length: 8 }, (_, i) =>
    require(`../../assets/carta${i + 1}.png`)
  );
  const cartaVerso = require(`../../assets/baralho-verso.png`);

  const [cartas, setCartas] = useState(
    cartasFrente.map((imagemFrente, index) => ({
      id: index,
      imagemFrente: imagemFrente,
      imagemAtual: cartaVerso, // Inicializa com o verso
    }))
  );

  const [jogoAtivo, setJogoAtivo] = useState(false);
  const [escolhas, setEscolhas] = useState({ jogador1: null, jogador2: null });
  const [mensagem, setMensagem] = useState("Escolha sua carta!");
  const [mostrarMenu, setMostrarMenu] = useState(false);

  // Animação para o menu de resultados
  const menuAnimacao = useSpring({
    opacity: mostrarMenu ? 1 : 0,
    transform: mostrarMenu ? 'translate(-50%, -50%)' : 'translate(-50%, -70%)',
    config: { tension: 250, friction: 25 },
  });

  const embaralharCartas = () => {
    const embaralhado = [...cartas].sort(() => Math.random() - 0.5);
    setCartas(
      embaralhado.map((carta) => ({
        ...carta,
        imagemAtual: cartaVerso, // Carta começa com o verso
      }))
    );
    setEscolhas({ jogador1: null, jogador2: null }); // Limpar as escolhas anteriores
    setMensagem("Escolha sua carta!");
    setMostrarMenu(false); // Esconde o menu quando o jogo for reiniciado
    setJogoAtivo(true);
  };

  const virarCarta = (index, jogador) => {
    if (!jogoAtivo) return;

    setCartas((prevCartas) =>
      prevCartas.map((carta, i) =>
        i === index
          ? {
              ...carta,
              imagemAtual: carta.imagemFrente,  // Muda a imagem para a carta da frente
            }
          : carta
      )
    );

    // Marca a carta como "virada" apenas visualmente
    if (jogador === "jogador1" && !escolhas.jogador1) {
      setEscolhas((prevEscolhas) => ({
        ...prevEscolhas,
        jogador1: cartas[index].imagemFrente,
      }));
      setMensagem("Agora é a vez do Jogador 2");
      setTimeout(() => setMensagem("Escolha sua carta!"), 2000);
    } else if (jogador === "jogador2" && !escolhas.jogador2) {
      setEscolhas((prevEscolhas) => ({
        ...prevEscolhas,
        jogador2: cartas[index].imagemFrente,
      }));
      setMensagem(""); // Remove a mensagem de vez do jogador 2
    }
  };

  // Usar useEffect para mostrar o menu após as escolhas
  useEffect(() => {
    if (escolhas.jogador1 && escolhas.jogador2) {
      setMostrarMenu(true); // Exibe o menu com as escolhas
    }
  }, [escolhas]);

  const reiniciarJogo = () => {
    setCartas(
      cartasFrente.map((imagemFrente, index) => ({
        id: index,
        imagemFrente: imagemFrente,
        imagemAtual: cartaVerso,  // Cartas começam com o verso
      }))
    );
    setEscolhas({ jogador1: null, jogador2: null });
    setMensagem("Escolha sua carta!");
    setMostrarMenu(false); // Esconde o menu após reiniciar
    setJogoAtivo(false);
  };

  return (
    <div className="container-cartas">
      <h2>Jogo das Cartas - 2 Jogadores</h2>
      <p>{mensagem}</p>

      <button
        className="botao-embaralhar"
        onClick={embaralharCartas}
        disabled={jogoAtivo}
      >
        {jogoAtivo ? "Jogo em Andamento..." : "Embaralhar e Jogar"}
      </button>

      <div className="deck">
        {cartas.map((carta, index) => (
          <div
            key={carta.id}
            className={`carta-container ${carta.imagemAtual === carta.imagemFrente ? "virada" : ""}`}
            onClick={() =>
              (escolhas.jogador1 === null
                ? virarCarta(index, "jogador1")
                : escolhas.jogador2 === null
                ? virarCarta(index, "jogador2")
                : null)
            }
          >
            <img src={carta.imagemAtual} alt={`Carta ${index}`} />
          </div>
        ))}
      </div>

      {/* Menu de Resultados com Animação */}
      {mostrarMenu && (
        <animated.div className="menu-escolhas" style={menuAnimacao}>
          <div className="escolhas">
            <div>
              <strong>Jogador 1:</strong>
              <img
                src={escolhas.jogador1}
                alt="Carta Jogador 1"
                className="carta-escolhida"
              />
            </div>
            <div>
              <strong>Jogador 2:</strong>
              <img
                src={escolhas.jogador2}
                alt="Carta Jogador 2"
                className="carta-escolhida"
              />
            </div>
          </div>
          <button onClick={reiniciarJogo} className="botao-reiniciar">
            Jogue Novamente
          </button>
        </animated.div>
      )}
    </div>
  );
};

export default Cartas;
