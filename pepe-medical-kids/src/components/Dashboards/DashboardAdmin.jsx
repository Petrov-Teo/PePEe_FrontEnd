import React, { useState } from "react";
import { Row, Card, Accordion, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import EventList from "../calendario/EventList";
import doctorIcon from "/src/assets/dashboard/doctor-male-svgrepo-com.svg";
import pazienteIcon from "/src/assets/dashboard/paziente.svg";
import deskIcon from "/src/assets/dashboard/desk.svg";
import creEventoIcona from "/src/assets/dashboard/event-svgrepo-com.svg";
import useDailyEvents from "/src/components/calendario/useDailyEvents.jsx";
import analisiIcon from "/src/assets/dashboard/analisimediche.svg";
import refertomedico from "/src/assets/dashboard/refetomedico.svg";
import certificatoMedico from "/src/assets/dashboard/certificatomedico.svg";
import cartellaMedicaicon from "/src/assets/dashboard/cartelleMedicaDef.svg";
import mastrinoIcon from "/src/assets/dashboard/mastriniClienti.svg";
import fatturaClienteIcon from "/src/assets/dashboard/fatturaClienteDef.svg";
import notaCredito from "/src/assets/dashboard/notaCreditoCliente.svg";
import ContattiRicevuti from "/src/components/comunicazioni/ContattiRicevuti.jsx";

import "/src/components/dashboards/DashboardCss.css";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const { dailyEvents, loading, error } = useDailyEvents();
  const [activeKey, setActiveKey] = useState("0");

  const handleNavigate = () => {
    navigate("/crea-evento");
  };

  const gestioneUtenti = [
    { icon: pazienteIcon, title: "Gestione Pazienti", link: "/pazienteManagement" },
    { icon: doctorIcon, title: "Gestione Medici", link: "/medicoManagement" },
    { icon: deskIcon, title: "Gestione Desk", link: "/deskManagement" },
  ];

  const cartellaMedica = [
    { icon: cartellaMedicaicon, title: "Cartelle Mediche", link: "/" },
    { icon: analisiIcon, title: "Analisi Mediche", link: "/" },
    { icon: refertomedico, title: "Referto Medico", link: "/medicoManagement" },
    { icon: certificatoMedico, title: "Certificato Medico", link: "/" },
  ];

  const fatturatoClienti = [
    { icon: mastrinoIcon, title: "Mastrino Cliente", link: "/" },
    { icon: fatturaClienteIcon, title: "Fattura Cliente", link: "/" },
    { icon: notaCredito, title: "Nota Credito", link: "/medicoManagement" },
  ];

  return (
    <div>
      <h2 className="fs-1 titlePers">Dashboard Admin</h2>
      <Row>
        <ContattiRicevuti />
      </Row>
      <Accordion activeKey={activeKey} onSelect={setActiveKey}>
        <Accordion.Item eventKey="0" className="m-5">
          <Accordion.Header>CALENDARIO</Accordion.Header>
          <Accordion.Body>
            <Container className="d-flex flex-wrap justify-content-center gap-5">
              <Row className="col-lg-4 col-md-6 col-12 mb-4">
                <Card className="text-center card-auto-width border border-2">
                  <Card.Body className="card-small-padding">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      onClick={handleNavigate}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={creEventoIcona} alt="Crea Evento" width={60} height={60} />
                      <span className="ms-2">Crea Nuovo Evento</span>
                    </div>
                  </Card.Body>
                </Card>
              </Row>
              <Row className="col-lg-8 col-md-12 col-12">
                <Card className="">
                  <h3 className="titlePers">
                    Eventi di Oggi <span className="m-0 p-0">{new Date().toLocaleDateString("it-IT")}</span>
                  </h3>
                  {loading && <p>Caricamento eventi...</p>}
                  {error && <p>{error}</p>}
                  {dailyEvents.length === 0 && <p className="fw-3">Nessun evento per oggi.</p>}
                  {dailyEvents.length > 0 && (
                    <ul>
                      {dailyEvents.map((event) => (
                        <li key={event.id}>
                          {event.title}{" "}
                          {new Date(event.start).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}{" "}
                          fino alle{" "}
                          {new Date(event.end).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </Row>
            </Container>
            <EventList />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
      <h4 className="mb-4 text-start ms-3">Fatture Clienti</h4>
      <div className="container">
        <div className="row g-4">
          {fatturatoClienti.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-12" key={index}>
              <Card className="text-center card-auto-width border border-2">
                <Card.Body className="card-small-padding">
                  <Link to={item.link} className="d-flex flex-column align-items-center text-decoration-none">
                    <img src={item.icon} alt={item.title} width={100} height={100} className="mb-2" />
                    <span className="fs-5 fw-bolder text-dark">{item.title}</span>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <h4 className="mb-4 text-start ms-3">Gestione Utenti</h4>
      <div className="container">
        <div className="row g-4">
          {gestioneUtenti.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-12" key={index}>
              <Card className="text-center card-auto-width border border-2">
                <Card.Body className="card-small-padding">
                  <Link to={item.link} className="d-flex flex-column align-items-center text-decoration-none">
                    <img src={item.icon} alt={item.title} width={100} height={100} className="mb-2" />
                    <span className="fs-5 fw-bolder text-dark">{item.title}</span>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <br />
      <h4 className="mb-4 text-start ms-3">Cartelle Mediche</h4>
      <div className="container">
        <div className="row g-4">
          {cartellaMedica.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-12" key={index}>
              <Card className="text-center card-auto-width border border-2">
                <Card.Body className="card-small-padding">
                  <Link to={item.link} className="d-flex flex-column align-items-center text-decoration-none">
                    <img src={item.icon} alt={item.title} width={100} height={100} className="mb-2" />
                    <span className="fs-5 fw-bolder text-dark">{item.title}</span>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
