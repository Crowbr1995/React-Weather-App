import { useState, useEffect } from 'react';
import { capitalize, formatTemp, getWindDirection } from '../utils';

export const WeatherData = ({ weatherData, cityState, unit }) => {

  return (
    <div className="WeatherData">
      <div className='location-container'>
          <h2>{weatherData.name}, {cityState}</h2>
          <p>
            {new Date().toLocaleString('en-US', { weekday: 'long' })}
            , {new Date().toLocaleDateString('en-US')}
          </p>
      </div>
      <div className='today-forecast'>
        <div className='today-main'>
          <div>
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} alt={capitalize(weatherData.weather[0].description)}></img>
          </div>
          <div>
            <p className='temp-main'>{formatTemp(weatherData.main.temp, unit)}</p>
            <p className='temp-min-max'>{formatTemp(weatherData.main.temp_max, unit)} / <span>{formatTemp(weatherData.main.temp_min, unit)}</span></p>
            <p>{capitalize(weatherData.weather[0].description)}</p>
          </div>
        </div>
        <div className='today-detailed'>
          <div>
            <p>Feels Like: <span>{formatTemp(weatherData.main.feels_like, unit)}</span></p>
          </div>
          <div>
            <p>Humidity: <span>{weatherData.main.humidity}%</span></p>
          </div>
          <div>
            <p>Wind: <span>{getWindDirection(weatherData.wind.deg)} {(weatherData.wind.speed * 2.23694).toFixed(0)} MPH</span></p>
          </div>
          <div>
            <p>Pressure: <span>{weatherData.main.pressure}</span></p>
          </div>
        </div>    
      </div>
    </div>
  );
};


