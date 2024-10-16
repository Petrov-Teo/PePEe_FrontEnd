import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const LoginPaziente = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulazione di login paziente
    if (username === "paziente" && password === "passwordPaziente") {
      localStorage.setItem("auth", JSON.stringify({ role: "paziente" }));
      navigate("/dashboard-paziente"); // Reindirizza alla dashboard paziente
    } else {
      alert("Credenziali non valide per paziente");
    }
  };

  return (
    <Container style={{ paddingTop: "70px" }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Login Paziente</h2>
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

            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPaziente;
