import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "/src/components/users/UsersCss.css"


const RegistrazioneUtente = () => {
    const [formData, setFormData] = useState({
        codiceFiscale: "",
        nome: "",
        cognome: "",
        dataDiNascita: "",
        luogoDiNascita: "",
        email: "",
        password: "",
        confermaPassword: "",
        numeroDiTelefono: "",
        pazienti: [],
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
        <Container className="pt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Registrazione Utente</h2>
                    <Form onSubmit={handleSubmit}>
                        {/* Codice Fiscale */}
                        <Form.Group controlId="codiceFiscale">
                            <Form.Label>Codice Fiscale</Form.Label>
                            <Form.Control
                                className="formGroup"
                                type="text"
                                name="codiceFiscale"
                                value={formData.codiceFiscale}
                                onChange={handleChange}
                                isInvalid={!!errors.codiceFiscale}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.codiceFiscale}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Nome, Cognome, Data di Nascita, Luogo di Nascita */}
                        <Form.Group controlId="nome" className="mt-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                className="formGroup"
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="cognome" className="mt-3">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                                className="formGroup"
                                type="text"
                                name="cognome"
                                value={formData.cognome}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="dataDiNascita" className="mt-3">
                            <Form.Label>Data di Nascita</Form.Label>
                            <Form.Control
                                className="formGroup"
                                type="date"
                                name="dataDiNascita"
                                value={formData.dataDiNascita}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="luogoDiNascita" className="mt-3">
                            <Form.Label>Luogo di Nascita</Form.Label>
                            <Form.Control
                                className="formGroup"
                                type="text"
                                name="luogoDiNascita"
                                value={formData.luogoDiNascita}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        {/* Email */}
                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className="formGroup"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Password */}
                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    className="formGroup"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        {/* Conferma Password */}
                        <Form.Group controlId="confermaPassword" className="mt-3">
                            <Form.Label>Conferma Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    className="formGroup"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confermaPassword"
                                    value={formData.confermaPassword}
                                    onChange={handleChange}
                                    isInvalid={!!errors.confermaPassword}
                                    required
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

                        {/* Numero di Telefono */}
                        <Form.Group controlId="numeroDiTelefono" className="mt-3">
                            <Form.Label>Numero di Telefono</Form.Label>
                            <Form.Control
                                className="formGroup"
                                type="text"
                                name="numeroDiTelefono"
                                value={formData.numeroDiTelefono}
                                onChange={handleChange}
                                isInvalid={!!errors.numeroDiTelefono}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.numeroDiTelefono}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Bottone per Tornare Indietro e Registrati */}
                        <Button variant="secondary" onClick={handleBack} className="mt-4 w-100">
                            Torna Indietro
                        </Button>
                        <Button variant="primary" type="submit" className="mt-2 w-100">
                            Registrati
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrazioneUtente;