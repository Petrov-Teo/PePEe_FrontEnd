import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import BarraDiNavigazione from "./components/BarraDiNavigazione";
import Home from "./components/Home";
import CHiSiamo from "./components/ChiSiamo";
import LoginStaff from "./components/LoginStaff";
import DashboardMedico from "./components/Dashboards/DashboardMedico.jsx";
import PrivateRoute from "./components/PrivateRoute";
import LoginPaziente from "./components/LoginPaziente";
import DashboardAdmin from "./components/Dashboards/DashboardAdmin.jsx";
import DashboardReception from "./components/Dashboards/DashboardReception.jsx";
import DashboardPaziente from "./components/Dashboards/DashboardPaziente.jsx";

function App() {
  return (
    <div>
      <BarraDiNavigazione />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chi-siamo" element={<CHiSiamo />} />

        {/* Rotte separate per il login */}
        <Route path="/login-paziente" element={<LoginPaziente />} />
        <Route path="/login-staff" element={<LoginStaff />} />

        {/* Rotte protette per ciascun ruolo */}
        <Route
          path="/dashboard-medico"
          element={
            <PrivateRoute role="medico">
              <DashboardMedico />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard-admin"
          element={
            <PrivateRoute role="amministratore">
              <DashboardAdmin/>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard-reception"
          element={
            <PrivateRoute role="receptionist">
              <DashboardReception/>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard-paziente"
          element={
            <PrivateRoute role="paziente">
              <DashboardPaziente/>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
