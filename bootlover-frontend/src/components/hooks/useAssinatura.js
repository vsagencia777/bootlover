import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useAssinatura(usuarioId) {
    const [assinaturaAtiva, setAssinaturaAtiva] = useState(null);

    useEffect(() => {
        async function verificar() {
            try {
                const response = await axios.get(`http://188.245.104.72:3003/assinaturas/${usuarioId}`);
                if (response.data.status === "ativa") {
                    setAssinaturaAtiva(true);
                } else {
                    setAssinaturaAtiva(false);
                    toast.warning("Sua assinatura está inativa. Por favor, renove para acessar.");
                }
            } catch (error) {
                console.error("Erro ao verificar assinatura:", error);
                setAssinaturaAtiva(false);
                toast.error("Erro ao verificar a assinatura.");
            }
        }

        verificar();
    }, [usuarioId]);

    return assinaturaAtiva;
}
