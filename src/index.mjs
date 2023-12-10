import axios from 'axios';
import Notify from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const placeForImg = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');
const apiKey = '41167232-e4ed0bcecad469809d9012c23';
let currentPage = 1;
let searchingValue = '';
let pageLimit = 5;

function searchImages(query, page = 1) {
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${pageLimit}`;

  return axios
    .get(apiUrl)
    .then(res => {
      const data = res.data;
      if (data.hits && data.hits.length > 0) {
        const html = data.hits.map(
          ({
            largeImageURL,
            webformatURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) => {
            return `<div class="photo-card"><a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
              <b>Views: ${views}</b>
            </p>
            <p class="info-item">
              <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads: ${downloads}</b>
            </p>
          </div>
          </a>
        </div>`;
          }
        );
        if (page === 1) {
          placeForImg.innerHTML = html.join('');
        } else {
          placeForImg.innerHTML += html.join('');
        }
        const lightbox = new SimpleLightbox('.gallery a');
      } else {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      Notify.failure('Error fetching data');
    })
    .finally(_event => {
      moreBtn.style.display = 'block';
    });
}

form.addEventListener('submit', ev => {
  placeForImg.innerHTML = '';
  ev.preventDefault();
  searchingValue = input.value;
  currentPage = 1;
  searchImages(searchingValue, currentPage);
});
moreBtn.addEventListener('click', () => {
  moreBtn.style.display = 'none';
  currentPage++;
  searchImages(searchingValue, currentPage);
});
