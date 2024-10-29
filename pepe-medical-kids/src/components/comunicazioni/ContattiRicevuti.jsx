import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Table, Row, Col, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import nessunContatto from "/src/assets/comunicazioni/presenzaContatti.svg";
import nessunContattoIcon from "/src/assets/comunicazioni/nessunContatto.svg";
import "/src/components/comunicazioni/ComunicazioniCss.css";

const ContattiRicevuti = () => {
  const navigate = useNavigate();
  const [contattiAll, setContattiAll] = useState([]);
  const [error, setError] = useState(null);
  const [mostraDettagli, setMostraDettagli] = useState(false);

  const [filterArchiviato, setFilterArchiviato] = useState("nonArchiviato");

  const token = localStorage.getItem("authToken");

  const fetchContatti = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comunicazioni`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContattiAll(data.content);
      } else {
        setError("Errore nel recupero dei contatti.");
      }
    } catch (error) {
      setError("Errore nella richiesta: " + error.message);
    }
  };

  useEffect(() => {
    fetchContatti();
  }, []);


  const filteredContatti = contattiAll.filter(contatto => {
    const archiviatoMatch = filterArchiviato === 'tutti' ||
      (filterArchiviato === 'archiviato' && contatto.archivia) ||
      (filterArchiviato === 'nonArchiviato' && !contatto.archivia);
    return archiviatoMatch;
  });


  const contattiNonGestiti = contattiAll.filter((contatto) => !contatto.gestito);
  const numeroContattiDaGestire = contattiNonGestiti.length;

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container className="text-center">
      <Row className="align-items-center mb-3 justify-content-center">
        <Col xs="auto">
          <p
            className={`contatto-messaggio ${numeroContattiDaGestire === 0 ? "text-muted" : ""}`}
            onClick={() => setMostraDettagli(!mostraDettagli)}
          >
            <img
              src={numeroContattiDaGestire === 0 ? nessunContattoIcon : nessunContatto}
              alt="Nessun Contatto"
              className="contatto-icon"
            />
            Hai {numeroContattiDaGestire} {numeroContattiDaGestire === 1 ? "contatto" : "contatti"} da gestire.
          </p>
        </Col>
      </Row>

      {mostraDettagli && (
        <>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Filtra per Archiviato</Form.Label>
                <Form.Select value={filterArchiviato} onChange={(e) => setFilterArchiviato(e.target.value)}>
                  <option value="tutti">Tutti</option>
                  <option value="archiviato">Archiviato</option>
                  <option value="nonArchiviato">Non Archiviato</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Table striped bordered hover responsive className="mx-auto">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Data Inviata</th>
                <th>Note</th>
                <th>Stato</th>
                <th>Gestito</th>
                <th>Archiviato</th>
              </tr>
            </thead>
            <tbody>
              {filteredContatti.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-muted">
                    Nessun contatto da mostrare.
                  </td>
                </tr>
              ) : (
                filteredContatti.map((contatto) => (
                  <tr
                    key={contatto.idRichiestaComunicazione}
                    onClick={() => navigate(`/contatti/${contatto.idRichiestaComunicazione}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{contatto.nome}</td>
                    <td>{contatto.email}</td>
                    <td>
                      {new Date(contatto.dataInvio).toLocaleString("it-IT", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                    <td>{contatto.note}</td>
                    <td className={contatto.letto ? "text-black" : "font-weight-bold text-danger"}>
                      {contatto.letto ? "Letto" : "Non Letto"}
                    </td>
                    <td className={contatto.gestito ? "text-black" : "font-weight-bold text-danger"}>
                      {contatto.gestito ? "Gestito" : "Non Gestito"}
                    </td>
                    <td className={contatto.letto ? "text-black" : "font-weight-bold text-danger"}>
                      {contatto.archivia ? "Archiviato" : "Non Archiviato"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default ContattiRicevuti;