import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesGallery } from './API/api';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import Modal from './Modal/Modal';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    imageName: '',
    images: [],
    loading: false,
    page: 1,
    totalImages: 0,
    error: null,
    showModal: false,
    modalImage: '',
  };

  handleSearchBarSubmit = imageName => {
    this.setState({
      imageName,
      page: 1,
      images: [],
    });
  };

  async componentDidUpdate(_, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    if (prevName !== nextName || prevState.page !== this.state.page) {
      this.setState({ loading: true });
      try {
        const response = await fetchImagesGallery(nextName, this.state.page);

        if (response.status !== 200 || response.data.hits.length === 0) {
          return toast.error('Something went wrong. Please try again!');
        }
        this.setState({
          totalImages: response.data.totalHits,
        });
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...response.data.hits],
          };
        });
      } catch (error) {
        return toast.error(
          'Sorry, there are no images matching your request. Please try again.'
        );
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  handleIncrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  imageClick = imageUrl => {
    this.setState({ modalImage: imageUrl, showModal: true });
  };

  render() {
    const { loading, showModal, images, page, modalImage } = this.state;
    const maxPage = Math.ceil(this.state.totalImages / 12);
    const showButton = images.length >= 12 && page < maxPage;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchBarSubmit} />
        {showModal && <Modal image={modalImage} onClose={this.toggleModal} />}

        {images.length && (
          <ImageGallery items={images} onClick={this.imageClick} />
        )}
        <ToastContainer autoClose={3000} />
        {loading && <Loader />}
        {showButton && <LoadMoreBtn onClick={this.handleIncrementPage} />}
      </Container>
    );
  }
}
