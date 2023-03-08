import axios from 'axios';
const allUrl = 'https://restcountries.com/v3.1/all';
const countryUrl = 'https://restcountries.com/v3.1/name/'
const API_KEY = process.env.REACT_APP_API_KEY;


const restServices = {
  apiCall: null,
  debounce(restCall) {
    // const self = this;
    // let promise = new Promise(fulfill => {
    //   if (self.apiCall) {
    //     clearTimeout(self.apiCall);
    //     self.apiCall = setTimeout(() => {
    //       self.apiCall = null;
    //       fulfill(restCall());
    //     }, 200);
    //   } else {
    //     self.apiCall = setTimeout(() => {
    //       self.apiCall = null;
    //       return;
    //     }, 200)
    //     fulfill(restCall());
    //   }

    // });
    // return promise;
  },

  getAll() {
    // return this.debounce(() => {
    return axios.get(allUrl)
    // });
  },

  getCountry(input) {
    // let promise = new Promise(fulfill => {
    //   fulfill(
    //     this.debounce(() => {
    //       return axios.get(countryUrl + input);
    //     })
    //   )
    // })
    // return promise;
    // if (input === '') {
    //   return null;
    // }
    // return (this.debounce(() => {
    //   return axios.get(countryUrl + input);
    //   })
    // );
  },
  getWeatherData(country) {
    const code = country.cca2;
    const state = country.name.common === 'United States' ? 'DC' : null;
    const city_name = country.capital[0];
    const limit = 5;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=${limit}&appid=${API_KEY}`;
    axios.get(url)
  }
};

export default restServices;
