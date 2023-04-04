import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesGallery } from './API/api';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import Modal from './Modal/Modal';
import { Container } from './App.styled';

export function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImages, setModalImages] = useState('');

  const handleSearchBarSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!imageName || !page) {
      return;
    }
    const renderGallery = async () => {
      setLoading(true);

      try {
        const { hits, totalHits } = await fetchImagesGallery(imageName, page);

        if (hits.length === 0) {
          toast.error('Something went wrong. Please try again!');
        }
        setImages(images => [...images, ...hits]);
        setTotalImages(totalHits);
      } catch (error) {
        setError(error);
        toast.error(
          'Sorry, there are no images matching your request. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };
    renderGallery();
  }, [imageName, page]);

  const handleIncrementPage = () => {
    setPage(prevState => prevState.page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const imageClick = imageUrl => {
    setModalImages(imageUrl);
    setShowModal(true);
  };

  const maxPage = Math.ceil(totalImages / 12);
  const showButton = images.length >= 12 && page < maxPage;
  return (
    <Container>
      <Searchbar onSubmit={handleSearchBarSubmit} />
      {showModal && <Modal image={modalImages} onClose={toggleModal} />}

      {images.length && <ImageGallery items={images} onClick={imageClick} />}
      <ToastContainer autoClose={3000} />
      {loading && <Loader />}
      {showButton && <LoadMoreBtn onClick={handleIncrementPage} />}
    </Container>
  );
}
