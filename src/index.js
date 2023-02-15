import './css/styles.css';
import {fetchCountries} from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;
const fetchCountriesName = document.querySelector('#search-box');
const countryList = document.querySelector('[country-list]');
const countryInfo = document.querySelector('[country-info]');

fetchCountriesName.addEventListener('input',debounce(searchСountry,DEBOUNCE_DELAY));

function renderCountry(arr) {
    const markup = arr
      .map(({ capital, population, languages, name, flags }) => {
        return 
        `<img src="${flags.svg}" alt=${name.official} width="25" height="25">
        <h2> ${name.official}</h2>
        <p><b>Capital:</b>${capital}</p>
        <p><b>Population:</b>${population}</p>
        <p><b>Languages:</b>${languages}</p>`;
      })
      .join("");
      countryInfo.innerHTML = markup;
  }
  function renderCountriesUl(arr){
    const markup = arr
    .map(({ name, flags }) => {
        return 
        `<li><img src="${flags.svg}" alt=${name.official} width="25" height="25">
        <h2> ${name.official}</h2></li>`
        
      })
      .join("");
      countryList.innerHTML = markup; 
  }
