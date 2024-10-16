import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const LoginStaff = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Stato per il ruolo selezionato
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulazione di login staff
    if (username && password && role) {
      switch (role) {
        case "medico":
          localStorage.setItem("auth", JSON.stringify({ role: "medico" }));
          navigate("/dashboard-medico");
          break;
        case "amministratore":
          localStorage.setItem("auth", JSON.stringify({ role: "amministratore" }));
          navigate("/dashboard-admin");
          break;
        case "receptionist":
          localStorage.setItem("auth", JSON.stringify({ role: "receptionist" }));
          navigate("/dashboard-reception");
          break;
        default:
          alert("Seleziona un ruolo valido");
      }
    } else {
      alert("Inserisci tutti i campi richiesti");
    }
  };

  return (
    <Container style={{ paddingTop: "70px" }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Login Staff</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la tua password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRole">
              <Form.Label>Ruolo</Form.Label>
              <Form.Select
                aria-label="Seleziona il ruolo"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Seleziona il ruolo</option>
                <option value="medico">Medico</option>
                <option value="amministratore">Amministratore</option>
                <option value="receptionist">Receptionist</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginStaff;
