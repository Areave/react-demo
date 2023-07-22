import React from "react";
import {Button} from "./comps/button";
import axios from 'axios'

const from_to = 'btc_eth';
const amount = '5';

const apiKey = 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd';
const getCurrenciesUrl = 'https://api.changenow.io/v1/currencies?active=true&fixedRate=true';
const minimalExchangeAmountUrl = `https://api.changenow.io/v1/min-amount/${from_to}?api_key=${apiKey}`;
const estimatedAmountUrl = `https://api.changenow.io/v1/exchange-amount/${amount}/${from_to}/?api_key=${apiKey}`;
const App = () => {

    const callback1 = () => {
        axios.get(getCurrenciesUrl).then(res => console.log(res.data));
    };
    const callback2 = () => {
        axios.get(minimalExchangeAmountUrl).then(res => console.log(res.data));
    };
    const callback3 = () => {
        axios.get(estimatedAmountUrl).then(res => console.log(res.data));
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
        <div>hello pidory</div>
        {buttonArray.map(dataset => <Button label={dataset.label} callback={dataset.callback}/>)}
    </React.StrictMode>
};

export default App;
