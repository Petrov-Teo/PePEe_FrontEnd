import React from "react";
import { Row, Card, Accordion } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import EventList from "../calendario/EventList";
import doctorIcon from "/src/assets/dashboard/doctor-male-svgrepo-com.svg";
import pazienteIcon from "/src/assets/dashboard/paziente.svg";
import deskIcon from "/src/assets/dashboard/desk.svg"; // Importa l'icona
import "/src/components/dashboards/dashboarrdsCss/DashboardCss.css";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/crea-evento");
  };

  return (
    <div>
      <h2 className="fs-1">Dashboard Admin</h2>
      <h4>Gestione Utenti</h4>
      <div className="container">
        <div className="row g-4">
          <div className="col">
            <Card className="text-center card-auto-width border border-2">
              <Card.Body className="card-small-padding">
                <Link to="/medicoManagement" className="d-flex flex-column align-items-center text-decoration-none">
                  <img src={doctorIcon} alt="Gestione Medici" width={100} height={100} className="mb-2" />
                  <span className="fs-5 fw-bolder text-dark">Gestione Medici</span>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className="col">
            <Card className="text-center card-auto-width border border-2">
              <Card.Body className="card-small-padding">
                <Link to="/" className="d-flex flex-column align-items-center text-decoration-none">
                  <img src={pazienteIcon} alt="Gestione Pazienti" width={100} height={100} className="mb-2" />
                  <span className="fs-5 fw-bolder text-dark">Gestione Pazienti</span>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className="col">
            <Card className="text-center card-auto-width border border-2">
              <Card.Body className="card-small-padding">
                <Link to="/" className="d-flex flex-column align-items-center text-decoration-none">
                  <img src={deskIcon} alt="Gestione Pazienti" width={100} height={100} className="mb-2" />
                  <span className="fs-5 fw-bolder text-dark">Gestione Pazienti</span>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <Accordion>
        <Accordion.Item eventKey="0" className="m-5">
          <Accordion.Header>CALENDARIO</Accordion.Header>
          <Accordion.Body>
            <Card className="text-center card-auto-width border border-2">
              <Card.Body className="card-small-padding">
                <div
                  className="d-flex justify-content-center mt-4"
                  onClick={handleNavigate}
                  style={{ cursor: "pointer" }}
                >
                  <img src={deskIcon} alt="Crea Evento" width={40} height={40} /> {/* Utilizza l'icona importata */}
                  <span>Crea Nuovo Evento</span>
                </div>
              </Card.Body>
            </Card>
            <EventList />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default DashboardAdmin;
