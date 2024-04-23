import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ items, handleClick }) => {
  return (
    <ul className={css.galleryList}>
      {items.map(({ id, webformatURL, tags }) => (
        <li className={css.galleryItem} key={id} onClick={handleClick}>
          <ImageCard src={webformatURL} alt={tags}></ImageCard>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
