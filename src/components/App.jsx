// App.js
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../service/api';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import Modal from '../components/Modal/Modal';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getDataImages = async () => {
      setLoading(true);
      try {
        const dataImg = await getImages(query, page);
        const { hits, totalHits } = dataImg;
        setImages(prevState => (prevState ? [...prevState, ...hits] : hits));
        setDisabledBtn(page < Math.ceil(totalHits / 12) ? true : false);
      } catch (error) {
        setImages(null);
        toast.error('Check valid searching');
      } finally {
        setLoading(false);
      }
    };
    getDataImages();
  }, [query, page]);

  const handleFormSubmit = query => {
    if (!query) {
      toast.error('Enter correct name for search!');
      return;
    }
    setQuery(query);
    setPage(1);
    setImages(null);
    setDisabledBtn(false);
    setShowModal(false);
  };

  const toggleModal = largeImageURL => {
    setShowModal(state => !state);
    setLargeImageURL(largeImageURL);
  };

  const loadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleFormSubmit} />
      {images && (
        <ImageGallery>
          <ImageGalleryItem images={images} onClick={toggleModal} />
        </ImageGallery>
      )}
      {loading && <Loader />}
      {disabledBtn && <Button onClick={loadMoreBtn} />}
      {showModal && <Modal onClose={toggleModal} ImageUrl={largeImageURL} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
