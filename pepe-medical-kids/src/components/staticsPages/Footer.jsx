import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "../staticsPages/StaticsPageCss.css";

const Footer = () => {
  return (
    <footer className="footer mt-5 py-4">
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h5>PePe Medical Kids</h5>
            <p>
              Dedicati alla salute dei bambini e delle famiglie, con servizi specialistici in un ambiente accogliente e
              professionale.
            </p>
            <h5>Indirizzo</h5>
            <p>
              Viale America 41 <br />
              00034 Colleferro RM
            </p>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5>Collegamenti Utili</h5>
            <ul className="list-unstyled footer-links">
              <Nav.Link href="#chi-siamo">Chi Siamo</Nav.Link>
              <Nav.Link href="#i-nostri-servizi">Servizi</Nav.Link>
              <Nav.Link href="#contattaci">Contatti</Nav.Link>
              <Nav.Link href="#dove-siamo">Dove Siamo</Nav.Link>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <h5>Seguici</h5>
            <div className="social-icons">
              <a href="https://www.instagram.com" className="me-3 icon-size">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com" className="me-3 icon-size">
                <FaFacebook />
              </a>
              <a href="https://wa.me/numero-telefono" className="icon-size">
                <FaWhatsapp />
              </a>
            </div>
            <h5 className="mt-3">Contatti</h5>
            <p>Email: info@pepemedicalkids.com</p>
            <p>Telefono: +39 320 6812 491</p>
          </Col>
        </Row>
        <Row className="pt-3 border-top mt-4">
          <Col className="text-center">
            <p className="small">&copy; {new Date().getFullYear()} PePe Medical Kids. Tutti i diritti riservati.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
