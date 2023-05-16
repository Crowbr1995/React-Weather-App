import { useState, useEffect } from 'react';
import { capitalize, formatTemp, getWindDirection } from '../utils';

export const Overview = ({ data, unit, icon }) => {
  const [todayForecast, setTodayForecast] = useState(null);
  const [tonightForecast, setTonightForecast] = useState(null);
  const [tomorrowForecast, setTomorrowForecast] = useState(null);
  
  useEffect(() => {
    if (data) {
      const today = data.list[0];
      const tonight = data.list.find(
        (forecast) => new Date(forecast.dt_txt).getHours() === 6
      );
      const tomorrow = data.list.find(
        (forecast) => new Date(forecast.dt_txt).getHours() === 18
      );

      setTodayForecast(today);
      setTonightForecast(tonight);
      setTomorrowForecast(tomorrow);
    }
  }, [data]);

  return (
    <div className="Overview">
      <div className='today-overview'>
        <h3>Today</h3>
        {todayForecast && (
          <>
            <img src={`http://openweathermap.org/img/wn/${todayForecast.weather[0].icon}@4x.png`} alt={capitalize(todayForecast.weather[0].description)}></img>
            <h3>{formatTemp(todayForecast.main.temp, unit)}</h3>
            <div>      
              <p><span>{capitalize(todayForecast.weather[0].description)}</span></p>
              <p>Feels Like:<span>{formatTemp(todayForecast.main.temp, unit)}</span></p>
              <p>Precipitation: <span>{(todayForecast.pop * 100).toFixed(0)}%</span></p>
              <p>Wind: <span>{getWindDirection(todayForecast.wind.deg)} {(todayForecast.wind.speed * 2.23694).toFixed(0)} MPH</span></p>
            </div>
          </>
        )}
      </div>
      <div className='today-overview'>
        <h3>Tonight</h3>
        {tonightForecast && (
          <>
            <img src={`http://openweathermap.org/img/wn/${tonightForecast.weather[0].icon}@4x.png`} alt={capitalize(tonightForecast.weather[0].description)}></img>
            <h3>{formatTemp(tonightForecast.main.temp, unit)}</h3>
            <div>
              <p><span>{capitalize(tonightForecast.weather[0].description)}</span></p>
              <p>Feels Like: <span>{formatTemp(tonightForecast.main.feels_like, unit)}</span></p>
              <p>Precipitation: <span>{(tonightForecast.pop * 100).toFixed(0)}%</span></p>
              <p>Wind: <span>{getWindDirection(tonightForecast.wind.deg)} {(tonightForecast.wind.speed * 2.23694).toFixed(0)} MPH</span></p>
            </div>
          </>
        )}
      </div>
      <div className='today-overview'>
        <h3>Tomorrow</h3>
        {tomorrowForecast && (
          <>
            <img src={`http://openweathermap.org/img/wn/${tomorrowForecast.weather[0].icon}@4x.png`} alt={capitalize(tomorrowForecast.weather[0].description)}></img>
            <h3>{formatTemp(tomorrowForecast.main.temp, unit)}</h3>
            <div>
              <p><span>{capitalize(tomorrowForecast.weather[0].description)}</span></p>
              <p>Feels Like: <span>{formatTemp(tomorrowForecast.main.feels_like, unit)}</span></p>
              <p>Precipitation: <span>{(tomorrowForecast.pop * 100).toFixed(0)}%</span></p>
              <p>Wind: <span>{getWindDirection(tomorrowForecast.wind.deg)} {(tomorrowForecast.wind.speed * 2.23694).toFixed(0)} MPH</span></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}





