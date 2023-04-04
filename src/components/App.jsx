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
    setImageName({
      imageName,
      page: 1,
      images: [],
    });
  };

  useEffect(() => {
    // if (prevState.imageName !== imageName || prevState.page !== page) {
    if (!imageName || !page) {
      setLoading(true);

      const response = fetchImagesGallery(imageName, page);

      if (response.status !== 200 || response.data.hits.length === 0) {
        setError(toast.error('Something went wrong. Please try again!'));
      }
      setTotalImages(response.data.totalHits);
      setImages(prevState => {
        return {
          images: [...prevState.images, ...response.data.hits],
        };
      }).catch(error => {
        setError(
          toast.error(
            'Sorry, there are no images matching your request. Please try again.'
          )
        );
      });
    }
    setLoading(false);
  });

  // async componentDidUpdate(_, prevState) {
  //   const prevName = prevState.imageName;
  //   const nextName = this.state.imageName;

  //   if (prevName !== nextName || prevState.page !== this.state.page) {
  //     this.setState({ loading: true });
  //     try {
  //       const response = await fetchImagesGallery(nextName, this.state.page);

  //       if (response.status !== 200 || response.data.hits.length === 0) {
  //         return toast.error('Something went wrong. Please try again!');
  //       }
  //       this.setState({
  //         totalImages: response.data.totalHits,
  //       });
  //       this.setState(prevState => {
  //         return {
  //           images: [...prevState.images, ...response.data.hits],
  //         };
  //       });
  //     } catch (error) {
  //       return toast.error(
  //         'Sorry, there are no images matching your request. Please try again.'
  //       );
  //     } finally {
  //       this.setState({ loading: false });
  //     }
  //   }
  // }
  const handleIncrementPage = () => {
    setPage(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  // imageClick = imageUrl => {
  //   this.setState({ modalImage: imageUrl, showModal: true });
  // };

  const imageClick = imageUrl => {
    setModalImages({ modalImages: imageUrl, showModal: true });
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
