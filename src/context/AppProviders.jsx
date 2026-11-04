import DetalhesProvider from "./DetalhesProvider";
import ListaProvider from "./ListaProvider";
import PerfilProvider from "./PerfilProvider";

// Junta todos os provedores de estado global do site.
export default function AppProviders({ children }) {
  return (
    <PerfilProvider>
      <ListaProvider>
        <DetalhesProvider>{children}</DetalhesProvider>
      </ListaProvider>
    </PerfilProvider>
  );
}
