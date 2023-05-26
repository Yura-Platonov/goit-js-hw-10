const URL = 'https://api.thecatapi.com/v1/breeds';
const IMAGE_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY =
  'live_0IgZa7IH1fpaWqdplmMVv1LV38TxUjv021FhoSLmCmZ7mDHnKHSgRhj96Q9O9kZ4';

function fetchBreeds() {
  return fetch(URL, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Произошла ошибка при выполнении запроса');
      }
      return response.json();
    })
    .then(data => {
      return data.map(({ id, name }) => ({ id, name }));
    })
    .catch(error => {
      console.log('Ошибка:', error.message);
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  const url = `${IMAGE_URL}?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Произошла ошибка при выполнении запроса');
      }
      return response.json();
    })
    .then(data => {
      return data[0]; // Возвращаем первый объект из массива
    })
    .catch(error => {
      console.log('Ошибка:', error.message);
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };
