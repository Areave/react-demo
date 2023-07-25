import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonComp from "./comps/ButtonComp/ButtonComp";
import CurrencyExchangeComp from "./comps/CurrencyExchangeComp/CurrencyExchangeComp";
import Loader from "./comps/Loader/Loader";
import './normalize.scss';
import {Form} from "react-bootstrap";
import apiService from "./apiService";


const fetchTimeout = 1000;
const errorString = 'This pair is disabled now';

const App = () => {

        const [currencyArray, setCurrencyArray] = useState();
        const [currencyFrom, setCurrencyFrom] = useState();
        const [currencyTo, setCurrencyTo] = useState();
        const [exchangeAmountCurrencyFrom, setExchangeAmountCurrencyFrom] = useState();
        const [exchangeAmountCurrencyTo, setExchangeAmountCurrencyTo] = useState();
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState();
        const minimalExchangeAmount = useRef(null);
        const getEstimateAmountTimeout = useRef(null);

        useEffect(() => {
            setIsLoading(true);
            apiService.getListOfAvailableCurrencies().then(currencyArray => {
                setCurrencyArray(currencyArray);
                setCurrencyFrom(currencyArray[0]);
                setCurrencyTo(currencyArray[1]);
            }).catch(error => {
                setIsLoading(false);
                handleError(error)
            });
        }, []);

        useEffect(() => {
            if (currencyFrom && currencyTo) {

                setIsLoading(true);
                apiService.getMinimalExchangeAmount(currencyFrom.ticker + '_' + currencyTo.ticker).then(data => {
                    minimalExchangeAmount.current = data.minAmount;
                    if (error || !exchangeAmountCurrencyFrom || exchangeAmountCurrencyFrom <= data.minAmount) {
                        setIsLoading(false);
                        setError('');
                        setExchangeAmountCurrencyFrom(data.minAmount);
                    } else {
                        apiService.getEstimatedExchangeAmount(currencyFrom.ticker + '_' + currencyTo.ticker, exchangeAmountCurrencyFrom)
                            .then(data => {
                                setIsLoading(false);
                                setExchangeAmountCurrencyTo(data.estimatedAmount);
                            })
                    }
                }).catch(e => {
                    setIsLoading(false);
                    setError(e.message || errorString);
                });
            }
        }, [currencyFrom, currencyTo]);

        useEffect(() => {
                if (+exchangeAmountCurrencyFrom === 0) {
                    setExchangeAmountCurrencyTo('0');
                    return;
                }
                if (exchangeAmountCurrencyFrom && exchangeAmountCurrencyFrom !== '-') {
                    if (error) {
                        setError('');
                    }
                    if (currencyFrom && currencyTo) {
                        clearTimeout(getEstimateAmountTimeout.current);
                        getEstimateAmountTimeout.current = setTimeout(() => {
                            setIsLoading(true);
                            apiService.getEstimatedExchangeAmount(currencyFrom.ticker + '_' + currencyTo.ticker, exchangeAmountCurrencyFrom)
                                .then(data => {
                                    setIsLoading(false);
                                    if (data.estimatedAmount) {
                                        setExchangeAmountCurrencyTo(data.estimatedAmount);
                                    } else {
                                        handleError(data.response.data)
                                    }
                                }).catch(error => {
                                setIsLoading(false);
                                handleError(error)
                            });

                        }, fetchTimeout)

                    }
                }
            }, [exchangeAmountCurrencyFrom]);

        const handleExchangeAmountCurrency = (e) => {
            let value = e.target.value;
            const lastChar = value.slice(-1);
            if (isNaN(lastChar) && lastChar !== '.') {
                value = value.slice(0, -1);
            } else {
                if (lastChar === '.' && value.slice(0, -1).includes('.')) {
                    value = value.slice(0, -1);
                }
                if (value.length === 2 && value[0] === '0' && lastChar !== '.') {
                    return;
                }
            }
            setExchangeAmountCurrencyFrom(value);
        };

        const handleError = (response) => {
        if (response.message) {
            setError(response.message);
        } else if (response.error) {
            setError(response.error);
        } else {
            setError(errorString);
        }
    };

        const swapCurrencies = () => {
            setCurrencyFrom(currencyTo);
            setCurrencyTo(currencyFrom);
        };

        const createExchange = () => {
            console.log('exchange!', currencyFrom.ticker, currencyTo.ticker)
        };

        const doExchange = () => {
            if (exchangeAmountCurrencyFrom >= minimalExchangeAmount.current) {
                createExchange();
            } else {
                setExchangeAmountCurrencyFrom('-');
                setError(errorString);
            }
        };

        return <React.StrictMode>
            <div className="title px-md-3">
                <h2>Crypto Exchange</h2>
                <h4>Exchange fast and easy</h4>
            </div>
            <div className="form_currencies_container d-flex flex-md-row justify-content-between justify-content-md-end align-items-center pb-3">
                <CurrencyExchangeComp setCurrency={setCurrencyFrom}
                                      selectedCurrency={currencyFrom}
                                      isLoading={isLoading}
                                      setExchangeAmount={handleExchangeAmountCurrency}
                                      currencyArray={currencyArray}
                                      exchangeAmountCurrency={exchangeAmountCurrencyFrom}
                />
                <div className="swap-button">
                    {/*{isLoading ? <Loader/> : <ButtonComp label={'change'} callback={swapCurrencies}/>}*/}
                    {isLoading ? <Loader/> : <img className='swap-button-img' src={'./swap.png'} onClick={swapCurrencies}/>}
                </div>
                <CurrencyExchangeComp setCurrency={setCurrencyTo}
                                      selectedCurrency={currencyTo}
                                      isLoading={isLoading}
                                      currencyArray={currencyArray}
                                      exchangeAmountCurrency={exchangeAmountCurrencyTo}/>
            </div>
            <h4 className={'title px-md-3'}>Your Ethereum address</h4>
            {/*<Form.Label className='w-100 fs-2 text-center fw-bolder'></Form.Label>*/}
            <div className={'wallet_container d-flex flex-col px-md-3 flex-md-row'}>
                <Form.Control/>
                <div className="exchange_container">
                    <ButtonComp label={'EXCHANGE'} callback={doExchange}/>
                    {error && <div className='error text-center'>{error}</div>}

                </div>

            </div>
        </React.StrictMode>
    }
;

export default App;
