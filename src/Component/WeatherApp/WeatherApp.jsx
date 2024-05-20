import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [cityName, setCityName] = useState('');
  const [finalData, setFinalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before starting the fetch
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b19389eb3865f1c8ce0a8b8422240d42&units=metric`)
      .then((res) => res.json())
      .then((finalres) => {
        console.log(finalres);
        setFinalData(finalres);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching the weather data:', error);
        setLoading(false); // Set loading to false in case of error
      });

    setCityName('');
  };

  return (
    <>
      <div className='searchBar'>
        <h1>Weather App</h1>
        <form className='takeInput' onSubmit={getData}>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      
      <div className='menuBar'>
        {loading ? (
          <img src="https://i.gifer.com/ZZ5H.gif" />
        ) : finalData ? (
          <>
            <h1>{finalData.name}</h1>
            <h2>{finalData.main.temp}°C</h2>
            <img
              src={`https://openweathermap.org/img/w/${finalData.weather[0].icon}.png`}
              alt={finalData.weather[0].description}
            />
            <h3>{finalData.weather[0].description}</h3>
          </>
        ) : (
          "NO DATA"
        )}
      </div>
    </>
  );
};

export default WeatherApp;
