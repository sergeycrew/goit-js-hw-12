import './sass/main.scss';
import API from './js/fetchCountries.js';
import countryTemplate from './sass/parcials/country_info.hbs';
import countriesTemplate from './sass/parcials/countries_list.hbs';
import { debounce } from 'lodash';
import Notiflix from "notiflix";

const DEBOUNCE_DELAY = 300;

const refs = {
    searchForm: document.querySelector('#search-box'),
    countries: document.querySelector('.country-list'),
    country: document.querySelector('.country-info'),
}

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));



async function onSearch(e) {
    e.preventDefault()
    const searchQuery = e.target.value;
    refs.country.innerHTML = '';
    refs.countries.innerHTML = '';
    try {
        const dataResult = await API.fetchCountries(searchQuery );
    
        if (dataResult.length === 1) {
            renderCountryInfo(dataResult);
            // const languages = countrie[0].languages.map(l => l.name).join(', ');
            // const markup = `<p><p class="params__item">Languages:</p> ${languages}</p>`;
            refs.country.insertAdjacentHTML('beforeend', markup);
        }

        if (dataResult.length >= 2 && dataResult.length <= 10) {
            renderCountryList(dataResult);
        }

        if (dataResult.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
        }

        if (!dataResult.length) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
        }
    
    
    } catch (error) {
        Notiflix.Notify.failure('Oops, there is no country with that name')
    };
  }
  

function renderCountryInfo (country) {
const marcup = countryTemplate(country);
refs.countries.innerHTML = marcup;
}

function renderCountryList (country) {
const marcup = countriesTemplate(country);
refs.countries.innerHTML = marcup;
}