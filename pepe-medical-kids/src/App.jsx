import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BarraDiNavigazione from "./components/BarraDiNavigazione";
import Home from "./components/Home";
import CHiSiamo from "./components/ChiSiamo";
import LoginStaff from "./components/LoginStaffAdmin.jsx";
import DashboardMedico from "./components/dashboards/DashboardMedico.jsx";
import PrivateRoute from "./components/PrivateRoute";
import LoginPaziente from "./components/LoginPaziente";
import DashboardAdmin from "./components/dashboards/DashboardAdmin.jsx";
import DashboardReception from "./components/dashboards/DashboardReception.jsx";
import DashboardPaziente from "./components/dashboards/DashboardPaziente.jsx";
import NotFound from "./components/NotFound.jsx";
import { AuthProvider } from "./components/AuthContext";
import CreaEventoGenerico from "./components/calendario/CreaEventoGenerico.jsx";
import EventDetails from "./components/calendario/EventDetails";

function App() {
  return (
    <AuthProvider>
      <BarraDiNavigazione />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chi-siamo" element={<CHiSiamo />} />

        <Route path="/login-paziente" element={<LoginPaziente />} />
        <Route path="/login-staff" element={<LoginStaff />} />

        <Route
          path="/dashboard-medico"
          element={
            <PrivateRoute role="MEDICO">
              <DashboardMedico />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
