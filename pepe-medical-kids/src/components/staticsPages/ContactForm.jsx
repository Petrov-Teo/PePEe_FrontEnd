import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConsentChange = (e) => {
    setConsent(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consent) {
      alert("Devi autorizzare il trattamento dei dati personali.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comunicazioni/salva`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.name,
          email: formData.email,
          note: formData.message,
        }),
      });

      if (response.ok) {
        setShowModal(true);
        setFormData({ name: "", email: "", message: "" });
        setConsent(false);

        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      } else {
        alert("Errore durante l'invio della richiesta.");
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      alert("Si è verificato un errore. Riprova più tardi.");
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container fluid className="p-5">
      <Row className="justify-content-center">
        <h2 className="text-center border divDescrizioni">Contattaci</h2>
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
          <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mt-3">
              <Form.Label>Messaggio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Scrivi il tuo messaggio"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConsent" className="mt-3">
              <Form.Check
                type="checkbox"
                label="Autorizzo il trattamento dei dati personali come descritto."
                checked={consent}
                onChange={handleConsentChange}
                required
              />
            </Form.Group>

            <p className="mt-3 lh-1">
              Si autorizza il trattamento dei dati personali forniti per le finalità di risposta alle richieste di
              contatto e invio di comunicazioni relative ai servizi offerti. I dati saranno trattati in conformità con
              le normative vigenti sulla protezione dei dati personali. L'utente ha il diritto di accedere, rettificare
              o richiedere la cancellazione dei propri dati in qualsiasi momento.
            </p>

            <Button type="submit" className="btn-custom">
              Invia
            </Button>
          </Form>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Messaggio Inviato!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Grazie per averci contattato! Riceverai una copia del tuo messaggio all'indirizzo email fornito.
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn-custom" onClick={handleCloseModal}>
                Chiudi
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>

        <Col md={6} className="d-flex justify-content-center align-items-center">
          <img
            src="src/assets/homePage/contattaci.jpg"
            className="service-image-contatti rounded img-fluid large-image"
            alt="Contattaci Immagine"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;
