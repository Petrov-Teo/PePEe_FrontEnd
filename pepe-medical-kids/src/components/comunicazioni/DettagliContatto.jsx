import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Alert, Container, Row } from "react-bootstrap";

const DettagliContatto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [contatto, setContatto] = useState(null);
  const [error, setError] = useState(null);

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
      } else {
        setError("Errore nel recupero dei dettagli del contatto.");
      }
    } catch (error) {
      setError("Errore nella richiesta: " + error.message);
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
        navigate("/contatti"); // Torna alla lista dei contatti dopo l'eliminazione
      } else {
        setError("Errore nell'eliminazione del contatto.");
      }
    } catch (error) {
      setError("Errore nella richiesta di eliminazione: " + error.message);
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

  return (
    <Container>
      <Row>
        <h1>Dettagli Contatto</h1>
      </Row>
      <p>Nome: {contatto.nome}</p>
      <p>Email: {contatto.email}</p>
      <p>Data Inviata: {new Date(contatto.dataInvio).toLocaleDateString()}</p>
      <p>Letto: {contatto.letto ? "Sì" : "No"}</p>
      <p>Note: {contatto.note}</p>
      <button onClick={handleDelete}>Elimina Contatto</button>
    </Container>
  );
};

export default DettagliContatto;
