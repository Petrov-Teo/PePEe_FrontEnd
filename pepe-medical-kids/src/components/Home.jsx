import { Button, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={12} className="text-center">
          <h1>Benvenuti in PePe Medical Kids</h1>
          <p className="lead">
            Questa è la homepage della nostra applicazione. Scopri i nostri servizi dedicati alla salute dei più
            piccoli.
          </p>
          <Button variant="primary" href="/servizi" className="mt-3">
            Scopri di più
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
