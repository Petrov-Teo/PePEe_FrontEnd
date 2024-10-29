import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BarraDiNavigazione from "/src/components/config/BarraDiNavigazione.jsx";
import Home from "./components/staticsPages/Home.jsx";
import LoginStaff from "./components/users/LoginStaffAdmin.jsx";
import DashboardMedico from "./components/dashboards/DashboardMedico.jsx";
import PrivateRoute from "/src/components/config/PrivateRoute.jsx";
import LoginPaziente from "./components/users/LoginPaziente.jsx";
import DashboardAdmin from "./components/dashboards/DashboardAdmin.jsx";
import DashboardReception from "./components/dashboards/DashboardReception.jsx";
import DashboardPaziente from "./components/dashboards/DashboardPaziente.jsx";
import NotFound from "./components/staticsPages/NotFound.jsx";
import { AuthProvider } from "./components/config/AuthContext.jsx";
import CreaEventoGenerico from "./components/calendario/CreaEventoGenerico.jsx";
import EventDetails from "./components/calendario/EventDetails";
import MedicoManagement from "./components/users/MedicoManagement.jsx";
import ResetPassword from "./components/users/ResetPassword.jsx";
import ResetPasswordViaMail from "./components/users/ResetPasswordViaMail.jsx";
import DettagliContatto from "/src/components/comunicazioni/DettagliContatto.jsx";
import RegistrazioneUtente from "./components/users/RegistrazioneUtenti.jsx";
import Profile from "./components/users/Profile.jsx";

function App() {
  return (
    <AuthProvider>
      <BarraDiNavigazione />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-paziente" element={<LoginPaziente />} />
        <Route path="/login-staff" element={<LoginStaff />} />
        <Route path="/reset-password-via-mail" element={<ResetPasswordViaMail />} />
        <Route path="/registrazione-utente" element={<RegistrazioneUtente />} />

        <Route
          path="/dashboard-medico"
          element={
            <PrivateRoute role="MEDICO">
              <DashboardMedico />
            </PrivateRoute>
          }
        />
        <Route
          path="/:role/reset-password/:idUtente"
          element={
            <PrivateRoute role="ADMIN, MEDICO, RECEPTIONIST">
              <ResetPassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute role="ADMIN, MEDICO, RECEPTIONIST,GENITORE,PAZIENTE">
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard-admin"
          element={
            <PrivateRoute role="ADMIN">
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/medicoManagement"
          element={
            <PrivateRoute role="ADMIN">
              <MedicoManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard-reception"
          element={
            <PrivateRoute role="RECEPTIONIST">
              <DashboardReception />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard-paziente"
          element={
            <PrivateRoute role="GENITORE">
              <DashboardPaziente />
            </PrivateRoute>
          }
        />
        <Route
          path="/crea-evento"
          element={
            <PrivateRoute role="ADMIN">
              <CreaEventoGenerico />
            </PrivateRoute>
          }
        />
        <Route
          path="/genericEvents/:idEvento"
          element={
            <PrivateRoute role="ADMIN">
              <EventDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/contatti/:id"
          element={
            <PrivateRoute role="ADMIN,RECEPTIONIST">
              <DettagliContatto />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
