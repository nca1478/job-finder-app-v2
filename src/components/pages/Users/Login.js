// Dependencies
import { useCallback, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import queryString from 'query-string';

// Custom Dependencies
import { post } from '../../../config/api';
import { AuthContext } from '../../../auth/authContext';
import { types } from '../../../types/types';
import { InputGroupForm } from './components/InputGroupForm';
import { redirectPageOffers } from '../../../helpers/utils';
import { decode } from '../../../helpers/jwt';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(AuthContext);
  const { token = '' } = queryString.parse(location.search);
  const baseUrl = process.env.REACT_APP_API_URL;

  const loginSocialMedia = useCallback(async () => {
    try {
      const decodedInfo = await decode(token);
      const dataUser = { ...decodedInfo, token };

      dispatch({
        type: types.login,
        payload: { data: dataUser },
      });

      redirectPageOffers(dataUser, navigate);
    } catch (error) {
      console.log(error);
      toast.error('Error al intentar iniciar sesión en Google.');
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (token) loginSocialMedia().catch(console.error);
  }, [token, loginSocialMedia]);

  const onSubmit = (data) => {
    post('/auth/login', data)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg);
        } else {
          const dataUser = {
            ...response.data.user,
            token: response.data.token,
          };
          dispatch({
            type: types.login,
            payload: { data: dataUser },
          });
          redirectPageOffers(dataUser, navigate);
        }
      })
      .catch((error) => {
        toast.error('Error al intentar iniciar sesión.');
        console.log(error);
      });
  };

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <Row className="text-center">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="text-dark py-3">
              <Card.Body className="text-center animate__animated animate__fadeIn">
                <h1 className="mb-3">
                  <i className="bi bi-person-circle"></i>
                </h1>
                <h3 className="card-title mb-3">Login</h3>

                <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                  {/* Username */}
                  <InputGroupForm
                    type="text"
                    register={register}
                    errors={errors.email}
                    icon="bi bi-person-circle"
                    label="Email"
                    name="email"
                    validationRules={{ required: 'Email es requerido' }}
                  />

                  {/* Password */}
                  <InputGroupForm
                    type="password"
                    register={register}
                    errors={errors.password}
                    icon="bi bi-key"
                    label="Contraseña"
                    name="password"
                    validationRules={{ required: 'Contraseña es requerida' }}
                  />

                  {/* Login Buttons */}
                  <Button type="submit" variant="dark" className="w-100">
                    Login
                  </Button>

                  <h5 className="card-title my-3">O</h5>

                  {/* Social Media Authentication Buttons */}
                  <Button
                    href={baseUrl + '/auth/google'}
                    type="submit"
                    variant="danger"
                    className="w-100 mb-2"
                  >
                    <i className="bi bi-google"></i> Login con Google
                  </Button>

                  <Button
                    href={baseUrl + '/auth/facebook'}
                    type="submit"
                    variant="primary"
                    className="w-100 mb-3"
                  >
                    <i className="bi bi-facebook"></i> Login con Facebook
                  </Button>

                  <span className="card-title">
                    ¿Necesitas una cuenta?{' '}
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      Registrar
                    </Link>
                  </span>
                  <br />
                  <span className="card-title">
                    ¿Olvidaste tu contraseña?{' '}
                    <Link
                      to="/recover-password"
                      style={{ textDecoration: 'none' }}
                    >
                      Recuperar
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
