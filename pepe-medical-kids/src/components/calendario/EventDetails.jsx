import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Spinner, Alert, Button, Modal, Form } from "react-bootstrap";
import "/src/components/calendario/CalendarioCss.css"

const EventDetails = () => {
  const { idEvento } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOption, setDeleteOption] = useState("single");
  const [editedEvent, setEditedEvent] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem("authToken")?.trim();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/genericEvents/${idEvento}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Errore durante il caricamento dei dettagli dell'evento");
        }

        const data = await response.json();
        setEvent(data);
        setEditedEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (idEvento) {
      fetchEventDetails();
    } else {
      setError("ID evento non valido o mancante.");
      setLoading(false);
    }
  }, [idEvento]);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("authToken")?.trim();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/genericEvents/updateEventiGenerici/${idEvento}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedEvent),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento dell'evento");
      }

      const data = await response.json();
      setEvent(data[0]);
      setShowEditModal(false);
      setShowConfirmationModal(true);
      console.log(data)

      setTimeout(() => {
        setShowConfirmationModal(false);
        navigate(`/genericEvents/${data[0].idEvento}`);
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("authToken")?.trim();
      const deleteUrl = `${import.meta.env.VITE_API_URL}/genericEvents/${idEvento}`;
      const params = new URLSearchParams();

      if (deleteOption === "all") {
        params.append("deleteEntireSeries", "true");
      } else if (deleteOption === "future") {
        params.append("deleteEntireSeries", "true");
      } else {
        params.append("deleteEntireSeries", "false");
      }

      const response = await fetch(`${deleteUrl}?${params.toString()}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante la cancellazione dell'evento");
      }

      setShowDeleteModal(false);
      setShowDeleteConfirmationModal(true);
      setTimeout(() => {
        setShowDeleteConfirmationModal(false);
        navigate("/dashboard-admin");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Caricamento dei dettagli dell'evento...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const handleBack = () => {
    navigate("/dashboard-admin");
  };

  return (
    <Container className="m-5 formGroup col-10">
      <h1>{event.nome}</h1>
      <p>
        <strong>Data Inizio:</strong> {new Date(event.dataInizio).toLocaleDateString()}
      </p>
      <p>
        <strong>Ora Inizio:</strong> {event.oraInizio}
      </p>
      <p>
        <strong>Ora Fine:</strong> {event.oraFine}
      </p>
      <p>
        <strong>Evento Ricorrente:</strong> {event.eventoRicorrente ? "NO" : "SI"}
      </p>
      <p>
        <strong>Tipo Ricorrenza:</strong> {event.tipoRicorrenza}
      </p>
      <p>
        <strong>Data Fine:</strong> {new Date(event.dataFineRicorrenza).toLocaleDateString()}
      </p>
      <p>
        <strong>Note:</strong> {event.note}
      </p>
      <p>
        <strong>Luogo:</strong> {event.luogo}
      </p>
      <p>
        <strong>Partecipanti:</strong> {event.partecipanti}
      </p>
      <Button variant="secondary" className="mx-2 mb-3" onClick={handleBack}>
        Indietro
      </Button>
      <Button className="btn-custom mb-3" onClick={handleEdit}>
        Modifica Evento
      </Button>
      <Button variant="danger" onClick={handleDelete} className="ms-2 mb-3">
        Cancella Evento
      </Button>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body className="formGroup">
          <Form>
            <Form.Group controlId="formNome">
              <Form.Label>Nome Evento</Form.Label>
              <Form.Control
                type="text"
                value={editedEvent.nome || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, nome: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formOraInizio">
              <Form.Label>Ora Inizio</Form.Label>
              <Form.Control
                type="time"
                value={editedEvent.oraInizio || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, oraInizio: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDataFine">
              <Form.Label>Data Fine</Form.Label>
              <Form.Control
                type="date"
                value={editedEvent.dataFine?.substring(0, 10) || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, dataFine: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formLuogo">
              <Form.Label>Luogo</Form.Label>
              <Form.Control
                type="text"
                value={editedEvent.luogo || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, luogo: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedEvent.note || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, note: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Chiudi
          </Button>
          <Button className="btn-custom" onClick={handleSaveChanges}>
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Avvenuta con Successo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Le modifiche all'evento sono state salvate.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Cancellazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Seleziona l'opzione per la cancellazione:</p>
          <Form>
            <Form.Check
              type="radio"
              label="Cancella solo questo evento"
              name="deleteOption"
              value="single"
              checked={deleteOption === "single"}
              onChange={(e) => setDeleteOption(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Cancella tutti gli eventi futuri"
              name="deleteOption"
              value="future"
              checked={deleteOption === "future"}
              onChange={(e) => setDeleteOption(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Cancella l'intera serie di eventi"
              name="deleteOption"
              value="all"
              checked={deleteOption === "all"}
              onChange={(e) => setDeleteOption(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Conferma Cancellazione
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteConfirmationModal} onHide={() => setShowDeleteConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancellazione Avvenuta con Successo</Modal.Title>
        </Modal.Header>
        <Modal.Body>L'evento è stato cancellato con successo.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EventDetails;