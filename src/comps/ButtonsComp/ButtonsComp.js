import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonsCompStyle.scss'
import apiService from "../../apiService";
import ButtonComp from "../ButtonComp/ButtonComp";

const ButtonsComp = ({}) => {

    const from_to = 'btc_bt24';
    const amount = '5';

    const callback1 = () => {
        apiService.getListOfAvailableCurrencies().then(res => console.log(res));
    };
    const callback2 = () => {
        apiService.getMinimalExchangeAmount(from_to)
            .then(res => {
                    console.log('no error from client, res ', res);
                }
            )
            .catch(e => {
                console.log(e.message)
            });
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
    return <div className={'d-flex'}>
        {buttonArray.map(dataset => <ButtonComp label={dataset.label} callback={dataset.callback}/>)}
    </div>
};

export default ButtonsComp;