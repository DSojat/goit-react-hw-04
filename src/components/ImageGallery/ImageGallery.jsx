import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ items, handleClick }) => {
  return (
    <ul className={css.galleryList}>
      {items.map(
        ({
          id,
          urls: { small, regular },
          alt_description,
          likes,
          user: { username },
          description,
        }) => (
          <li className={css.galleryItem} key={id}>
            <ImageCard
              onClick={handleClick}
              values={{
                src: small,
                alt: alt_description,
                regular,
                description,
              }}
            ></ImageCard>
            <div className={css.galleryStats}>
              <ul className={css.galleryStatsUl}>
                Likes
                <li className={css.galleryStatsLi}>{likes}</li>
              </ul>
              <ul className={css.galleryStatsUl}>
                Posted by
                <li className={css.galleryStatsLi}>{username}</li>
              </ul>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default ImageGallery;
