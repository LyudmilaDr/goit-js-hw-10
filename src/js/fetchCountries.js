const  fetchCountries = name => {
    return fetch('https:restcountries.com/v3.1/name/Ukraine/${name}?fields=name,capital,population,flag,languages')
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            return [];
          }
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  };
  export default  fetchCountries;