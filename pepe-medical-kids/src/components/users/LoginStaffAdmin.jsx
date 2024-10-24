import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importa le icone
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
      const roleLoginEndpoints = {
        ADMIN: "admins",
        MEDICO: "medici",
        RECEPTIONIST: "segretarys",
      };

      let token, ruolo, userData;

      for (const [role, endpoint] of Object.entries(roleLoginEndpoints)) {
        const response = await fetch(`http://localhost:3001/auth/login/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const result = await response.json();
          token = result.token;
          ruolo = role;

          const userResponse = await fetch(`http://localhost:3001/${endpoint}/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (userResponse.ok) {
            userData = await userResponse.json();
            break;
          }
        }
      }

      if (!token || !userData) {
        return alert("Credenziali errate o ruolo non riconosciuto. Riprova.");
      }

      console.log("Token ricevuto:", token);
      console.log("Ruolo identificato:", ruolo);
      console.log("Dati dell'utente:", JSON.stringify(userData, null, 2));
      console.log(roleLoginEndpoints);

      login(token, userData);

      if (userData.passwordTemporanea) {
        const resetPasswordRoute = `/${roleLoginEndpoints[ruolo]}/reset-password/${userData.idUtente}`;
        navigate(resetPasswordRoute);
        console.log(resetPasswordRoute);
      } else {
        const routes = {
          MEDICO: "/dashboard-medico",
          ADMIN: "/dashboard-admin",
          RECEPTIONIST: "/dashboard-reception",
        };

        const route = routes[ruolo];
        if (route) {
          navigate(route);
        } else {
          alert("Ruolo non riconosciuto");
        }
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      alert("Si è verificato un errore. Riprova più tardi.");
    }
  };

  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col md={6}>
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
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Inserisci la tua password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
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
