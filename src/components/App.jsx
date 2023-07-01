import css from 'App.module.css';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { fetchImages } from 'services/api.js';
import { Loader } from './Loader/Loader.jsx';
//import { Rings } from 'react-loader-spinner';

// import { Loader } from './Loader/Loader.jsx';
import { Modal } from './Modal/Modal.jsx';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    currentLargeImageURL: '',
    error: null,
    isLoading: false,
    showModal: false,
  };

  onOpenModalWithLargeImage = url => {
    this.setState({ showModal: true, currentLargeImageURL: url });
  };

  onModalClose = e => {
    this.setState(({ showModal }) => ({
      showModal: false,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.setState({ showModal: false });
    }
  };

  handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.setState({ showModal: false });
    }
  };

  addFetchedImages = async (query, page) => {
    try {
      this.setState({
        isLoading: true,
      });
      const elements = await fetchImages(query, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...elements],
        isLoading: false,
      }));
      console.log(this.props);
      if (elements.length === 0) {
        alert(
          "Sorry, we can't find anything for your request. Please try again"
        );
      }
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.addFetchedImages(this.state.query, this.state.page);
    }
  }

  // componentDidUpdate() {
  //   fetchImages()
  //     .then(response => {
  //       console.log(response.data.hits);
  //       this.setState({ images: response.data.hits });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });

  handleFormSubmit = query => {
    if (query.trim().length === 0) {
      alert('Please, enter request');
      return;
    }
    this.setState({ query, page: 1, images: [] });
  };

  render() {
    const { images, isLoading, currentLargeImageURL, error } = this.state;
    const {onModalClose}=this;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {images.length > 0 && (
          <ImageGallery
            images={images}
            onClick={this.onOpenModalWithLargeImage}
          />
        )}

        {images.length > 0 && <Button onClick={this.handleLoadMore} />}
        {this.state.showModal && (
          <Modal
          onModalClose={onModalClose}
            url={currentLargeImageURL}
            onKeyDown={this.handleKeyDown}
          />
        )}
      </div>
    );
  }
}
