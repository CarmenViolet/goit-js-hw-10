import Notiflix from 'notiflix';

const BASE_URL = `https://restcountries.com/v3.1/name/`;

const config = new URLSearchParams ({
    fields: 'name,capital,population,flags,languages'
});

export function fetchCountries(name) {
    return  fetch(`${BASE_URL}${name}?${config}`).then(resp => {

        if(!resp.ok) {
            throw new Error('Oops, there is no country with that name');
        }
        return resp.json()
    }).catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
}

export function markrupForCountriesList(response) {
 return   listOfCountries = response.reduce((acc, { name, flags }) => acc += `<li class="country-li">
    <img src="${flags.svg}" alt="flags of countries"  width='30px'/>
    <h2 class="country-name">${name.official}</h2>
    </li>`, '')
};

export function markrupForCountriesInfo(response) {
 return   infoOfCountries = response.reduce((acc, {name, flags, capital, population, languages}) => acc += `<div class="main-info">
    <img src="${flags.svg}" alt="flag of country" width="80"/>
    <h2>${name.official}</h2>
    </div>
  <p><span>Capital:</span> ${capital}</p>
  <p><span>Population:</span> ${population}</p>
  <p><span>Languages:</span> ${Object.values(languages).join(', ')}</p>` ,'')
};