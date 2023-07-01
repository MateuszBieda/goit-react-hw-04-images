
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({image,onClick }) => {
  const { webformatURL, tag,largeImageURL } = image;
  return (
    <li className={css.ImageGalleryItem} >
      <img src={webformatURL} alt={tag} onClick={() => onClick(largeImageURL)} className={css.image}/>
    </li>
  );
};


ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tag: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
};
