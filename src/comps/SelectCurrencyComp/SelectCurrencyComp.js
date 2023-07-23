import React from 'react';
import Button from 'react-bootstrap/Button';
import './SelectCurrencyCompStyle.scss'

const SelectCurrencyComp = ({name, ticker, image, onClick}) => {
    return <div className='d-flex' onClick={onClick}>
        <img src={image}/>
        <div>{ticker}</div>
        <div>{name}</div>
    </div>
};

export default SelectCurrencyComp;