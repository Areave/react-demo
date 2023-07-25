import React from 'react';
import './CurrencyExchangeCompStyle.scss'
import {Form, InputGroup} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import SelectCurrencyComp from "../SelectCurrencyComp/SelectCurrencyComp";
import Loader from "../Loader/Loader";

const CurrencyExchangeComp = ({selectedCurrency,
                                  setCurrency,
                                  currencyArray,
                                  setExchangeAmount,
                                  exchangeAmountCurrency,
                                  isLoading}) => {
    return <InputGroup className="currency_input px-md-3">
            <Form.Control
                placeholder=""
                readOnly={isLoading || !setExchangeAmount}
                onChange={setExchangeAmount}
                value={exchangeAmountCurrency || ''}
            />
            <Dropdown className='currency_dropdown_container'>
                <Dropdown.Toggle className='currency_dropdown d-flex' id="dropdown-basic"
                                 drop={'down-centered'}>
                    {selectedCurrency ? (
                        <SelectCurrencyComp
                            ticker={selectedCurrency.ticker.toUpperCase()}
                            image={selectedCurrency.image}/>
                    ) : (
                        isLoading ? (
                            <Loader/>
                        ) : (
                            <div>Chose currency</div>
                        )
                    )}
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdown-menu-container'>
                    {currencyArray && currencyArray.map((currency, index) =>
                        <Dropdown.Item className='currencies_container' key={index + currency.ticker}>
                            <SelectCurrencyComp
                                key={index + currency.ticker}
                                name={currency.name}
                                ticker={currency.ticker.toUpperCase()}
                                image={currency.image}
                                onClick={() => {
                                    setCurrency(currency)
                                }}/></Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </InputGroup>
};

export default CurrencyExchangeComp;