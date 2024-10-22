import { useState } from "react";
import { FloatingLabel, Form, Button, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const CreaEventoGenerico = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    dataInizio: new Date(),
    oraInizio: new Date(),
    oraFine: new Date(),
    eventoRicorrente: false,
    dataFineRicorrenza: null,
    note: "",
    luogo: "",
    partecipanti: [],
    tipoRicorrenza: "",
  });

  const [errors, setErrors] = useState([]);
  const [serverResponse, setServerResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handlePartecipantiChange = (e, index) => {
    const updatedPartecipanti = [...formData.partecipanti];
    updatedPartecipanti[index] = e.target.value;
    setFormData({
      ...formData,
      partecipanti: updatedPartecipanti,
    });
  };

  const handleAddPartecipante = () => {
    if (formData.partecipanti.some((partecipante) => partecipante === "")) {
      setErrors(["Completa l'email prima di aggiungere un altro partecipante."]);
      return;
    }

    setFormData({
      ...formData,
      partecipanti: [...formData.partecipanti, ""],
    });
  };

  const handleRemovePartecipante = (index) => {
    const updatedPartecipanti = formData.partecipanti.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      partecipanti: updatedPartecipanti,
    });
  };

  const validateEmails = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailErrors = formData.partecipanti.map((email) => {
      if (email && !emailRegex.test(email)) return "Inserisci un indirizzo email valido";
      return null;
    });

    setErrors(emailErrors.filter((error) => error !== null));
    return emailErrors.every((error) => error === null);
  };

  const submitDataToServer = async () => {
    const token = localStorage.getItem("authToken")?.trim();
    const formattedData = {
      ...formData,
      dataInizio: format(formData.dataInizio, "yyyy-MM-dd"),
      oraInizio: format(formData.oraInizio, "HH:mm"),
      oraFine: format(formData.oraFine, "HH:mm"),
      dataFineRicorrenza: formData.dataFineRicorrenza ? format(formData.dataFineRicorrenza, "yyyy-MM-dd") : null,
      partecipanti: formData.partecipanti.filter((email) => email !== ""),
    };
    if (!formattedData.tipoRicorrenza) {
      formattedData.tipoRicorrenza = "NON_RICORRENTE";
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/genericEvents/nuovoEventoGenerico`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Errore durante l'invio dei dati al server");
      }

      const data = await response.json();
      setServerResponse({ status: "success", message: "Evento creato con successo!" });

      // Reset dei campi del modulo
      setFormData({
        nome: "",
        dataInizio: new Date(),
        oraInizio: new Date(),
        oraFine: new Date(),
        eventoRicorrente: false,
        dataFineRicorrenza: null,
        note: "",
        luogo: "",
        partecipanti: [],
        tipoRicorrenza: "",
      });

      setTimeout(() => {
        setServerResponse(null);
      }, 3000);
    } catch (error) {
      setServerResponse({ status: "error", message: "Errore durante la creazione dell'evento" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmails()) {
      submitDataToServer();
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Container>
        <h1 className="mt-3">Crea Nuovo Evento</h1>
      </Container>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Form className="col-4" onSubmit={handleSubmit}>
          {/* Nome Evento */}
          <FloatingLabel controlId="nome" label="Nome Evento" className="mb-3">
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Inserisci nome evento"
              required
            />
          </FloatingLabel>

          <Form.Group className="mb-3">
            <Form.Label className="p-2">Data Inizio</Form.Label>
            <DatePicker
              selected={formData.dataInizio}
              onChange={(date) => handleDateChange(date, "dataInizio")}
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleziona data"
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="p-2">Ora Inizio</Form.Label>
            <DatePicker
              selected={formData.oraInizio}
              onChange={(date) => handleDateChange(date, "oraInizio")}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              placeholderText="Seleziona ora inizio"
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="p-2">Ora Fine</Form.Label>
            <DatePicker
              selected={formData.oraFine}
              onChange={(date) => handleDateChange(date, "oraFine")}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              placeholderText="Seleziona ora fine"
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="eventoRicorrente"
              label="Evento Ricorrente"
              checked={formData.eventoRicorrente}
              onChange={handleInputChange}
            />
          </Form.Group>

          {formData.eventoRicorrente && (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="p-2">Tipo di Ricorrenza</Form.Label>
                <Form.Control
                  as="select"
                  name="tipoRicorrenza"
                  value={formData.tipoRicorrenza}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleziona tipo di ricorrenza</option>
                  <option value="GIORNALIERA">Giornaliero</option>
                  <option value="SETTIMANALE">Settimanale</option>
                  <option value="MENSILE">Mensile</option>
                  <option value="ANNUALE">Annuale</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data Fine Ricorrenza</Form.Label>
                <DatePicker
                  selected={formData.dataFineRicorrenza}
                  onChange={(date) => handleDateChange(date, "dataFineRicorrenza")}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Seleziona data fine ricorrenza"
                  className="form-control"
                />
              </Form.Group>
            </>
          )}

          <FloatingLabel controlId="luogo" label="Luogo" className="mb-3">
            <Form.Control
              type="text"
              name="luogo"
              value={formData.luogo}
              onChange={handleInputChange}
              placeholder="Inserisci luogo"
            />
          </FloatingLabel>

          <FloatingLabel controlId="note" label="Note" className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              placeholder="Inserisci note"
            />
          </FloatingLabel>

          <Form.Group className="mb-3">
            <Form.Label className="p-2">Partecipanti (Email)</Form.Label>
            {formData.partecipanti.map((partecipante, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <FloatingLabel
                  controlId={`partecipante-${index}`}
                  label={`Email Partecipante ${index + 1}`}
                  className="flex-grow-1"
                >
                  <Form.Control
                    type="email"
                    name={`partecipante-${index}`}
                    value={partecipante}
                    onChange={(e) => handlePartecipantiChange(e, index)}
                    placeholder="Inserisci email"
                  />
                </FloatingLabel>
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleRemovePartecipante(index)}
                  disabled={formData.partecipanti.length === 1}
                >
                  Rimuovi
                </Button>
              </div>
            ))}
            <Button variant="primary" className="mt-2" onClick={handleAddPartecipante}>
              Aggiungi Partecipante
            </Button>
          </Form.Group>

          {/* Errori */}
          {errors.length > 0 && (
            <div className="alert alert-danger">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          {/* Risposta del server */}
          {serverResponse && <div className={`alert alert-${serverResponse.status}`}>{serverResponse.message}</div>}

          <Button variant="secondary" onClick={handleBack} className="me-2">
            Indietro
          </Button>
          <Button variant="primary" type="submit">
            Crea Evento
          </Button>
        </Form>
      </Container>
    </>
  );
};
export default CreaEventoGenerico;
