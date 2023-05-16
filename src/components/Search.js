import { useState } from 'react';

export const Search = (props) => {
    const [unit, setUnit] = useState('Fahrenheit');
    const [value, setValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        props.findCity(value);
    }

    const sendUnit = (unit) => {
        setUnit(unit)
        props.handleUnit(unit);
    }

    return (
        <form className="Search" onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setValue(e.target.value)}></input>
            <button className="submit-btn" type="submit">Search</button>
            <button
                className={unit === 'Fahrenheit' ? 'taken' : 'd-btn'}
                onClick={() => sendUnit('Fahrenheit')}>
                °F
            </button>
            <button
                className={unit === 'Celsius' ? 'taken' : 'd-btn'}
                onClick={() => sendUnit('Celsius')}>
                °C
            </button>
        </form>
    )
}
