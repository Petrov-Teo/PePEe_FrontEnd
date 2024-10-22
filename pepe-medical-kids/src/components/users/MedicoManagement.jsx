import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";

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

  const fetchMedici = async () => {
    try {
      const response = await axios.get("/medici"); // Modifica l'URL se necessario
      setMedici(response.data.content); // Supponendo che i dati siano nella proprietà 'content'
    } catch (error) {
      console.error("Errore nel recupero dei medici:", error);
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      try {
        await axios.put(`/medici/${selectedMedico}`, formData);
        fetchMedici(); // Ricarica la lista dei medici
      } catch (error) {
        console.error("Errore nell'aggiornamento del medico:", error);
      }
    } else {
      try {
        await axios.post("/medici/register/medici", formData);
        fetchMedici(); // Ricarica la lista dei medici
      } catch (error) {
        console.error("Errore nel salvataggio del medico:", error);
      }
    }
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/medici/${id}`);
      fetchMedici(); // Ricarica la lista dei medici
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
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCodiceFiscale">
              <Form.Label>Codice Fiscale</Form.Label>
              <Form.Control
                type="text"
                name="codiceFiscale"
                value={formData.codiceFiscale}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formCognome">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" name="cognome" value={formData.cognome} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formDataDiNascita">
              <Form.Label>Data di Nascita</Form.Label>
              <Form.Control
                type="date"
                name="dataDiNascita"
                value={formData.dataDiNascita}
                onChange={handleInputChange}
                required
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
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formNumeroDiTelefono">
              <Form.Label>Numero di Telefono</Form.Label>
              <Form.Control
                type="text"
                name="numeroDiTelefono"
                value={formData.numeroDiTelefono}
                onChange={handleInputChange}
                required
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
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {isEditMode ? "Aggiorna" : "Aggiungi"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MedicoManagement;
