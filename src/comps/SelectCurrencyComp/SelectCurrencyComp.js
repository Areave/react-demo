import React from 'react';
import Button from 'react-bootstrap/Button';
import './SelectCurrencyCompStyle.scss'

const SelectCurrencyComp = ({name, ticker, image, onClick}) => {
    return <div className='select_currency d-flex' onClick={onClick}>
        <img className='select_currency_item img' src={image}/>
        <div className='select_currency_item ticker text-truncate'>{ticker}</div>
        <div className='select_currency_item name text-truncate'>{name}</div>
    </div>
};

export default SelectCurrencyComp;