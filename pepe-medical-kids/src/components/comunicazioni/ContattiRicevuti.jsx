import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, ListGroup, Accordion } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const ContattiRicevuti = () => {
  const navigate = useNavigate();
  const [contattiAll, setContattiAll] = useState([]);
  const [error, setError] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comunicazioni/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setContattiAll(contattiAll.filter((contatto) => contatto.idRichiestaComunicazione !== id));
      } else {
        setError("Errore nell'eliminazione del contatto.");
      }
    } catch (error) {
      setError("Errore nella richiesta di eliminazione: " + error.message);
    }
  };

  useEffect(() => {
    fetchContatti();
  }, []); // Se desideri aggiornare i contatti in base a qualche dipendenza, aggiungila qui

  const handleDetailClick = (id) => {
    navigate(`/contatti/${id}`);
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (contattiAll.length === 0) {
    return <p>Nessun contatto trovato.</p>;
  }

  console.log(contattiAll);

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Contatti Ricevuti</Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            {contattiAll.map((contatto) => (
              <ListGroup.Item key={contatto.id} className="mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <p
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => handleDetailClick(contatto.idRichiestaComunicazione)}
                  >
                    Nome: {contatto.nome}
                  </p>
                  <p>Email: {contatto.email}</p>
                  <p>
                    Data Inviata:{" "}
                    {new Date(contatto.dataInvio).toLocaleString("it-IT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className={contatto.letto ? "text-black" : "font-weight-bold text-danger"}>
                    {contatto.letto ? "Letto" : "Non Letto"}
                  </p>
                  <p>Note: {contatto.note}</p>
                </div>
                <FaTrash
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDelete(contatto.idRichiestaComunicazione)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ContattiRicevuti;
