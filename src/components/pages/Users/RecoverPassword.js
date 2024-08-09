// Dependencies
import { Col, Row, Form, Container, Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Custom Dependencies
import { InputGroupForm } from './components/InputGroupForm';
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank';
import { put } from '../../../config/api';
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder';

export const RecoverPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    put('/users/change-password', data)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg);
        } else {
          toast.info('Email enviado exitosamente.');
          reset();
        }
      })
      .catch((error) => {
        toast.error('Error al intentar enviar email.');
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Col className="bg-primary">
      <Container className="bg-primary p-4">
        <Row className="text-center my-5">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="text-dark py-3">
              <Card.Body className="text-center animate__animated animate__fadeIn">
                <h1 className="mb-3">
                  <i className="bi bi-card-text"></i>
                </h1>
                <h3 className="card-title mb-3">Recuperar Contraseña</h3>

                <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                  {loading ? (
                    <>
                      <SpinnerBorder />
                      <SpaceBlank height="11.2vh" />
                    </>
                  ) : (
                    <>
                      {/* Email */}
                      <InputGroupForm
                        type="email"
                        register={register}
                        errors={errors.email}
                        icon="bi bi-person-circle"
                        label="Email"
                        name="email"
                        validationRules={{ required: 'Email es requerido' }}
                      />

                      <Button
                        type="submit"
                        variant="dark"
                        className="w-100 my-2"
                      >
                        Enviar Email
                      </Button>
                    </>
                  )}

                  <span className="card-title">
                    ¿Necesitas una cuenta?{' '}
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      Registrar
                    </Link>
                  </span>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Col>
  );
};
