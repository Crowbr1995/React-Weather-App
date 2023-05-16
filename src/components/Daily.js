import { is } from 'immutable';
import { useState, useEffect } from 'react';
import { formatTemp, capitalize } from '../utils';

export const Daily = ({ data, weatherData, unit }) => {
  const [dailyForecasts, setDailyForecasts] = useState({});
  const [showHourly, setShowHourly] = useState({});

  useEffect(() => {
    const dailyForecasts = data.list.reduce((result, item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString();
      result[day] = result[day] || [];
      result[day].push(item);
      return result;
    }, {});

    setDailyForecasts(dailyForecasts);
  }, [data]);

  const getTemperatureRange = (hourlyForecasts) => {
    let minTemp = Infinity;
    let maxTemp = -Infinity;

    hourlyForecasts.forEach((hour) => {
      const temp = hour.main.temp;

      if (temp < minTemp) {
        minTemp = temp;
      }

      if (temp > maxTemp) {
        maxTemp = temp;
      }
    });

    return { minTemp, maxTemp };
  };

  const getDaytimeWeatherIcon = (hourlyForecasts) => {
    const daytimeForecasts = hourlyForecasts.filter((hour) => {
      const hourOfDay = new Date(hour.dt * 1000).getHours();
      return hourOfDay >= 6 && hourOfDay <= 18;
    });
  
    if (daytimeForecasts.length === 0) {
      return null;
    }
  
    const weatherIcons = daytimeForecasts.map((hour) => hour.weather[0].icon);
    const occurrences = {};
  
    weatherIcons.forEach((icon) => {
      occurrences[icon] = occurrences[icon] ? occurrences[icon] + 1 : 1;
    });
  
    const mostCommonIcon = Object.keys(occurrences).reduce((a, b) =>
      occurrences[a] > occurrences[b] ? a : b
    );
  
    return mostCommonIcon;
  };
  
  
  const toggleHourly = (day) => {
    setShowHourly((prevShowHourly) => ({
      ...prevShowHourly,
      [day]: !prevShowHourly[day]
    }));
  };
    

  return (
    <div>
      {Object.keys(dailyForecasts).map((day, index) => {
        const hourlyForecasts = dailyForecasts[day];
        const { minTemp, maxTemp } = getTemperatureRange(hourlyForecasts);
        const mostCommonWeatherIcon = getDaytimeWeatherIcon(hourlyForecasts);
        const isCurrentDay = index === 0; 
  
        return (
          <div key={day} className={`daily-container ${isCurrentDay ? 'current-day' : ''}`}>
            <div className="forecast-weekday" onClick={() => toggleHourly(day)}>
              <div className='daily-date'> 
                <h2>
                  {new Date(hourlyForecasts[0].dt * 1000).toLocaleString('en-US', { weekday: 'long' })}
                </h2>
                <p>{isCurrentDay ? 'Today' : day}</p> 
              </div>
              {mostCommonWeatherIcon ? (
                showHourly[day] ? (
                  <img
                    src={`http://openweathermap.org/img/wn/${mostCommonWeatherIcon}.png`}
                    alt="Most Common Weather"
                  />
                ) : (
                  <img
                    src={`http://openweathermap.org/img/wn/${mostCommonWeatherIcon}@2x.png`}
                    alt="Most Common Weather"
                  />
                )
              ) : (
                <img
                  src={isCurrentDay ? `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` : day}
                />
              )}
              <div className='daily-temp'>
                {isCurrentDay ? 
                <p>{formatTemp(weatherData.main.temp_max, unit)} / <span>{formatTemp(weatherData.main.temp_min, unit)}</span></p> :
                <p>{formatTemp(maxTemp, unit)} / <span>{formatTemp(minTemp, unit)}</span></p>}
              </div>
            </div>
            {showHourly[day] && (
              <div className="hourly-forecast">
                {hourlyForecasts.map((hour) => (
                  <div key={hour.dt} className="hourly-forecast-item">
                    <div className="hourly-time">
                      {new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' })}
                    </div>
                    <div>
                      <img
                        src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                        alt={hour.weather[0].description}
                      />
                    </div>
                    <div className='hourly-percent'>{(hour.pop * 100).toFixed(0)}%</div>
                    <div className='hourly-temp'>{formatTemp(hour.main.temp, unit)}</div>
                    <div className='hourly-desc'>{capitalize(hour.weather[0].description)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
    }  