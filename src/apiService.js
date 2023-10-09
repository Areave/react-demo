import axios from 'axios'

const getListOfAvailableCurrencies = () => axios.get(getListOfAvailableCurrenciesUrl)
    .then(data => data.data)
    .catch(error => error);

export default {
    getListOfAvailableCurrencies,
}