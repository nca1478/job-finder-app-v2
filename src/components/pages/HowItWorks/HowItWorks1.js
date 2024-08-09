// Dependencies
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Custom Dependencies
import hiwImage1 from '../../../assets/img/howitworks1.svg';
import hiwImage2 from '../../../assets/img/howitworks2.svg';
import hiwImage3 from '../../../assets/img/howitworks3.svg';
import hiwImage4 from '../../../assets/img/howitworks4.svg';

export const HowItWorksPage1 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      <h2 className="text-center pt-4">Encontrar una Oferta de Trabajo</h2>
      <hr />
      <section className="py-4">
        <Container>
          <Row className="align-items-center justify-content-center py-4">
            <Col md={6} sm={12} className="d-none d-md-block">
              <img src={hiwImage1} className="img-fluid w-75" alt="" />
            </Col>
            <Col md={6} sm={12} className="text-center text-md-start">
              <h2>1. Ubique una oferta de trabajo.</h2>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4 bg-dark text-white">
        <Container>
          <Row className="align-items-center justify-content-center py-4">
            <Col md={6} sm={12} className="text-center text-md-start">
              <h2>2. Lea la información de la oferta de trabajo.</h2>
            </Col>
            <Col md={6} sm={12} className="d-none d-md-block">
              <img src={hiwImage2} className="img-fluid w-75" alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4 bg-primary text-white">
        <Container>
          <Row className="align-items-center justify-content-center py-4">
            <Col md={6} sm={12} className="d-none d-md-block">
              <img src={hiwImage3} className="img-fluid w-75" alt="" />
            </Col>
            <Col md={6} sm={12} className="text-center text-md-start">
              <h2>3. Regístrese o inicie sesión en la aplicación.</h2>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <Row className="align-items-center justify-content-center py-4">
            <Col md={6} sm={12} className="text-center text-md-start">
              <h2>4. Localice la información del usuario y contáctelo.</h2>
            </Col>
            <Col md={6} sm={12} className="d-none d-md-block">
              <img src={hiwImage4} className="img-fluid" alt="" />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};
