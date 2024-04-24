import css from './ImageCard.module.css';

const ImageCard = ({ onClick, src, alt, value }) => {
  console.log(value);
  return (
    <div className={css.imgBox}>
      <img
        className={css.img}
        onClick={onClick}
        src={src}
        alt={alt}
        value={value}
      />
    </div>
  );
};

export default ImageCard;
