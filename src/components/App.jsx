// App.js
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../service/api';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import Modal from '../components/Modal/Modal';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    largeImageURL: null,
    showModal: false,
    disabledBtn: false,
  };

  getDataImages = async () => {
    const { query, page } = this.state;
    this.setState({ loading: true });

    try {
      const dataImg = await getImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...dataImg.hits],
        disabledBtn: page < Math.ceil(dataImg.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ images: [] });
      toast.error('Check valid searching');
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.getDataImages();
    }
  }

  handleFormSubmit = query => {
    if (!query) {
      toast.error('Enter correct name for search!');
      return;
    }
    this.setState({ query, page: 1, images: [], loadMore: false });
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
    }));
  };

  loadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, largeImageURL, showModal, disabledBtn, loading } =
      this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images && (
          <ImageGallery>
            <ImageGalleryItem images={images} onClick={this.toggleModal} />
          </ImageGallery>
        )}
        {loading && <Loader />}
        {disabledBtn && <Button onClick={this.loadMoreBtn} />}
        {showModal && (
          <Modal onClose={this.toggleModal} ImageUrl={largeImageURL} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
