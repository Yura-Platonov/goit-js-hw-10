import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';


import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Вызов функции fetchBreeds() для получения массива пород
fetchBreeds()
  .then(breeds => {
    // Используйте массив пород здесь, например, для заполнения элемента select
    const selectElement = document.querySelector('.breed-select');
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      selectElement.appendChild(option);
    });
  })
  .catch(error => {
    console.log(error);
  });

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  showLoader();

  fetchCatByBreed(selectedBreedId)
    .then(data => {
      hideLoader();
      showCatInfo(data);
    })
    .catch(error => {
      hideLoader();
      showError();
      console.log(error);
    });
});

function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

function showError() {
  const error = document.querySelector('.error');
  error.style.display = 'block';
}

function hideError() {
  const error = document.querySelector('.error');
  error.style.display = 'none';
}

function showCatInfo(data) {
    const breed = data.breeds[0];
  
    const catInfoHTML = `
      <h2>Cat Information</h2>
      <p><strong>Breed:</strong> ${breed.name}</p>
      <p><strong>Description:</strong> ${breed.description}</p>
      <p><strong>Temperament:</strong> ${breed.temperament}</p>
      <img src="${data.url}" alt="Cat Image">
    `;
    catInfo.innerHTML = catInfoHTML;
  }
  