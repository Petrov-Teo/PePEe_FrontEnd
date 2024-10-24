import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importa le icone

const routes = {
  MEDICO: "/dashboard-medico",
  ADMIN: "/dashboard-admin",
  RECEPTIONIST: "/dashboard-reception",
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { role, idUtente } = useParams();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Recupera il token dal localStorage
  const token = localStorage.getItem("authToken")?.trim();

  useEffect(() => {
    console.log(`Ruolo: ${role}, ID Utente: ${idUtente}`);
  }, [role, idUtente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Tutti i campi sono richiesti.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Le password non corrispondono.");
      return;
    }

    console.log(token); // Stampa il token per il debug

    try {
      const response = await fetch(`http://localhost:3001/${role}/reset-password/${idUtente}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Aggiungi il token qui
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      console.log(`Chiamata a: http://localhost:3001/${role}/reset-password/${idUtente}`);
      console.log("Vecchia password:", oldPassword);
      console.log("Nuova password:", newPassword);

      if (response.ok) {
        alert("Password reset effettuato con successo!");

        // Correggi il ruolo qui
        let userRole = role ? role.toUpperCase() : null;

        // Aggiungi un controllo per "ADMINS" e converti in "ADMIN"
        if (userRole === "ADMINS") {
          userRole = "ADMIN";
        }

        if (userRole === "MEDICI") {
          userRole = "MEDICO";
        }

        if (userRole === "SEGRETARYS") {
          userRole = "RECEPTIONIST";
        }

        const route = routes[userRole];
        console.log(userRole);
        console.log(route);

        if (route) {
          navigate(route);
        } else {
          alert("Ruolo non riconosciuto");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Si è verificato un errore. Riprova più tardi.");
      }
    } catch (error) {
      console.error("Errore durante il reset della password:", error);
      setError("Si è verificato un errore. Riprova più tardi.");
    }
  };

  return (
    <Container className="pt-5">
      <h2 className="text-center mb-4">Reset Password</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formOldPassword">
          <Form.Label>Vecchia Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showOldPassword ? "text" : "password"}
              placeholder="Inserisci la tua vecchia password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <InputGroup.Text onClick={() => setShowOldPassword(!showOldPassword)} style={{ cursor: "pointer" }}>
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formNewPassword" className="mt-3">
          <Form.Label>Nuova Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              placeholder="Inserisci la tua nuova password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <InputGroup.Text onClick={() => setShowNewPassword(!showNewPassword)} style={{ cursor: "pointer" }}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mt-3">
          <Form.Label>Conferma Nuova Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Conferma la tua nuova password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: "pointer" }}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4 w-100">
          Reset Password
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
