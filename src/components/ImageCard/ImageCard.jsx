import css from './ImageCard.module.css';

const ImageCard = ({ src, alt, value }) => {
  return (
    <div className={css.imgBox}>
      <img className={css.img} src={src} alt={alt} value={value} />
    </div>
  );
};

export default ImageCard;
