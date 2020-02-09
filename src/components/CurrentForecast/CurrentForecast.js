import React from 'react';
import './CurrentForecast.css';

const CurrentForecast = props => {
  const imgSrc = require(`../../assets/WeatherIcons/${props.weatherIcon}.png`);

  const currentTemperature = props.temperature.find(
    t => t.unit === props.temperatureUnit
  );

  return (
    <div>
      <span className="title text-white">
        <img src={imgSrc} alt="current-weather-icon" />
        <span>{props.name}</span>
      </span>
      <span className="temp text-white">
        {currentTemperature.value}°{currentTemperature.unit}
      </span>
    </div>
  );
};

export default CurrentForecast;
