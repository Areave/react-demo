import React, {useState} from 'react';
import './CurrencyExchangeCompStyle.scss'
import {Form, InputGroup} from "react-bootstrap";
import ButtonComp from "../ButtonComp/ButtonComp";
import Dropdown from "react-bootstrap/Dropdown";
import CustomMenu from "../CustomMenu/CustomMenu";
import SelectCurrencyComp from "../SelectCurrencyComp/SelectCurrencyComp";

const CurrencyExchangeComp = ({selectedCurrency, setCurrency}) => {

    // const [selectedCurrency, setSelectedCurrency] = useState();

    const currencyArray = [
        {
            name: 'ethirium',
            ticker: 'ert',
            image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg'
        },
        {
            name: 'ethirium',
            ticker: 'ert',
            image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg'
        },
        {
            name: 'ethirium',
            ticker: 'ert',
            image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg'
        },
    ];

    return <div>
        {/*<input type="text"/>*/}
        {/*<Form.Group className="mb-3" controlId="formGroupEmail">*/}
        {/*    <Form.Label>Email address</Form.Label>*/}
        {/*    <Form.Control type="email" placeholder="Enter email" />*/}
        {/*</Form.Group>*/}
        <InputGroup className="mb-3">
            <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />

            <Dropdown>
                <Dropdown.Toggle className='d-flex' id="dropdown-basic">
                    {selectedCurrency ? (
                        <SelectCurrencyComp
                            ticker={selectedCurrency.ticker.toUpperCase()}
                            image={selectedCurrency.image}/>
                    ) : (
                        <div>Chose currency</div>
                    )}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {currencyArray.map((currency, index) =>

                        <Dropdown.Item eventKey="index">
                            <SelectCurrencyComp
                                name={currency.name + ' ' + index}
                                ticker={currency.ticker.toUpperCase()}
                                image={currency.image}
                                onClick={() => {
                                    setCurrency(currency)
                            }}/></Dropdown.Item>
                    )}
                    {/*<Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
                    {/*<ButtonComp/>*/}
                    {/*<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
                    {/*<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                </Dropdown.Menu>
            </Dropdown>


            {/*<InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>*/}
            {/*<Form.Select aria-label="Default select example">*/}
            {/*    /!*{options}*!/*/}
            {/*    {options.map(Button => <option>*/}
            {/*        <h1>wefwf</h1>*/}
            {/*    </option>)}*/}
            {/*    /!*<option>Open this select menu</option>*!/*/}
            {/*    /!*<option value="1">One</option>*!/*/}
            {/*    /!*<option value="2">Two</option>*!/*/}
            {/*    /!*<option value="3">Three</option>*!/*/}
            {/*</Form.Select>*/}
        </InputGroup>
    </div>
};

export default CurrencyExchangeComp;