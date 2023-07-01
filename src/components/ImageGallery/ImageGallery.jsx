import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem.jsx';

export const ImageGallery = ({ images,onClick }) => {
  return (
    
    <ul className={css.gallery}>
      {images.map((image,index) => (
        <ImageGalleryItem key={index} image={image} onClick={onClick}/>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
};

