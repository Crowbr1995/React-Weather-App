import { useState, useEffect } from 'react';
import axios from 'axios';

import { formatIcon, formatTemp } from './utils';

import './App.css';
import { Search } from './components/Search';
import { WeatherData } from './components/WeatherData';
import { Forecast } from './components/Forecast';

function App() {
  const [city, setCity] = useState('Los Angeles');
  const [cityState, setCityState] = useState('');

  const [weatherData, setWeatherData] = useState(null);
  const [foreCastData, setForeCastData] = useState(null)
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true)

  const [unit, setUnit] = useState('Fahrenheit');
  const [temp, setTemp] = useState(null); 
  const [icon, setIcon] = useState(null);

  const API_KEY = '88b3b251046e057d50e5c6a605ddacce';

  const handleCity = (city) => {
    setCity(city);
  };

  const handleUnit = (unit) => {
    setUnit(unit);
  }

  const getState = async (data) => {
    const apiKey = '6811c48ff0524d0b8cb8edc1fc4f2f2a';
    const city = data.name;
    const countryCode = data.sys.country;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city},${countryCode}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const state = response.data.results[0]?.components?.state;
      setCityState(state);
      setCoordinates([data.coord.lat, data.coord.lon]);
      
    } catch (error) {
      console.error(error);
    }
      setLoading(false)
  };
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then((response) => {
        console.log(response.data);
        setWeatherData(response.data);
        getState(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, [API_KEY, city]);

  useEffect(() => {
    async function fetchData() {
      if (coordinates) { 
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${API_KEY}`);
          console.log(response.data);
          setForeCastData(response.data);
          getState(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [API_KEY, coordinates]);

  return (
    <div className="App">
      <Search findCity={handleCity} handleUnit={handleUnit}/>
      {weatherData && <WeatherData weatherData={weatherData} cityState={cityState} formatTemp={formatTemp} unit={unit} loading={loading}/>}
      {weatherData && <Forecast weatherData={weatherData} data={foreCastData} formatTemp={formatTemp} unit={unit} />}
    </div>
  );
}

export default App;

