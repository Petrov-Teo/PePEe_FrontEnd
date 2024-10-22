import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Assicurati che il percorso sia corretto

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, userData } = useAuth(); // Usa il contesto di autenticazione

  // Controlla se l'utente è autenticato
  if (!isAuthenticated) {
    return <Navigate to="/login-staff" />;
  }

  // Controlla se il ruolo corrisponde
  if (userData.ruolo !== role) {
    return <Navigate to="/" />;
  }

  return children; // Se tutto va bene, restituisce i figli
};

export default PrivateRoute;
