import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';


const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('[country-list]');



input.addEventListener('input', debounce(searchСountry, DEBOUNCE_DELAY));

function searchСountry(e){

  const inputValue = e.target.value.trim();
  if(inputValue !== ""){
    fetchCountries(inputValue)
    .then(data => {
    if(data.length > 10){
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }else if(data.length < 10 && data.length >= 2){
      renderCountriesUl(data);
    }else if(data.length === 1){
      renderCountry(data);
    }else if(data.length === 0){
      Notiflix.Notify.failure('Oops, there is no country with that name'); 
    }
  })
  .catch(error => {
    Notiflix.Notify.failure ('Oops, there is no country with that name');
  })
  }
}

function renderCountry(arr) {
  const markup = arr
  .map(({ name, capital, population, flags, languages }) => {
        return `<li><img src="${flags.svg}" alt=${name.official} width="25" height="25">
        <h2> ${name.official}</h2>
        <p><b>Capital:</b>${capital}</p>
        <p><b>Population:</b>${population}</p>
        <p><b>Languages:</b>${languages}</p></li>`
      })
      .join("");
      countryList.innerHTML = markup;
  }
  function renderCountriesUl(arr){
    const markup = arr.map(({ name, flags }) => {
        return  `<li><img src="${flags.svg}" alt=${name.official} width="25" height="25">
        <h2> ${name.official}</h2></li>`})
      .join("");
      countryList.innerHTML = markup; 
  }
