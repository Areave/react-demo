import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonComp from "./comps/ButtonComp/ButtonComp";
import CurrencyExchangeComp from "./comps/CurrencyExchangeComp/CurrencyExchangeComp";
import './normalize.scss';
import {Form} from "react-bootstrap";
import apiService from "./apiService";
import Loader from "./comps/Loader/Loader";

const App = () => {

        const [currencyArray, setCurrencyArray] = useState();
        const [currencyFrom, setCurrencyFrom] = useState();
        const [currencyTo, setCurrencyTo] = useState();
        const [minimalExchangeAmount, setMinimalExchangeAmount] = useState();
        const [exchangeAmountCurrencyFrom, setExchangeAmountCurrencyFrom] = useState();
        const [exchangeAmountCurrencyTo, setExchangeAmountCurrencyTo] = useState();
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState();

        useEffect(() => {
            setIsLoading(true);
            apiService.getListOfAvailableCurrencies().then(currencyArray => {
                setIsLoading(false);
                setCurrencyArray(currencyArray);
                setCurrencyFrom(currencyArray[0]);
                setCurrencyTo(currencyArray[1]);
            }).catch(e => setError(e.message));
        }, []);

        useEffect(() => {
            if (currencyFrom && currencyTo) {
                setIsLoading(true);
                apiService.getMinimalExchangeAmount(currencyFrom.ticker + '_' + currencyTo.ticker).then(data => {
                    setMinimalExchangeAmount(data.minAmount);
                    if (!exchangeAmountCurrencyFrom || exchangeAmountCurrencyFrom <= data.minAmount) {
                        setIsLoading(false);
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
                    setError(e.message);
                });
            }
        }, [currencyFrom, currencyTo]);

        let getEstimateAmountTimeout;
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
                        setIsLoading(true);
                        apiService.getEstimatedExchangeAmount(currencyFrom.ticker + '_' + currencyTo.ticker, exchangeAmountCurrencyFrom)
                            .then(data => {
                                setIsLoading(false);
                                setExchangeAmountCurrencyTo(data.estimatedAmount);
                            })
                    }
                }
            }, [exchangeAmountCurrencyFrom]
        );

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

        const swapCurrencies = () => {
            setCurrencyFrom(currencyTo);
            setCurrencyTo(currencyFrom);
        };

        const createExchange = () => {
            console.log('exchange!', currencyFrom.ticker, currencyTo.ticker)
        };

        const doExchange = () => {
            if (exchangeAmountCurrencyFrom >= minimalExchangeAmount) {
                createExchange();
            } else {
                setExchangeAmountCurrencyFrom('-');
                setError('wrong amount!');
            }
        };

        return <React.StrictMode>
            <h1>Crypto Exchange</h1>
            <h2>Exchange fast and easy</h2>
            <div className="d-flex">
                <CurrencyExchangeComp setCurrency={setCurrencyFrom}
                                      selectedCurrency={currencyFrom}
                                      isLoading={isLoading}
                                      setExchangeAmount={handleExchangeAmountCurrency}
                                      currencyArray={currencyArray}
                                      exchangeAmountCurrency={exchangeAmountCurrencyFrom}
                />
                <div className="">
                    {isLoading ? <Loader/> : <ButtonComp label={'change'} callback={swapCurrencies}/>}
                </div>
                <CurrencyExchangeComp setCurrency={setCurrencyTo}
                                      selectedCurrency={currencyTo}
                                      isLoading={isLoading}
                                      currencyArray={currencyArray}
                                      exchangeAmountCurrency={exchangeAmountCurrencyTo}/>
            </div>
            <Form.Label className='w-100 fs-2 text-center fw-bolder'>Your Ethereum address</Form.Label>
            <div className={'d-flex'}>
                <Form.Control/>
                <ButtonComp label={'exchange'} callback={doExchange}/>
                {error && <div>{error}</div>}
            </div>
        </React.StrictMode>
    }
;

export default App;
