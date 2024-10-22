import { Col, Container, Row } from "react-bootstrap";

const DashboardMedico = () => {
  return (
    <Container>
      <Row className="p4">
        <h2>Benvenuto nella tua dashboard!</h2>
        <Col>Questa pagina è protetta, accessibile solo agli utenti autenticati.</Col>
      </Row>
    </Container>
  );
};

export default DashboardMedico;
