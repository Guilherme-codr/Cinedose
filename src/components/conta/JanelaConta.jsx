import { useCallback, useState } from "react";
import { useSessao } from "../../hooks/useSessao";
import Aviso from "../ui/Aviso";
import Modal from "../ui/Modal";
import FormularioConta from "./FormularioConta";
import FormularioLogin from "./FormularioLogin";

export default function JanelaConta({ aberta, aoFechar }) {
  const { ativo, usuario } = useSessao();
  const [aviso, setAviso] = useState("");
  const esconderAviso = useCallback(() => setAviso(""), []);

  function aoSalvar() {
    aoFechar();
    setAviso("Perfil salvo!");
  }

  return (
    <>
      <Modal aberto={aberta} aoFechar={aoFechar} rotulo="Minha conta">
        {ativo && !usuario ? (
          <FormularioLogin />
        ) : (
          <FormularioConta aoSalvar={aoSalvar} aoFechar={aoFechar} />
        )}
      </Modal>
      {aviso && <Aviso texto={aviso} aoSumir={esconderAviso} />}
    </>
  );
}
