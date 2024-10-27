import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

const DettagliContatto = () => {
  const { id } = useParams();
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

  useEffect(() => {
    fetchDettagliContatto();
  }, [id]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!contatto) {
    return <p>Caricamento...</p>;
  }

  return (
    <div>
      <h1>Dettagli Contatto</h1>
      <p>Nome: {contatto.nome}</p>
      <p>Email: {contatto.email}</p>
      <p>Data Inviata: {new Date(contatto.dataInvio).toLocaleDateString()}</p>
      <p>Letto: {contatto.letto ? "Sì" : "No"}</p>
      <p>Note: {contatto.note}</p>
    </div>
  );
};

export default DettagliContatto;
