import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Alert, Button, Container, Row, Card, Modal, Col } from "react-bootstrap";

const DettagliContatto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [contatto, setContatto] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  const token = localStorage.getItem("authToken");

  const fetchDettagliContatto = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comunicazioni/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContatto(data);
        setIsArchived(data.archiviato);
      } else {
        setError("Errore nel recupero dei dettagli del contatto.");
      }
    } catch (error) {
      setError("Errore nella richiesta: " + error.message);
    }
  };

  const handleReManage = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comunicazioni/rimetti-in-gestione/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContatto(data);
        setShowManageModal(false);
      } else {
        setError("Errore nella rimessa in gestione del contatto.");
      }
    } catch (error) {
      setError("Errore nella richiesta di rimessa in gestione: " + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comunicazioni/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        navigate("/contatti");
      } else {
        setError("Errore nell'eliminazione del contatto.");
      }
    } catch (error) {
      setError("Errore nella richiesta di eliminazione: " + error.message);
    }
  };

  const handleManage = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comunicazioni/gestisci/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContatto(data);
        setShowModal(false);
      } else {
        setError("Errore nella gestione del contatto.");
      }
    } catch (error) {
      setError("Errore nella richiesta di gestione: " + error.message);
    }
  };

  const handleArchive = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comunicazioni/archivia/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setIsArchived(true);
        setShowArchiveModal(false);
        fetchDettagliContatto();
      } else {
        setError("Errore nell'archiviazione del contatto.");
      }
    } catch (error) {
      setError("Errore nella richiesta di archiviazione: " + error.message);
    }
  };

  useEffect(() => {
    fetchDettagliContatto();
  }, [id]);

  useEffect(() => {
    if (location.state?.delete) {
      handleDelete();
    }
  }, [location.state]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!contatto) {
    return <p>Caricamento...</p>;
  }

  const handleBack = () => {
    navigate(-1);
  };
  console.log(contatto)
  return (
    <Container className="my-4">
      <Row className="mb-4">
        <h1>Dettagli Contatto</h1>
      </Row>
      <Row className="justify-content-center">
        <Card className="w-100 formGroup" style={{ maxWidth: '600px' }}>
          <Card.Body>
            <Card.Title className="fs-1 p-3">{contatto.nome}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted p-3">{contatto.email}</Card.Subtitle>
            <Card.Text>
              <Col className="mt-2 pb-4 border">
                <p><strong>Data Inviata:</strong> {new Date(contatto.dataInvio).toLocaleString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}</p>
              </Col>
              <Col className="mt-2 pb-4 border">
                <p><strong>Note:</strong> {contatto.note}</p>
              </Col>
              <Col className="mt-2 pb-4 border">
                <p><strong>Letto:</strong> {contatto.letto ? "Sì" : "No"}</p>
                <p><strong>Data Lettura:</strong> {new Date(contatto.dataLettura).toLocaleString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}</p>
              </Col>
              <Col className="mt-2 pb-4 border">
                <p><strong>Gestito:</strong> {contatto.gestito ? "Sì" : "No"}</p>
                {contatto.gestito && (
                  <p><strong>Data gestione:</strong> {new Date(contatto.dataGestione).toLocaleString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}</p>
                )}
              </Col>

              <Col className="mt-2 pb-4 border">
                <p><strong>Archiviato:</strong> {contatto.archivia ? "Sì" : "No"}</p>
                {contatto.archivia && (
                  <p><strong>Data archiviazione:</strong> {new Date(contatto.dataArchiviazione).toLocaleString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}</p>
                )}
              </Col>
            </Card.Text>
            <Button variant="secondary" onClick={handleBack} className="me-2 w-100 mb-2">
              Torna Indietro
            </Button>

            {!contatto.gestito && (
              <Button variant="primary" onClick={() => setShowModal(true)} className="w-100 mb-2">
                Conferma Gestione
              </Button>
            )}

            {!contatto.archivia && (
              <Button variant="warning" onClick={() => setShowArchiveModal(true)} className="w-100 mb-2">
                Archivia Contatto
              </Button>
            )}
            {contatto.archivia && (
              <Button variant="success" onClick={() => setShowManageModal(true)} className="w-100 mb-2">
                Rimetti in Gestione
              </Button>
            )}
            <Button variant="danger" onClick={handleDelete} className="w-100 mb-2">
              Elimina Contatto
            </Button>
          </Card.Body>
        </Card>
      </Row >

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Gestione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler gestire questo contatto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleManage}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showManageModal} onHide={() => setShowManageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rimetti in Gestione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler rimettere in gestione questo contatto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowManageModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleReManage}>
            Rimetti in Gestione
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showArchiveModal} onHide={() => setShowArchiveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Archiviazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler archiviare questo contatto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowArchiveModal(false)}>
            Annulla
          </Button>
          <Button variant="warning" onClick={handleArchive}>
            Archivia
          </Button>
        </Modal.Footer>
      </Modal>
    </Container >
  );
};

export default DettagliContatto;