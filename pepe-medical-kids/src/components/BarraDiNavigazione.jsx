import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const BarraDiNavigazione = () => {
  return (
 
  <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          PePe Medical Kids
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
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
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login-paziente">
              Login Paziente
            </Nav.Link>
            <Nav.Link as={Link} to="/login-staff">
              Login Staff
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
   </Navbar>
  );
};

export default BarraDiNavigazione;
