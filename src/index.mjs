import axios from 'axios';
import { Notify } from 'notiflix';
const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const placeForImg = document.querySelector('.gallery');
const search = document.querySelector('button');
const apiKey = '41167232-e4ed0bcecad469809d9012c23';
let currentPage = 1;
let searchingValue = '';
function searchImages(query, page = 1) {
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  return axios
    .get(apiUrl)
    .then(res => {
      const data = res.data;
      if (data.hits && data.hits.length > 0) {
        const html = data.hits.map(image => {
          return `<img width="600" height="400" src="${image.largeImageURL}" class="cat-img"></img><h2 class="cat-name">${image.largeImageURL}</h2><p class="description">${image}</p>`;
        });
        placeForImg.innerHTML = html;
      } else {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      Notify.failure('Error fetching data');
    });
}

form.addEventListener('submit', ev => {
  ev.preventDefault();
  searchingValue = input.value;
  currentPage = 1;
  searchImages(searchingValue, currentPage);
});
