// Dependencies
import { useCallback, useContext, useEffect, useState } from 'react';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

// Custom Dependencies
import { get, post, patch, del } from '../../../config/api';
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank';
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder';
import { SectorModal } from './components/SectorModal';
import { Paginate } from '../../common/Paginate/Paginate';
import { TableSectors } from './components/TableSectors';
import { AuthContext } from '../../../auth/authContext';
import { extractIdFromObject } from '../../../helpers/utils';

export const SectorsPage = () => {
  const { user } = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [sector, setSector] = useState(null);
  const [showSectorModal, setShowSectorModal] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const initialFetchSectors = useCallback(async () => {
    await get(`/sectors?order=ASC&page=1&take=${limit}`)
      .then((response) => {
        setPageCount(Math.ceil(response.meta.itemCount / limit));
        setSectors(response.data);
      })
      .catch((error) => {
        toast.error('Error al intentar obtener sectores.');
        console.log(error);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  const fetchSectors = async (page) => {
    await get(`/sectors?order=ASC&page=${page}&take=${limit}`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg);
        } else {
          setPageCount(Math.ceil(response.meta.itemCount / limit));
          setSectors(response.data);
        }
      })
      .catch((error) => {
        toast.error('Error al intentar obtener sectores.');
        console.log(error);
      })
      .finally(() => {
        setLoaded(true);
      });
  };

  useEffect(() => {
    initialFetchSectors().catch(console.error);
  }, [initialFetchSectors]);

  const fetchSector = async (sectorId) => {
    await get(`/sectors/${sectorId}`)
      .then((response) => {
        setSector(response.data);
      })
      .catch((error) => {
        toast.error('Error al intentar obtener el sector.');
        console.log(error);
      })
      .finally(() => {
        setShowSectorModal(true);
      });
  };

  const handleAdd = (data) => {
    const body = extractIdFromObject(data);

    post('/sectors', body, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg);
        } else {
          toast.info('Sector agregado exitosamente.');
        }
      })
      .catch((error) => {
        toast.error('Error al intentar añadir sector.');
        console.log(error);
      })
      .finally(() => {
        fetchSectors(currentPage);
        setShowSectorModal(false);
        setSector({});
      });
  };

  const handleUpdate = (data) => {
    const body = extractIdFromObject(data);

    patch(`/sectors/${data.id}`, body, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg);
        } else {
          toast.info('Sector actualizado exitosamente.');
        }
      })
      .catch((error) => {
        toast.error('Error al intentar actualizar el sector.');
        console.log(error);
      })
      .finally(() => {
        fetchSectors(currentPage);
      });
  };

  const handleDelete = (sectorId) => {
    const confirm = window.confirm('¿Estás Seguro?');
    if (confirm) {
      del(`/sectors/${sectorId}`, user.data.token)
        .then((response) => {
          if (response.data === null) {
            toast.error(response.errors.msg);
          } else {
            toast.info('Sector eliminado exitosamente.');
          }
        })
        .catch((error) => {
          toast.error('Error al intentar eliminar el sector.');
          console.log(error);
        })
        .finally(() => {
          fetchSectors(currentPage);
        });
    }
  };

  const onSubmit = async (data) => {
    data.id ? handleUpdate(data) : handleAdd(data);
  };

  const handleEdit = (sectorId) => {
    fetchSector(sectorId);
  };

  const handleShowSectorModal = () => {
    setShowSectorModal(true);
  };

  const handleCloseSectorModal = () => {
    setShowSectorModal(false);
    setSector(null);
  };

  const handlePageClick = async (data) => {
    let page = data.selected + 1;
    await fetchSectors(page);
    setCurrentPage(page);
  };

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <Row className="d-flex justify-content-center pt-2">
          {!loaded ? (
            <>
              <SpinnerBorder size="lg" variant="light" />
              <SpaceBlank height="64vh" />
            </>
          ) : (
            <Col md={{ span: 10 }}>
              <Card className="text-dark">
                <Card.Header
                  as="h5"
                  className="px-4 d-flex justify-content-between"
                >
                  <span>Sectores</span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-end"
                    onClick={handleShowSectorModal}
                  >
                    Agregar Nuevo
                  </Button>
                </Card.Header>
                <Card.Body className="px-4 pt-4 pb-1">
                  <TableSectors
                    sectors={sectors}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />

                  <Paginate
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                  />
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        {/* Modal */}
        <SectorModal
          show={showSectorModal}
          onSubmit={onSubmit}
          handleClose={handleCloseSectorModal}
          sector={sector}
        />

        <ToastContainer />
      </Container>
    </Col>
  );
};
