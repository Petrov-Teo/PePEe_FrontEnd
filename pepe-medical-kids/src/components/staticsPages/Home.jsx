import { Button, Col, Container, Row, Image } from "react-bootstrap";
import "../staticsPages/StaticsPageCss.css";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import MapComponent from "/src/components/config/MapComponent.jsx";

const Home = () => {
  return (
    <Container fluid className="p-5">
      <Row className="justify-content-center mb-5">
        <Col md={10} className="text-center">
          <h1>Benvenuti in PePe Medical Kids</h1>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={4} className="text-center mb-4">
          <Image src="/src/assets/homePage/pediatria.webp" roundedCircle fluid alt="Pediatria" />
          <h3 className="mt-3">Pediatria</h3>
          <p>Visite pediatriche complete per monitorare la crescita e la salute dei bambini.</p>
        </Col>
        <Col xs={12} md={4} className="text-center mb-4">
          <Image src="/src/assets/homePage/package-lock.webp" roundedCircle fluid alt="Logopedia" />
          <h3 className="mt-3">Logopedia</h3>
          <p>Supporto ai bambini con difficoltà di linguaggio e comunicazione.</p>
        </Col>
        <Col xs={12} md={4} className="text-center mb-4">
          <Image src="/src/assets/homePage/psicologia.jpeg" roundedCircle fluid alt="Psicologia Infantile" />
          <h3 className="mt-3">Psicologia Infantile</h3>
          <p>Sostegno psicologico per aiutare i bambini a crescere felici e sicuri.</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5" id="chi-siamo">
        <h2 className="text-center text-md-start px-md-4 border divDescrizioni">Chi Siamo</h2>
        <Col xs={12} md={10}>
          <br />
          <p className="fw-bold fs-5 mb-4">
            Il Nostro Poliambulatorio è un punto di riferimento per la salute dei bambini e il benessere delle donne.
            <br />
            Con un Team di Specialisti dedicati, offriamo servizi mirati che Accompagnano le Famiglie in ogni fase della
            Vita.
          </p>
          <p>
            <strong>Salute Pediatrica</strong> - Offriamo servizi completi per la salute pediatrica, dalla nascita
            all’adolescenza. Il nostro approccio mette il bambino al centro, assicurando visite pediatriche di qualità e
            supporto continuo per la crescita.
          </p>
          <p>
            <strong>Salute della Donna</strong> - Il benessere della donna è al cuore della nostra missione. Forniamo
            cure ginecologiche e sostegno alla fertilità, garantendo attenzione personalizzata e completa per ogni
            paziente.
          </p>
          <p>
            <strong>Centro di Fertilità</strong> - Offriamo un ambiente di ascolto e accompagnamento per le coppie, con
            trattamenti personalizzati e supporto psicologico, per affrontare il percorso verso la genitorialità con
            serenità.
          </p>
          <p>
            Mettiamo al primo posto l'umanità e il rispetto per creare un ambiente accogliente e di supporto. <br />
            Siamo fieri di offrire un servizio qualificato che combina cura, professionalità e rispetto per ogni
            individuo e famiglia.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5" id="i-nostri-servizi">
        <Col xs={12}>
          <h2 className="text-center text-md-start px-md-4 border divDescrizioni">I Nostri Servizi</h2>
          <Row className="mt-4">
            <Col xs={12} md={6} className="mb-4 text-center">
              <Image
                src="src/assets/homePage/visitePediatriche.jpg"
                className="service-image roundedCircle"
                fluid
                roundedCircle
                alt="Visite Pediatriche"
              />
              <Col className="p-3">
                <h3>Visite Pediatriche</h3>
                <p>Controlli regolari per garantire la salute e lo sviluppo del tuo bambino.</p>
              </Col>
            </Col>
            <Col xs={12} md={6} className="mb-4 text-center">
              <Image
                src="src/assets/homePage/vaccinazioni2.jpeg"
                className="service-image roundedCircle"
                fluid
                roundedCircle
                alt="Vaccinazioni"
              />
              <Col className="p-3">
                <h3>Vaccinazioni</h3>
                <p>Programmi di vaccinazione completi per proteggere i bambini da malattie infettive.</p>
              </Col>
            </Col>
            <Col xs={12} md={6} className="mb-4 text-center">
              <Image
                src="src/assets/homePage/logopedia.jpeg"
                className="service-image roundedCircle"
                fluid
                roundedCircle
                alt="Supporto Logopedico"
              />
              <Col className="p-3">
                <h3>Supporto Logopedico</h3>
                <p>Interventi per migliorare le capacità comunicative nei bambini con difficoltà.</p>
              </Col>
            </Col>
            <Col xs={12} md={6} className="mb-4 text-center">
              <Image
                src="src/assets/homePage/psicologiaInfantile.jpeg"
                className="service-image roundedCircle"
                fluid
                roundedCircle
                alt="Psicologia Infantile"
              />
              <Col className="p-3">
                <h3>Psicologia Infantile</h3>
                <p>Consulenze per affrontare problemi emotivi e comportamentali nei bambini.</p>
              </Col>
            </Col>
            <Col xs={12} md={6} className="mb-4 text-center ">
              <Image
                src="src/assets/homePage/visiteGinecologica3.webp"
                className="service-image roundedCircle"
                fluid
                roundedCircle
                alt="Visite Ginecologiche"
              />
              <Col className="p-3">
                <h3>Visite Ginecologiche</h3>
                <p>Controlli e consulenze per la salute delle donne di tutte le età.</p>
              </Col>
            </Col>
            <Col xs={12} md={6} className="mb-4 text-center">
              <Image
                src="src/assets/homePage/fertilita.jpeg"
                className="service-image roundedCircle"
                fluid
                roundedCircle
                alt="Fertilità e Riproduzione Assistita"
              />
              <Col className="p-3">
                <h3>Fertilità e Riproduzione Assistita</h3>
                <p>Percorsi personalizzati per coppie in cerca di supporto nella fertilità.</p>
              </Col>
            </Col>
            <Col xs={12} md={6} className="mb-4 text-center">
              <Image
                src="src/assets/homePage/ortopedia.jpeg"
                className="service-image roundedCircle"
                fluid
                roundedCircle
                alt="Visite Ortopediche"
              />
              <Col className="p-3">
                <h3>Visite Ortopediche</h3>
                <p>Valutazioni ortopediche per problemi muscoloscheletrici nei bambini.</p>
              </Col>
            </Col>
            <Col xs={12} md={6} className="mb-4 text-center">
              <Image
                src="src/assets/homePage/scoliosi2.png"
                className="service-image roundedCircle"
                roundedCircle
                fluid
                alt="Trattamento della Scoliosi"
              />
              <Col className="p-3">
                <h3>Trattamento della Scoliosi</h3>
                <p>Approcci personalizzati per gestire e monitorare la scoliosi nei bambini e negli adolescenti.</p>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5" id="contattaci">
        <Col xs={12} className="text-center">
          <Col xs={12} className="text-center">
            <ContactForm />
            <Row id="dove-siamo">
              <h2>Viale America 41 Colleferro 00037 - RM</h2>
              <MapComponent />
            </Row>
            <Footer />
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
