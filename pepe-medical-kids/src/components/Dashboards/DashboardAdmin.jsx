import React from "react";
import { Button, Row, Card, Accordion } from "react-bootstrap"; // Import Accordion
import { Link, useNavigate } from "react-router-dom";
import EventList from "../calendario/EventList";
import doctorIcon from "/src/assets/dashboard/doctor-male-svgrepo-com.svg";
import "/src/components/dashboards/dashboarrdsCss/DashboardCss.css";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/crea-evento");
  };

  return (
    <div>
      <h2 className="fs-1">Dashboard Admin</h2>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Gestione Utenti</Accordion.Header>
          <Accordion.Body>
            <div className="d-flex flex-wrap">
              {" "}
              {/* Use flex-wrap for better layout */}
              <Row className="mb-4 mx-2">
                {" "}
                {/* Add mx-2 for horizontal spacing */}
                <Card className="text-center card-auto-width">
                  <Card.Body className="card-small-padding">
                    <Link to="/medicoManagement" className="d-flex flex-column align-items-center">
                      <img src={doctorIcon} alt="Gestione Medici" width={100} height={100} className="mb-2" />
                      <span className="fs-5 fw-bolder">Gestione Medici</span>
                    </Link>
                  </Card.Body>
                </Card>
              </Row>
              <Row className="mb-4 mx-2">
                {" "}
                {/* Add mx-2 for horizontal spacing */}
                <Card className="text-center card-auto-width">
                  <Card.Body className="card-small-padding">
                    <Link to="/medicoManagement" className="d-flex flex-column align-items-center">
                      <img src={doctorIcon} alt="Gestione Pazienti" width={100} height={100} className="mb-2" />
                      <span className="fs-5 fw-bolder">Gestione Pazienti</span>
                    </Link>
                  </Card.Body>
                </Card>
              </Row>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <EventList />

      <Button variant="primary" onClick={handleNavigate}>
        Crea Evento Generico
      </Button>
    </div>
  );
};

export default DashboardAdmin;
