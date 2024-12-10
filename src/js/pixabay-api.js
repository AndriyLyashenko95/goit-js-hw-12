import axios from 'axios';
import { showLoadingIndicator, hideLoadingIndicator } from './render-functions';

const API_KEY = '47394574-2a816324e728e13b0469414a4';
const BASE_URL = 'https://pixabay.com/api/';

let currentPage = 1;

export const getCurrentPage = () => currentPage;

export const setCurrentPage = (page) => {
  currentPage = page;
};

export const fetchImages = async (query) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=15`;

  try {
    showLoadingIndicator();

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    hideLoadingIndicator();
  }
};

