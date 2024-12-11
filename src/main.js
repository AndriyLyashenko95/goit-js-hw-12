import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages, getCurrentPage, setCurrentPage } from './js/pixabay-api.js';
import { renderGallery, showLoadingIndicator, hideLoadingIndicator, showLoadMoreButton, hideLoadMoreButton, showEndMessage } from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loadMoreButton = document.querySelector('#load-more-btn');
let query = '';
let isFirstSearch = true;

const showError = (message) => {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topCenter',
  });
};

const scrollToNextImages = () => {
  const galleryItemHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
  window.scrollBy(0, galleryItemHeight * 2);
};

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  query = searchInput.value.trim();

  if (query === '') {
    showError('Please enter a search term.');
    return;
  }

  if (!isFirstSearch) {
    setCurrentPage(1); 
  }

  showLoadingIndicator();
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';

  try {
    const data = await fetchImages(query);
    const images = data.hits;
    const totalHits = data.totalHits;

    if (images.length === 0) {

      galleryContainer.innerHTML = '';
      hideLoadMoreButton();
      showError('There are no images matching your search query. Please try again!');
    } else {
      renderGallery(images); 
      if (totalHits > getCurrentPage() * 15) {
        showLoadMoreButton();
      } else {
        showEndMessage();
      }
    }
  } catch (error) {
    showError('An error occurred while fetching images.');
  } finally {
    hideLoadingIndicator();
  }

  isFirstSearch = false; 
  searchInput.value = '';
});

loadMoreButton.addEventListener('click', async () => {
  const currentPage = getCurrentPage();

  hideLoadMoreButton();
  showLoadingIndicator();

  if (currentPage >= 15) {
    showEndMessage();
    return;
  }

  setCurrentPage(currentPage + 1);

  try {
    const data = await fetchImages(query);
    const images = data.hits;
    const totalHits = data.totalHits;

    if (images.length === 0) {
      showError('No more images available.');
    } else {
      renderGallery(images);
      if (getCurrentPage() * 15 >= totalHits) {
        showEndMessage();
      } else {
        showLoadMoreButton();
      }
    }

    scrollToNextImages(); 

  } catch (error) {
    showError('An error occurred while fetching images.');
  } finally {
    hideLoadingIndicator();
  }
});