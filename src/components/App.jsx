import { useEffect, useState, useRef } from 'react';
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const galleryRef = useRef();

  useEffect(() => {
    page > totalPages ? setLoadMore(false) : setLoadMore(true);
  }, [totalPages]);

  function scrollGallery() {
    const elem = galleryRef.current;
    console.log(elem);
    const { height } = elem.getBoundingClientRect();
    console.log(height);
    window.scrollBy({
      top: window.innerHeight,
      // top: height * 20,
      left: 0,
      behavior: 'smooth',
    });
  }

  const handleSearch = async topic => {
    try {
      setLoading(true);
      setImages([]);
      setTopic(topic);
      setPage(1);
      const data = await getGallerySearch(topic, page);
      setTotalPages(Math.ceil(data.totalHits / limitPage));
      setImages(data.hits);
    } catch (error) {
      setError(true);
    } finally {
      setPage(page + 1);
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
    const data = await getGallerySearch(topicValue, page);
    setImages([...images, ...data.hits]);
    if (page >= totalPages) {
      setLoadMore(false);
    }
    scrollGallery();
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch}></SearchBar>
      <section className="gallerySection">
        {loading && <Loader></Loader>}
        {error && <ErrorMessage></ErrorMessage>}
        {images.length > 0 && <ImageGallery items={images} />}
        {loadMore && <LoadMoreBtn onClick={handleLoadMore}></LoadMoreBtn>}
        return{' '}
        <button onClick={() => window.scrollBy(0, window.innerHeight)}>
          Button with ref
        </button>
        ;
      </section>
    </>
  );
}

export default App;
