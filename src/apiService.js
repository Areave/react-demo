import axios from 'axios'

const apiKey = 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd';
const getListOfAvailableCurrenciesUrl = 'https://api.changenow.io/v1/currencies?active=true&fixedRate=true';

const getListOfAvailableCurrencies = () => axios.get(getListOfAvailableCurrenciesUrl)
    .then(data => data.data)
    .catch(error => error);

const getMinimalExchangeAmount = (from_to) => axios.get(`https://api.changenow.io/v1/min-amount/${from_to}?api_key=${apiKey}`)
    .then(data => data.data)
    .catch(error => error);

const getEstimatedExchangeAmount = (from_to, amount) => axios.get(`https://api.changenow.io/v1/exchange-amount/${amount}/${from_to}/?api_key=${apiKey}`)
    .then(data => data.data)
    .catch(error => error);

export default {
    getListOfAvailableCurrencies,
    getMinimalExchangeAmount,
    getEstimatedExchangeAmount
}