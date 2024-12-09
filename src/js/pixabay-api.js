import { showLoadingIndicator, hideLoadingIndicator } from './render-functions';

const API_KEY = '47394574-2a816324e728e13b0469414a4';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  
  try {
    showLoadingIndicator();

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Something went wrong with the API request.');
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    // alert(`Error: ${error.message}`);
    console.error(error);
    throw error;
  } finally {
    hideLoadingIndicator();
  }
}