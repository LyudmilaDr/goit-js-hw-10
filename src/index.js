import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';


const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('[country-list]');

input.addEventListener('input', debounce(searchСountry, DEBOUNCE_DELAY));

function searchСountry(){
const inputValue = input.value.trim();
  clean();
  if(inputValue !== ""){
    fetchCountries(inputValue)
    .then(data => {
    if(data.length > 10){
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }else if(data.length === 0){
      Notiflix.Notify.failure('Oops, there is no country with that name'); 
    }else if(data.length < 10 && data.length >= 2){
      renderCountriesUl(data);
    }else if(data.length === 1){
      renderCountry(data);
    }
  })
  .catch(error => {
  console.error(error);
  })
  }
}

function renderCountry(countries) {
  const markup = countries
  .map(country => {
        return `<li><img src="${country.flags.svg}" alt=${country.name.official} width="25" height="25">
        <h2> ${country.name.official}</h2>
        <p><b>Capital:</b>${country.capital}</p>
        <p><b>Population:</b>${country.population}</p>
        <p><b>Languages:</b>${country.languages}</p></li>`
      })
      .join("");
      countryList.innerHTML = markup;
  }
  function renderCountriesUl(countries) {
    const markup = countries.map(country => {
        return  `<li><img src="${country.flags.svg}" alt=${country.name.official} width="25" height="25">
        <h2> ${country.name.official}</h2></li>`})
      .join("");
      countryList.innerHTML = markup; 
  }
  function clean() {
      countryList.innerHTML = '';
    }
  

