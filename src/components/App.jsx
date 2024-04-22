import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';

import getGallerySearch from '../pixabay-api';
import { limitPage } from '../pixabay-api';

function App() {
  const [images, setImages] = useState([]);
  const [topicValue, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      page >= totalPages ? setLoadMore(false) : setLoadMore(true);
    }

    if (page > 1) {
      window.scrollBy({
        top: window.innerHeight / 1.5,
        behavior: 'smooth',
      });
    }
  }, [images]);

  const handleSearch = async topic => {
    try {
      setLoading(true);
      setTopic(topic);
      setImages([]);
      setPage(1);
      const startPage = 1;
      const data = await getGallerySearch(topic, startPage);
      setTotalPages(Math.ceil(data.totalHits / limitPage));
      setImages(data.hits);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      setPage(page + 1);
      const data = await getGallerySearch(topicValue, page + 1);
      setImages([...images, ...data.hits]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch}></SearchBar>
      <section className="gallerySection">
        {images.length > 0 && <ImageGallery items={images} />}
        {loading && <Loader></Loader>}
        {error && <ErrorMessage></ErrorMessage>}
        {loadMore > loading && (
          <LoadMoreBtn onClick={handleLoadMore}>
            <span>
              {page} of {totalPages}
            </span>
          </LoadMoreBtn>
        )}
      </section>
    </>
  );
}

export default App;
