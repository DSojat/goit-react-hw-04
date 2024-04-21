import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const limitPage = 16;

export default async function getGallerySearch(searchImageName, page) {
  const searchParams = new URLSearchParams({
    key: '42608378-1c88fd965c25ed4d8c49bb63d',
    q: searchImageName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: limitPage,
    page: page,
  });
  const response = await axios.get(`?${searchParams}`);
  return response.data;
}
