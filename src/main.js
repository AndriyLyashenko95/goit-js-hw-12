import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showLoadingIndicator, hideLoadingIndicator } from './js/render-functions.js';


const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

const showError = (message) => {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topCenter',
  });
};

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === '') {
    showError('Please enter a search term.');
    return;
  }

  showLoadingIndicator(); 

  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = ''; 

  try {
    const images = await fetchImages(query);

    if (images.length === 0) {
      showError('There are no images matching your search query. Please try again!');
    } else {
      renderGallery(images); 
    }
  } catch (error) {
    showError('An error occurred while fetching images.');
  } finally {
    hideLoadingIndicator(); 
  }

  searchInput.value = '';
});