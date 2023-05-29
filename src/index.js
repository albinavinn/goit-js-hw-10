import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './style.css';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onBreedChange);

Notiflix.Loading.circle('Loading data, please wait...');

 fetchBreeds()
      .then(breeds => {
        Notiflix.Loading.remove();
        loader.classList.remove('is-hidden');
        renderBreedList(breeds);
        new SlimSelect({
          select: '#single'
        })
    })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      })
      .finally(() => {
        breedSelect.classList.remove('is-hidden');
        loader.classList.add('is-hidden');
      })


function renderBreedList(breeds){
  breedSelect.innerHTML = breeds.map(breed => {
    return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
  }).join('');
}

function onBreedChange(e){
  loader.classList.remove('is-hidden');
  const breedId = e.target.value;
  fetchCatByBreed(breedId)
      .then(breed => {
        renderCatCard(breed);
        Notiflix.Loading.remove();
        catInfo.classList.remove('is-hidden');
        catInfo.classList.add('open-box')
    })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      })
      .finally(()=> loader.classList.add('is-hidden'));

}

function renderCatCard (breed){
  catInfo.innerHTML = '';
  const markupImg = `<img class="cat-picture" width=400 src="${breed.url}" alt="bbb">`;
  const markupDescr = `<div><h1 class="cat-name">${breed.breeds[0].name}</h2><p class="cat-description">${breed.breeds[0].description}</p><p class="cat-temperament"><b>Temperament:</b> ${breed.breeds[0].temperament}</p></div>`;
  catInfo.insertAdjacentHTML('beforeend', markupImg);
  catInfo.insertAdjacentHTML('beforeend', markupDescr);
 
}
