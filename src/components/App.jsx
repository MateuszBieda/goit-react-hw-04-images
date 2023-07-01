import css from 'App.module.css';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { fetchImages } from 'services/api.js';
import { Loader } from './Loader/Loader.jsx';
import { useState, useEffect } from 'react';
import { Modal } from './Modal/Modal.jsx';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [currentLargeImageURL, setCurrentLargeImageURL] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onOpenModalWithLargeImage = currentLargeImageURL => {
    console.log(currentLargeImageURL);
    setShowModal(true);
    setCurrentLargeImageURL(currentLargeImageURL);
  };

  const onModalClose = e => {
    setShowModal(false);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      setShowModal(false);
    }
  };


  useEffect(() => {
    addFetchedImages(query, page);
  }, [query, page]);

  const addFetchedImages = async (query, page) => {

    if (!query) {
      return;
    }
  
    try {
      setIsLoading(true);
      const elements = await fetchImages(query, page);

      setImages(prevImages => [...prevImages, ...elements]);

      setIsLoading(false);

      if (elements.length === 0) {
        alert(
          "Sorry, we can't find anything for your request. Please try again"
        );
      }
    } catch (error) {
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = query => {
    if (query.trim().length === 0) {
      alert('Please, enter request');
      return;
    }
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={onOpenModalWithLargeImage} />
      )}

      {images.length > 0 && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal
          onModalClose={onModalClose}
          currentLargeImageURL={currentLargeImageURL}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};
