import React from 'react';
import './FavoriteItem.css';
import { Col } from 'react-bootstrap';

const FavoriteItem = props => {
  const imgSrc = require(`../../../assets/WeatherIcons/${props.weatherIcon}.png`);
  const currentTemperature = props.temperature.find(
    t => t.unit === props.temperatureUnit
  );

  return (
    <Col xs={2} className="favorite-item">
      <div className="title-name">{props.name}</div>
      <div className="description">{props.weatherDescription}</div>
      <img src={imgSrc} alt="favorite-weather-icon" />
      <div>
        <span style={{ fontSize: '30px' }}>
          {currentTemperature.value}°{currentTemperature.unit}
        </span>
      </div>
    </Col>
  );
};

export default FavoriteItem;
