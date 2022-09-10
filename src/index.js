import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries ,  markrupForCountriesInfo , markrupForCountriesList } from './js/fetchCountries';
import Notiflix from 'notiflix';


const refs = {
     inputEl: document.querySelector('#search-box'),
     countryList: document.querySelector('.country-list'),
     countryInfo: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(searchingCountries, DEBOUNCE_DELAY));

function searchingCountries(event) {
    let nameOfCountry = event.target.value.trim();
   refs.countryInfo.innerHTML = '';
   refs.countryList.innerHTML = '';

   if(nameOfCountry) {
    fetchCountries(`${nameOfCountry}`).then(response => {
        if(response) {
            if (response.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if(response.length === '') {
                Notiflix.Notify.failure('Oops, there is no country with that name')
            } else if (response.length <= 10 && response.length >= 2) {
                refs.countryList.innerHTML = markrupForCountriesList(response);
            } else if(response.length === 1) {
                refs.countryInfo.innerHTML = markrupForCountriesInfo(response);
            }
        }
    })
   }
}