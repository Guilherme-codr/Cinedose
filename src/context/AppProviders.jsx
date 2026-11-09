import DetalhesProvider from "./DetalhesProvider";
import ListaProvider from "./ListaProvider";
import PerfilProvider from "./PerfilProvider";
import SessaoProvider from "./SessaoProvider";

// Junta todos os provedores de estado global do site.
export default function AppProviders({ children }) {
  return (
    <SessaoProvider>
      <PerfilProvider>
        <ListaProvider>
          <DetalhesProvider>{children}</DetalhesProvider>
        </ListaProvider>
      </PerfilProvider>
    </SessaoProvider>
  );
}
