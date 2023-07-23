import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import apiService from './apiService'
import ButtonComp from "./comps/ButtonComp/ButtonComp";
import CurrencyExchangeComp from "./comps/CurrencyExchangeComp/CurrencyExchangeComp";
import './normalize.scss';
import {Form, InputGroup} from "react-bootstrap";



const from_to = 'btc_eth';
const amount = '5';


const App = () => {

    const [currencyFrom, setCurrencyFrom] = useState();
    const [currencyTo, setCurrencyTo] = useState();

    const callback1 = () => {
        apiService.getListOfAvailableCurrencies().then(res => console.log(res));
    };
    const callback2 = () => {
        apiService.getMinimalExchangeAmount(from_to).then(res => console.log(res));
    };
    const callback3 = () => {
        apiService.getEstimatedExchangeAmount(from_to, amount).then(res => console.log(res));
    };

    const buttonArray = [
        {
            callback: callback1,
            label: 'getCurrenciesUrl'
        },
        {
            callback: callback2,
            label: 'minimalExchangeAmountUrl'
        },
        {
            callback: callback3,
            label: 'estimatedAmountUrl'
        },
    ];
    return <React.StrictMode>
        <h1>Crypto Exchange</h1>
        <h2>Exchange fast and easy</h2>
        {currencyFrom && currencyTo ? currencyFrom.ticker + '_' + currencyTo.ticker : ''}
        <div className="d-flex">
            <CurrencyExchangeComp setCurrency={setCurrencyFrom} selectedCurrency={currencyFrom}/>
            <ButtonComp label={'change'} callback={()=>{}}/>
            <CurrencyExchangeComp setCurrency={setCurrencyTo} selectedCurrency={currencyTo}/>
        </div>
        <Form.Label className='w-100 fs-2 text-center fw-bolder'>Your Ethereum address</Form.Label>
        <div className={'d-flex'}>

            <Form.Control
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />
            <ButtonComp label={'exchange'} callback={()=>{}}/>
        </div>
        {buttonArray.map(dataset => <ButtonComp label={dataset.label} callback={dataset.callback}/>)}
    </React.StrictMode>
};

export default App;
