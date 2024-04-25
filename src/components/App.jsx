import { useEffect, useState } from 'react';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';

import getGallerySearch from '../unsplash-api';

function App() {
  const [images, setImages] = useState([]);
  const [topicValue, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([false, undefined]);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageItem, setImageValue] = useState([]);

  useEffect(() => {
    if (images.length > 0) {
      page >= totalPages ? setLoadMore(false) : setLoadMore(true);
    }
    if (page > 1) {
      window.scrollBy({
        top: window.innerHeight / 1.5,
        behavior: 'smooth',
      });
    } else {
      topicValue && setPage(1);
    }
  }, [images]);

  useEffect(() => {
    if (!topicValue) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getGallerySearch(topicValue, page);
        if (data.results.length === 0) {
          throw new Error('No results found');
        }
        if (page === 1) {
          setTotalPages(data.total_pages);
          setImages(data.results);
        } else {
          setImages([...images, ...data.results]);
        }
      } catch (error) {
        setError([true, error.message]);
        loadMore && setLoadMore(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, topicValue]);

  const handleSearch = topic => {
    setTopic(topic);
    setImages([]);
    setError([false, undefined]);
    setLoadMore(false);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleImageView = (evt, values) => {
    evt.preventDefault();
    setImageValue(values);
    setIsOpen(true);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch}></SearchBar>
      <section className="gallerySection">
        {images.length > 0 && (
          <ImageGallery items={images} handleClick={handleImageView} />
        )}
        {loading && <Loader></Loader>}
        {error[0] && <ErrorMessage value={error}></ErrorMessage>}
        {loadMore > loading && (
          <LoadMoreBtn onClick={handleLoadMore}>
            <span>
              {page} of {totalPages}
            </span>
          </LoadMoreBtn>
        )}
        {modalIsOpen && (
          <ImageModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            item={imageItem}
          ></ImageModal>
        )}
      </section>
    </>
  );
}

export default App;
