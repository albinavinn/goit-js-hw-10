const API = 'live_rfa9wLC851bATCDXVFy1r5Zj9ZBXk43qw7u2fCAf3J326B0Ty7B3GAA4b5hk79up';

const fetchBreeds = () => {
  return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

const fetchCatByBreed = breedId => {
  return fetch(`https://api.thecatapi.com/v1/images/${breedId}?api_key=${API}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export { fetchBreeds, fetchCatByBreed };

