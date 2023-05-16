import { useState } from "react";
 
import { Overview } from "./Overview";
import { Daily } from "./Daily";

export const Forecast = ({ weatherData, data, unit, icon }) => {
    const [button, setButton] = useState('overview')

    const handleClick = (component) => {
        setButton(component)
    }

    return (
        <div className="Forecast">
            <div className="btn-container">
                <button onClick={() => handleClick('overview')}>Overview</button>
                <button onClick={() => handleClick('daily')}>Daily</button>
            </div>
            {button === "overview" && <Overview weatherData={weatherData} data={data} unit={unit} icon={icon}/>}
            {button === "daily" && <Daily weatherData={weatherData} data={data} unit={unit} />}
        </div>
    )
}