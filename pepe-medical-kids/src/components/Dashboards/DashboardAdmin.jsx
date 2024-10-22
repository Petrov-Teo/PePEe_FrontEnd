import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Hook per navigazione
import EventList from "../calendario/EventList";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/crea-evento");
  };

  return (
    <div>
      <h2 className="fs-1">Dashboard Admin</h2>
      <EventList />

      <Button variant="primary" onClick={handleNavigate}>
        Crea Evento Generico
      </Button>
    </div>
  );
};

export default DashboardAdmin;
