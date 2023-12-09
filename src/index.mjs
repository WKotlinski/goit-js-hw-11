import axios from 'axios';
const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const search = document.querySelector('button');
let searchingValue = '';
form.addEventListener('submit', ev => {
  ev.preventDefault();
  searchingValue = input.value;
  console.log(searchingValue);
});
