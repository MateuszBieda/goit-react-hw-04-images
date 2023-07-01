import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '35005985-6320445dd5945a516c4e799c6';

export const fetchImages = async (query, page) => {
  const response = axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  const elements = (await response).data.hits.map(element => {
    const { id, largeImageURL, webformatURL, tags } = element;
    return { id, largeImageURL, webformatURL, tags };
  });
  return elements;
};

// export const fetchImages = async (query, page) => {

//   const response = axios.get(
//     `?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   return response;
// };
