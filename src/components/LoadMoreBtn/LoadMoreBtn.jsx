import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, children }) => {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      Load more: {children}
    </button>
  );
};
export default LoadMoreBtn;
