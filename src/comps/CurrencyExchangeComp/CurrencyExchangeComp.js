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
    return <div>
        <InputGroup className="mb-3">
            <Form.Control
                placeholder=""
                readOnly={isLoading || !setExchangeAmount}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={setExchangeAmount}
                value={exchangeAmountCurrency || ''}
            />
            <Dropdown>
                <Dropdown.Toggle className='d-flex' id="dropdown-basic">
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