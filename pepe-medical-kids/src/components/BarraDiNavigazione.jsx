import { Col, Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logoPepe from "../assets/logo.png";
import { useAuth } from "./AuthContext";
import React, { useEffect, useState } from "react";

const BarraDiNavigazione = () => {
  const { isAuthenticated, userData, logout } = useAuth();
  const navigate = useNavigate();
  const [showNavbarItems, setShowNavbarItems] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleResize = () => {
    setShowNavbarItems(window.innerWidth >= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Navbar expand="lg" className="">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoPepe}
            style={{ maxWidth: "100%", height: "auto" }}
            width="250"
            height="250"
            className="d-inline-block align-top"
            alt="PePe Medical Kids logo"
          />
          <Col className="text-center">A Cuore La Salute Dei Più Piccoli </Col>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated ? (
              <>
                {showNavbarItems && (
                  <>
                    {userData.ruolo === "ADMIN" && (
                      <>
                        <Nav.Link as={Link} to="/dashboard-admin">
                          Home Admin
                        </Nav.Link>
                        <NavDropdown title="Gestione Utenti" id="gestione-utenti-dropdown">
                          <NavDropdown.Item as={Link} to="/medicoManagement">
                            Medici
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/cartelle-mediche/modifica">
                            Pazienti
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/cartelle-mediche/rimuovi">
                            Receptionist
                          </NavDropdown.Item>
                        </NavDropdown>

                        {/* Dropdown per Cartelle Mediche */}
                        <NavDropdown title="Cartelle Mediche" id="cartelle-mediche-dropdown">
                          <NavDropdown.Item as={Link} to="/cartelle-mediche/visualizza">
                            Visualizza Cartelle Mediche
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/cartelle-mediche/aggiungi">
                            Aggiungi Cartella Medica
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/cartelle-mediche/modifica">
                            Modifica Cartella Medica
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/cartelle-mediche/rimuovi">
                            Rimuovi Cartella Medica
                          </NavDropdown.Item>
                        </NavDropdown>
                      </>
                    )}

                    {userData.ruolo === "MEDICO" && (
                      <>
                        <Nav.Link as={Link} to="/dashboard-medico">
                          Dashboard Medico
                        </Nav.Link>
                      </>
                    )}

                    {userData.ruolo === "RECEPTION" && (
                      <>
                        <Nav.Link as={Link} to="/dashboard-reception">
                          Dashboard Reception
                        </Nav.Link>
                      </>
                    )}

                    {userData.ruolo === "PAZIENTE" && (
                      <>
                        <Nav.Link as={Link} to="/dashboard-paziente">
                          Dashboard Paziente
                        </Nav.Link>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/chi-siamo">
                  Chi Siamo
                </Nav.Link>
                <Nav.Link as={Link} to="/servizi">
                  Servizi
                </Nav.Link>
                <Nav.Link as={Link} to="/contatti">
                  Contatti
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated && userData ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  {`Benvenuto, ${userData.nome || "Profilo"}`}
                </Nav.Link>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login-paziente">
                  Login Paziente
                </Nav.Link>
                <Nav.Link as={Link} to="/login-staff">
                  Login Staff
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraDiNavigazione;
