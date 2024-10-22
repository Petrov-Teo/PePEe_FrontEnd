import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "./AuthContext";

const LoginStaff = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Inserisci tutti i campi richiesti");
    }

    try {
      const response = await fetch("http://localhost:3001/auth/login/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        console.log("Token ricevuto:", token);
        const userResponse = await fetch("http://localhost:3001/admins/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("Dati dell'utente:", JSON.stringify(userData, null, 2));

          login(token, userData);

          const ruolo = userData.ruolo;
          console.log("Ruolo ricevuto:", ruolo);

          const routes = {
            MEDICO: "/dashboard-medico",
            ADMIN: "/dashboard-admin",
            RECEPTIONIST: "/dashboard-reception",
            GENITORE: "/dashboard-paziente",
          };

          const route = routes[ruolo];
          if (route) {
            navigate(route);
          } else {
            alert("Ruolo non riconosciuto");
          }
        } else {
          alert("Impossibile ottenere i dettagli dell'utente. Riprova.");
        }
      } else {
        alert("Credenziali errate. Riprova.");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      alert("Si è verificato un errore. Riprova più tardi.");
    }
  };

  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <h2 className="text-center mb-4">Login Staff</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formemail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Inserisci la tua password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Check
                type="checkbox"
                label="Mostra password"
                className="mt-2"
                onChange={() => setShowPassword(!showPassword)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginStaff;
