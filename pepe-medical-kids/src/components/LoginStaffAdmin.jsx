import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "./AuthContext";

const LoginStaff = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("admins"); // Stato per il ruolo
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Inserisci tutti i campi richiesti");
    }

    // Modifica l'URL in base al ruolo selezionato
    const endpoint = role === "admins" ? "admins" : "medici";

    try {
      const response = await fetch(`http://localhost:3001/auth/login/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        console.log("Token ricevuto:", token);

        // Usa un endpoint diverso per ottenere i dettagli dell'utente
        const userResponse = await fetch(`http://localhost:3001/${endpoint}/me`, {
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

            {/* Selettore di Ruolo */}
            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Ruolo</Form.Label>
              <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admins">Admin</option>
                <option value="medici">Medico</option>
              </Form.Control>
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
