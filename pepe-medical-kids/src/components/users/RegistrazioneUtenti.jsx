import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "/src/components/users/UsersCss.css";

const RegistrazioneUtente = () => {
    const [formData, setFormData] = useState({
        nome: "",
        cognome: "",
        codiceFiscale: "",
        dataDiNascita: "",
        luogoDiNascita: "",
        email: "",
        password: "",
        confermaPassword: "",
        numeroDiTelefono: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        const codiceFiscalePattern = /^[A-Z0-9]{16}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telefonoPattern = /^[0-9]{9,15}$/;

        if (!codiceFiscalePattern.test(formData.codiceFiscale)) {
            newErrors.codiceFiscale = "Codice Fiscale non valido. Deve essere di 16 caratteri alfanumerici.";
        }

        if (!emailPattern.test(formData.email)) {
            newErrors.email = "Email non valida.";
        }

        if (!telefonoPattern.test(formData.numeroDiTelefono)) {
            newErrors.numeroDiTelefono = "Numero di Telefono non valido. Deve contenere tra 9 e 15 cifre.";
        }

        if (formData.password !== formData.confermaPassword) {
            newErrors.confermaPassword = "Le password non corrispondono.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
        } else {
            alert("Alcuni campi non rispettano i criteri richiesti.");
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container className="pt-5 formGroup rounded container-custom">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center mb-4">Registrazione Utente</h2>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            {/* Prima riga: Nome e Cognome */}
                            <Col md={6}>
                                <Form.Group controlId="nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        required
                                        tabIndex={1}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="cognome">
                                    <Form.Label>Cognome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cognome"
                                        value={formData.cognome}
                                        onChange={handleChange}
                                        required
                                        tabIndex={2}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="codiceFiscale">
                                    <Form.Label>Codice Fiscale</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="codiceFiscale"
                                        value={formData.codiceFiscale}
                                        onChange={handleChange}
                                        isInvalid={!!errors.codiceFiscale}
                                        required
                                        tabIndex={3}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.codiceFiscale}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="luogoDiNascita">
                                    <Form.Label>Luogo di Nascita</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="luogoDiNascita"
                                        value={formData.luogoDiNascita}
                                        onChange={handleChange}
                                        required
                                        tabIndex={4}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="dataDiNascita">
                                    <Form.Label>Data di Nascita</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dataDiNascita"
                                        value={formData.dataDiNascita}
                                        onChange={handleChange}
                                        required
                                        tabIndex={5}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="numeroDiTelefono">
                                    <Form.Label>Numero di Telefono</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="numeroDiTelefono"
                                        value={formData.numeroDiTelefono}
                                        onChange={handleChange}
                                        isInvalid={!!errors.numeroDiTelefono}
                                        required
                                        tabIndex={6}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.numeroDiTelefono}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="email" className="mt-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                        required
                                        tabIndex={7}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="password" className="mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            tabIndex={8}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={toggleShowPassword}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="confermaPassword" className="mt-3">
                                    <Form.Label>Conferma Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confermaPassword"
                                            value={formData.confermaPassword}
                                            onChange={handleChange}
                                            isInvalid={!!errors.confermaPassword}
                                            required
                                            tabIndex={9}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={toggleShowConfirmPassword}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confermaPassword}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="secondary" onClick={handleBack} className="mt-4 w-100">
                            Torna Indietro
                        </Button>
                        <Button type="submit" className="mt-2 w-100 btn-custom">
                            Registrati
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container >
    );
};

export default RegistrazioneUtente;