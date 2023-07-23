import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonComp from "./comps/ButtonComp/ButtonComp";
import CurrencyExchangeComp from "./comps/CurrencyExchangeComp/CurrencyExchangeComp";
import './normalize.scss';
import {Form, InputGroup} from "react-bootstrap";
import ButtonsComp from "./comps/ButtonsComp/ButtonsComp";
import apiService from "./apiService";

const App = () => {

    const [currencyArray, setCurrencyArray] = useState();

    const [currencyFrom, setCurrencyFrom] = useState();
    const [currencyTo, setCurrencyTo] = useState();
    const [exchangeAmountCurrencyFrom, setExchangeAmountCurrencyFrom] = useState();
    const [exchangeAmountCurrencyTo, setExchangeAmountCurrencyTo] = useState();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    let from_to = '';
    let minimalExchangeAmount;

    useEffect(() => {
        console.log('useeffect setCurrencyArray');
        apiService.getListOfAvailableCurrencies().then(currencyArray => {
            setCurrencyArray(currencyArray);
        })
    }, []);

    useEffect(() => {
        if (currencyFrom && currencyTo) {
            apiService.getMinimalExchangeAmount(currencyFrom.ticker + '_' + currencyTo.ticker).then(data => {
                console.log(data.minAmount);
                if (!exchangeAmountCurrencyFrom || exchangeAmountCurrencyFrom < data.minAmount) {
                    setExchangeAmountCurrencyFrom(data.minAmount);
                }
            })
                .catch(e => {
                setError(e.message);
            });
        }
    }, [currencyFrom, currencyTo]);

    let getEstimateAmountTimeout;
    useEffect(() => {
        setError('');
        console.log('getEstimatedExchangeAmount', currencyFrom && currencyTo);

        if (currencyFrom && currencyTo) {
            clearTimeout(getEstimateAmountTimeout);
            console.log('getEstimatedExchangeAmount');
            getEstimateAmountTimeout = setTimeout(() => {

                apiService.getEstimatedExchangeAmount(currencyFrom.ticker + '_' + currencyTo.ticker, exchangeAmountCurrencyFrom)
                    .then(data => {
                        setExchangeAmountCurrencyTo(data.estimatedAmount);
                        console.log('data.estimatedAmount', data.estimatedAmount);
                    })
            }, 1000);
        }


    }, [exchangeAmountCurrencyFrom]);

    const handleExchangeAmountCurrencyFrom = (e) => {
        setExchangeAmountCurrencyFrom(e.target.value)
    };
    const handleExchangeAmountCurrencyTo = (e) => {
        setExchangeAmountCurrencyTo(e.target.value)
    };

    const swapCurrencies = () => {
        setCurrencyFrom(currencyTo);
        setCurrencyTo(currencyFrom);
    };

    const createExchange = () => {
      console.log(currencyFrom.ticker, currencyTo.ticker)
    };

    const isInputValid = () => {
        return exchangeAmountCurrencyFrom >= minimalExchangeAmount;
    };

    const doExchange = () => {
      if (isInputValid()) {
          createExchange();
      } else {
          setExchangeAmountCurrencyFrom('-');
          setError('wrong amount!');
      }
    };

    return <React.StrictMode>
        <h1>Crypto Exchange</h1>
        <h2>Exchange fast and easy</h2>
        {from_to}
        <div className="d-flex">
            <CurrencyExchangeComp setCurrency={setCurrencyFrom}
                                  selectedCurrency={currencyFrom}
                                  setExchangeAmount={handleExchangeAmountCurrencyFrom}
                                  currencyArray={currencyArray}
                                  exchangeAmountCurrency={exchangeAmountCurrencyFrom}
            />
            <ButtonComp label={'change'} callback={swapCurrencies}/>
            <CurrencyExchangeComp setCurrency={setCurrencyTo}
                                  selectedCurrency={currencyTo}
                                  setExchangeAmount={handleExchangeAmountCurrencyTo}
                                  exchangeAmountCurrency={exchangeAmountCurrencyTo}
                                  currencyArray={currencyArray}/>
        </div>
        <Form.Label className='w-100 fs-2 text-center fw-bolder'>Your Ethereum address</Form.Label>
        <div className={'d-flex'}>

            <Form.Control
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />
            <ButtonComp label={'exchange'} callback={doExchange}/>
            {error && <div>{error}</div>}
        </div>
        {/*<ButtonsComp/>*/}
    </React.StrictMode>
};

export default App;
