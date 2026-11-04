import { useCallback, useState } from "react";
import Aviso from "../ui/Aviso";
import Modal from "../ui/Modal";
import FormularioConta from "./FormularioConta";

export default function JanelaConta({ aberta, aoFechar }) {
  const [aviso, setAviso] = useState("");
  const esconderAviso = useCallback(() => setAviso(""), []);

  function aoSalvar() {
    aoFechar();
    setAviso("Perfil salvo!");
  }

  return (
    <>
      <Modal aberto={aberta} aoFechar={aoFechar} rotulo="Minha conta">
        <FormularioConta aoSalvar={aoSalvar} aoFechar={aoFechar} />
      </Modal>
      {aviso && <Aviso texto={aviso} aoSumir={esconderAviso} />}
    </>
  );
}
