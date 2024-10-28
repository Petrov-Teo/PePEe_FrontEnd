import { useState, useEffect } from "react";
import { useAuth } from "../config/AuthContext";

const useDailyEvents = () => {
  const [dailyEvents, setDailyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useAuth();

  const fetchEvents = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("Token non disponibile. Effettua di nuovo il login.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/genericEvents`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const today = new Date().toISOString().split("T")[0];

        const filteredEvents = data.content.filter((event) => {
          const eventDate = new Date(event.dataInizio).toISOString().split("T")[0];
          return eventDate === today; // Filtra solo gli eventi di oggi
        });

        const mappedEvents = filteredEvents.map((event) => ({
          id: event.idEvento,
          title: event.nome,
          start: new Date(`${event.dataInizio}T${event.oraInizio}`),
          end: new Date(`${event.dataInizio}T${event.oraFine}`),
        }));

        setDailyEvents(mappedEvents);
      } else {
        setError("Errore nel recupero degli eventi. Codice di stato: " + response.status);
      }
    } catch (error) {
      setError("Errore nella richiesta: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { dailyEvents, loading, error };
};

export default useDailyEvents;
