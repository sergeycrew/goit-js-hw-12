const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}?fields=name;capital;flag;population;languages`).then(response =>
        response.json()
      )
}

export default { fetchCountries }