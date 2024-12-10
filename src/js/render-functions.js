import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const renderGallery = (images) => {
  const galleryContainer = document.querySelector('.gallery');

  if (!Array.isArray(images) || images.length === 0) {
    iziToast.error({
      title: 'Sorry',
      message: 'There are no images matching your search query. Please try again!',
      position: 'topCenter',
    });
    return;
  }

  images.forEach(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    const imgCard = document.createElement('div');
    imgCard.classList.add('gallery-item');
    imgCard.innerHTML = `
      <a href="${largeImageURL}" class="gallery-link">
        <img src="${webformatURL}" alt="${tags}" class="gallery-image"/>
        <div class="info">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </a>
    `;
    galleryContainer.appendChild(imgCard);
  });

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};

export const showLoadingIndicator = () => {
  const loadingIndicator = document.querySelector('.loader');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'block';
  } else {
    console.error('Loading indicator not found.');
  }
};

export const hideLoadingIndicator = () => {
  const loadingIndicator = document.querySelector('.loader');
  if (loadingIndicator) {
    setTimeout(() => {
      loadingIndicator.style.display = 'none';
    }, 500);
  } else {
    console.error('Loading indicator not found.');
  }
};

export const showLoadMoreButton = () => {
  const loadMoreButton = document.querySelector('#load-more-btn');
  loadMoreButton.style.display = 'block';
};

export const hideLoadMoreButton = () => {
  const loadMoreButton = document.querySelector('#load-more-btn');
  loadMoreButton.style.display = 'none';
};

export const showEndMessage = () => {
  const loadMoreButton = document.querySelector('#load-more-btn');
  loadMoreButton.style.display = 'none';
  iziToast.info({
    title: "End of results",
    message: "We're sorry, but you've reached the end of search results.",
    position: "topCenter"
  });
};