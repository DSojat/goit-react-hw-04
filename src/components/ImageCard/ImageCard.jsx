import css from './ImageCard.module.css';

const ImageCard = ({ src, alt }) => {
  return (
    <div className={css.imgBox}>
      <img className={css.img} src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;
