import React from 'react';

import './DayItem.css';
import { Col } from 'react-bootstrap';

const DayItem = props => {
  const dayName = new Date(props.date.toString());
  const options = { weekday: 'short' };
  const imgSrc = require(`../../../assets/WeatherIcons/${props.weatherIcon}.png`);

  let temperature = null;
  let maxTemperature = null;
  let minTemperature = null;

  maxTemperature = props.maxTemperature.find(
    t => t.unit === props.currentUnitTemp
  );
  minTemperature = props.minTemperature.find(
    t => t.unit === props.currentUnitTemp
  );
  temperature = (
    <div>
      <span style={{ fontSize: '18px' }}>{maxTemperature.value}°</span>/
      <span style={{ fontSize: '15px' }}>
        {minTemperature.value}°{maxTemperature.unit}
      </span>
    </div>
  );

  return (
    <Col xs={2} className="day-item">
      <div className="title">
        <img src={imgSrc} alt="item-weather-icon" />
        <span>{dayName.toLocaleDateString('en-US', options)}</span>
      </div>
      {temperature}
    </Col>
  );
};

export default DayItem;
