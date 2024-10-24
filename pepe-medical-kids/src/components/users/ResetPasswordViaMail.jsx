import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";

const ResetPasswordViaMail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Stato per il modale

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
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
        const response = await fetch(`http://localhost:3001/auth/reset-password/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
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
        return alert("Email non trovata o ruolo non riconosciuto. Riprova.");
      }

      // Mostra il modale di successo
      setShowModal(true);

      // Chiudi il modale dopo 3 secondi
      setTimeout(() => {
        setShowModal(false);
        // Reindirizza alla dashboard o alla pagina di login
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
      }, 3000); // 3000 millisecondi = 3 secondi
    } catch (error) {
      console.error("Errore durante il reset della password:", error);
      setError("Si è verificato un errore. Riprova più tardi.");
    }
  };

  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Reimposta la tua Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p className="text-danger mt-3">{error}</p>}

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Invia richiesta
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Modale di successo */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Richiesta inviata</Modal.Title>
        </Modal.Header>
        <Modal.Body>La mail per il reset della password è stata inviata. Verifica la tua casella di posta.</Modal.Body>
      </Modal>
    </Container>
  );
};

export default ResetPasswordViaMail;
