import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Alert, Spinner, Col, Row } from "react-bootstrap";
import "/src/components/users/UsersCss.css";

const MedicoManagement = () => {
  const [medici, setMedici] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    codiceFiscale: "",
    dataDiNascita: "",
    luogoDiNascita: "",
    email: "",
    numeroDiTelefono: "",
    specializzazione: "",
    iscrizioneAlboN: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const fetchMedici = async () => {
    const token = getToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/medici`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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
      setSelectedMedico(medico.idUtente);
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

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
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
        setShowConfirmModal(true);
        setTimeout(handleCloseConfirmModal, 2000);
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
        setShowConfirmModal(true);
        setTimeout(handleCloseConfirmModal, 2000);
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
      <Button className="btn-custom" onClick={() => handleShowModal()}>
        Aggiungi Medico
      </Button>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Codice Fiscale</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Email</th>
            <th>specializzazione</th>
            <th>Elimina</th>
            <th>Modifica</th>
          </tr>
        </thead>
        <tbody>
          {medici.map((medico) => (
            <tr key={medico.idUtente}>
              <td>{medico.codiceFiscale}</td>
              <td>{medico.nome}</td>
              <td>{medico.cognome}</td>
              <td>{medico.email}</td>
              <td>{medico.specializzazione}</td>
              <td>
                <Button className="m-0 " variant="warning" onClick={() => handleShowModal(medico)}>
                  Modifica
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(medico.idUtente)}>
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
        <Modal.Body className="formGroup">
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={6}>
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
              </Col>
              <Col xs={12} md={6}>
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
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
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
              </Col>
              <Col xs={12} md={6}>
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
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
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
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formNumeroDiTelefono">
                  <Form.Label>Numero di Telefono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="numeroDiTelefono"
                    value={formData.numeroDiTelefono}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
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
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
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
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formIscrizioneAlboN">
                  <Form.Label>Iscrizione Albo N°</Form.Label>
                  <Form.Control
                    type="text"
                    name="iscrizioneAlboN"
                    value={formData.iscrizioneAlboN}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="btn-custom mt-2" type="submit" disabled={isSubmitting}>
              {isEditMode ? "Aggiorna Medico" : "Aggiungi Medico"}
              {isSubmitting && <Spinner animation="border" size="sm" className="ms-2" />}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Operazione Completata</Modal.Title>
        </Modal.Header>
        <Modal.Body>Operazione completata con successo!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MedicoManagement;