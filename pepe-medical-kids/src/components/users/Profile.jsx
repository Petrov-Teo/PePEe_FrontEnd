import { useAuth } from "../config/AuthContext";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns'; // Importa da date-fns
import "/src/components/users/UsersCss.css"

const Profile = () => {
    const { userData, authToken } = useAuth();
    const [editing, setEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState(userData);
    const navigate = useNavigate();

    const roleLoginEndpoints = {
        ADMIN: "admins",
        MEDICO: "medici",
        RECEPTIONIST: "segretarys",
    };

    const handleChangePassword = () => {
        const resetPasswordRoute = `/${roleLoginEndpoints[userData.ruolo]}/reset-password/${userData.idUtente}`;
        navigate(resetPasswordRoute);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateProfile = async () => {
        try {
            const response = await fetch(`/api/profile/${userData.idUtente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                alert("Profilo aggiornato con successo!");
                setEditing(false);
            } else {
                alert("Errore nell'aggiornamento del profilo");
            }
        } catch (error) {
            console.error("Errore di rete:", error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="formGroup">
                        <Card.Header>
                            <Row className="justify-content-center">
                                <Col md={10}>
                                    <h2>Profilo {userData.ruolo}</h2>
                                </Col>
                            </Row>

                        </Card.Header>
                        <Card.Body>
                            {editing ? (
                                <Form onSubmit={updateProfile}>
                                    <Form.Group>
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nome"
                                            value={updatedData.nome}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Cognome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cognome"
                                            value={updatedData.cognome}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={updatedData.email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Numero di Telefono</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="numeroDiTelefono"
                                            value={updatedData.numeroDiTelefono}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Button variant="success" className="mt-3" type="submit">
                                        Salva Modifiche
                                    </Button>
                                </Form>
                            ) : (
                                <>
                                    <p><strong>Nome:</strong> {userData.nome}</p>
                                    <p><strong>Cognome:</strong> {userData.cognome}</p>
                                    <p><strong>Email:</strong> {userData.email}</p>
                                    <p><strong>Codice Fiscale:</strong> {userData.codiceFiscale}</p>
                                    <p><strong>Codice Admin:</strong> {userData.codAdmin}</p>
                                    <p><strong>Data di Nascita:</strong> {format(new Date(userData.dataDiNascita), 'dd/MM/yyyy')}</p>
                                    <p><strong>Luogo di Nascita:</strong> {userData.luogoDiNascita}</p>
                                    <p><strong>Numero di Telefono:</strong> {userData.numeroDiTelefono}</p>
                                    <p><strong>Username:</strong> {userData.username}</p>
                                    <p><strong>Stato Account:</strong> {userData.enabled ? "Attivo" : "Disabilitato"}</p>
                                    <p><strong>Password Temporanea:</strong> {userData.passwordTemporanea ? "Sì" : "No"}</p>
                                </>
                            )}
                        </Card.Body>
                        <Row>
                            <Col className="text start m-3">
                                <Button className="btn-custom" onClick={() => setEditing(!editing)}>
                                    {editing ? "Annulla" : "Modifica Profilo"}
                                </Button>
                                <Button md={6} variant="warning" onClick={handleChangePassword} className="ms-4">
                                    Cambia Password
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default Profile;