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

  useEffect(() => {
    if (images.length > 0) {
      page > totalPages ? setLoadMore(false) : setLoadMore(true);
    }
    if (page > 2) {
      window.scrollBy({
        top: window.innerHeight / 1.5,
        behavior: 'smooth',
      });
    }
  }, [images]);

  const handleSearch = async topic => {
    try {
      setLoading(true);
      setImages([]);
      setTopic(topic);
      console.log(page);
      setPage(1);
      console.log(page);
      const data = await getGallerySearch(topicValue, page);
      setTotalPages(Math.ceil(data.totalHits / limitPage));
      setImages(data.hits);
    } catch (error) {
      setError(true);
    } finally {
      // setPage(page + 1);
      // console.log(page);
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    console.log('loadmore ', page);
    setPage(page + 1);
    console.log('loadmore ', page);
    const data = await getGallerySearch(topicValue, page);
    setImages([...images, ...data.hits]);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch}></SearchBar>
      <section className="gallerySection">
        {images.length > 0 && <ImageGallery items={images} />}
        {loading && <Loader></Loader>}
        {error && <ErrorMessage></ErrorMessage>}
        {loadMore && <LoadMoreBtn onClick={handleLoadMore}></LoadMoreBtn>}
      </section>
    </>
  );
}

export default App;
