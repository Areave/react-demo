import React from 'react';
import './button.scss';

export const Button = ({label, callback}) => {

    return <button className='buttonn' onClick={callback}>{label}</button>
};