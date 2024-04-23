import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ items }) => {
  return (
    <ul className={css.galleryList}>
      {items.map(({ id, webformatURL, tags }) => (
        <li className={css.galleryItem} key={id}>
          <ImageCard src={webformatURL} alt={tags}></ImageCard>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
