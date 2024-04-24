import css from './ImageCard.module.css';

const ImageCard = ({ onClick, values }) => {
  return (
    <div className={css.imgBox}>
      <img
        className={css.img}
        onClick={evt => {
          onClick(evt, values);
        }}
        src={values.src}
        alt={values.alt}
      />
    </div>
  );
};

export default ImageCard;
