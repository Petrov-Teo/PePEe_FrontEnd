import { useState, useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuth } from "../users/AuthContext";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useAuth();
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("Token non disponibile. Effettua di nuovo il login.");
      navigate("/");
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

        const sortedData = data.content.sort((a, b) => new Date(a.dataInizio) - new Date(b.dataInizio));
        const mappedEvents = data.content.map((event) => {
          const startDateTime = new Date(`${event.dataInizio}T${event.oraInizio}`);
          const endDateTime = new Date(`${event.dataInizio}T${event.oraFine}`);
          console.log(data);
          return {
            id: event.idEvento,
            title: event.nome,
            start: startDateTime,
            end: endDateTime,
          };
        });

        setEvents(mappedEvents);
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

  const handleEventClick = (event) => {
    navigate(`/genericEvents/${event.id}`);
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchEvents();
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2>Calendario Eventi</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />
    </div>
  );
};

export default EventCalendar;
