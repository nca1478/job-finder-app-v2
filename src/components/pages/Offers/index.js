// Dependencies
import { useCallback, useEffect, useState } from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

// Custom Dependencies
import { get } from '../../../config/api';
import { OfferItem } from '../../common/OfferItem';
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder';
import { Paginate } from '../../common/Paginate/Paginate';

export const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const limit = 8;

  const initialFetchOffers = useCallback(async () => {
    await get(`/offers/published?order=DESC&page=1&take=${limit}`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg);
        } else {
          setPageCount(Math.ceil(response.meta.itemCount / limit));
          setOffers(response.data);
        }
      })
      .catch((error) => {
        toast.error('Error al intentar obtener ofertas de trabajo.');
        console.log(error);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    initialFetchOffers().catch(console.error);
  }, [initialFetchOffers]);

  const fetchOffers = async (currentPage) => {
    await get(`/offers/published?order=DESC&page=${currentPage}&take=${limit}`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg);
        } else {
          setOffers(response.data);
        }
      })
      .catch((error) => {
        toast.error('Error al intentar obtener ofertas de trabajo.');
        console.log(error);
      })
      .finally(() => {
        setLoaded(true);
      });
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    await fetchOffers(currentPage);
  };

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <h3 className="text-center text-white">Ofertas de Trabajo</h3>
        <Row className="d-flex justify-content-center g-4 pt-2">
          {!loaded ? (
            <SpinnerBorder size="lg" variant="light" />
          ) : offers.length > 0 ? (
            <>
              {offers.map((offer) => {
                return <OfferItem key={offer.id} {...offer} />;
              })}

              <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
            </>
          ) : (
            <Alert variant="danger" className="w-75">
              Oh no.... No hay ofertas de trabajo para mostrar. Vuelve pronto...
            </Alert>
          )}
        </Row>
      </Container>
      <ToastContainer />
    </Col>
  );
};
