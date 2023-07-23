import React, {useState} from 'react';
import './CurrencyExchangeCompStyle.scss'
import {Form, InputGroup} from "react-bootstrap";
import ButtonComp from "../ButtonComp/ButtonComp";
import Dropdown from "react-bootstrap/Dropdown";
import CustomMenu from "../CustomMenu/CustomMenu";
import SelectCurrencyComp from "../SelectCurrencyComp/SelectCurrencyComp";
import Loader from "../Loader/Loader";

const CurrencyExchangeComp = ({selectedCurrency, setCurrency, currencyArray, setExchangeAmount, isInvalid, exchangeAmountCurrency, minimalExchangeAmount}) => {

    console.log('isInvalid',isInvalid);
    let hint = '';
    if (isInvalid && minimalExchangeAmount) {
        hint = minimalExchangeAmount;
    }

    const getValue = () => {
        // console.log('from getValue', isInvalid, exchangeAmountCurrencyFrom)
        // if (isInvalid) return '-';
        if (exchangeAmountCurrency) return exchangeAmountCurrency;
    };

    return <div>
        <InputGroup className="mb-3">
                <Form.Control
                    placeholder=""
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={setExchangeAmount}
                    value={getValue()}
                    // isInvalid={isInvalid}
                />
                <Dropdown>
                    <Dropdown.Toggle className='d-flex' id="dropdown-basic">
                        {selectedCurrency ? (
                            <SelectCurrencyComp
                                ticker={selectedCurrency.ticker.toUpperCase()}
                                image={selectedCurrency.image}/>
                        ) : (
                            currencyArray && currencyArray.length > 0 ? (
                                <div>Chose currency</div>
                            ) : (
                                <Loader/>
                            )
                        )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {currencyArray && currencyArray.map((currency, index) =>
                            <Dropdown.Item key={index + currency.ticker}>
                                <SelectCurrencyComp
                                    key={index + currency.ticker}
                                    name={currency.name + ' ' + index}
                                    ticker={currency.ticker.toUpperCase()}
                                    image={currency.image}
                                    onClick={() => {
                                        setCurrency(currency)
                                    }}/></Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>


        </InputGroup>
    </div>
};

export default CurrencyExchangeComp;