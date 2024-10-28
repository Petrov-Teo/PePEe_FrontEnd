import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Alert, Spinner } from "react-bootstrap";

const MedicoManagement = () => {
  const [medici, setMedici] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    codiceFiscale: "",
    nome: "",
    cognome: "",
    dataDiNascita: "",
    luogoDiNascita: "",
    email: "",
    numeroDiTelefono: "",
    specializzazione: "",
    iscrizioneAlboN: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Funzione per ottenere il token (assumendo che sia nel localStorage)
  const getToken = () => {
    return localStorage.getItem("authToken"); // Cambia questa logica in base a come gestisci il token
  };

  // Funzione per recuperare i medici con token nell'header
  const fetchMedici = async () => {
    const token = getToken(); // Recupera il token
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/medici/register/medici`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Aggiungi il token all'header
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMedici(data.content);
      } else {
        console.error("Errore nel recupero dei medici:", response.statusText);
      }
    } catch (error) {
      console.error("Errore nella comunicazione con il server:", error);
    }
  };

  useEffect(() => {
    fetchMedici();
  }, []);


  const handleShowModal = (medico = null) => {
    if (medico) {
      setIsEditMode(true);
      setFormData(medico);
      setSelectedMedico(medico.id);
    } else {
      setIsEditMode(false);
      setFormData({
        codiceFiscale: "",
        nome: "",
        cognome: "",
        dataDiNascita: "",
        luogoDiNascita: "",
        email: "",
        numeroDiTelefono: "",
        specializzazione: "",
        iscrizioneAlboN: "",
      });
      setSelectedMedico(null);
    }
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMedico(null);
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const addMedico = async () => {
    const token = getToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/medici/register/medici`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchMedici();
        handleCloseModal();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Errore nell'invio dei dati.");
      }
    } catch (error) {
      setErrorMessage("Errore nella comunicazione con il server.");
    }
  };


  const updateMedico = async () => {
    const token = getToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/medici/${selectedMedico}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchMedici();
        handleCloseModal();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Errore nell'aggiornamento dei dati.");
      }
    } catch (error) {
      setErrorMessage("Errore nella comunicazione con il server.");
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (isEditMode) {
      updateMedico();
    } else {
      addMedico();
    }

    setIsSubmitting(false);
  };


  const handleDelete = async (id) => {
    const token = getToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/medici/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchMedici();
      } else {
        console.error("Errore nella cancellazione del medico.");
      }
    } catch (error) {
      console.error("Errore nella cancellazione del medico:", error);
    }
  };

  return (
    <div>
      <h2>Gestione Medici</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>
        Aggiungi Medico
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Codice Fiscale</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Email</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {medici.map((medico) => (
            <tr key={medico.id}>
              <td>{medico.codiceFiscale}</td>
              <td>{medico.nome}</td>
              <td>{medico.cognome}</td>
              <td>{medico.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(medico)}>
                  Modifica
                </Button>
                <Button variant="danger" onClick={() => handleDelete(medico.id)}>
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Modifica Medico" : "Aggiungi Medico"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCodiceFiscale">
              <Form.Label>Codice Fiscale</Form.Label>
              <Form.Control
                type="text"
                name="codiceFiscale"
                value={formData.codiceFiscale}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId="formCognome">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="cognome"
                value={formData.cognome}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId="formDataDiNascita">
              <Form.Label>Data di Nascita</Form.Label>
              <Form.Control
                type="date"
                name="dataDiNascita"
                value={formData.dataDiNascita}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId="formLuogoDiNascita">
              <Form.Label>Luogo di Nascita</Form.Label>
              <Form.Control
                type="text"
                name="luogoDiNascita"
                value={formData.luogoDiNascita}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId="formNumeroDiTelefono">
              <Form.Label>Numero di Telefono</Form.Label>
              <Form.Control
                type="text"
                name="numeroDiTelefono"
                value={formData.numeroDiTelefono}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId="formSpecializzazione">
              <Form.Label>Specializzazione</Form.Label>
              <Form.Control
                type="text"
                name="specializzazione"
                value={formData.specializzazione}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId="formIscrizioneAlboN">
              <Form.Label>Iscrizione Albo</Form.Label>
              <Form.Control
                type="text"
                name="iscrizioneAlboN"
                value={formData.iscrizioneAlboN}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner animation="border" size="sm" /> : isEditMode ? "Aggiorna" : "Aggiungi"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MedicoManagement;
