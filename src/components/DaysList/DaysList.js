import React from 'react';

import DayItem from './DayItem/DayItem';
import { Row } from 'react-bootstrap';
import './DayList.css';

const DaysList = props => {
  return (
    <Row className="days-list">
      {props.current5DaysLocationsForecasts
        ? props.current5DaysLocationsForecasts.map(day => (
            <DayItem
              key={day.date}
              date={day.date}
              minTemperature={day.minTemperature}
              maxTemperature={day.maxTemperature}
              unitType={day.unitType}
              weatherIcons={day.weatherIcons}
              currentUnitTemp={props.currentUnitTemp}
              weatherIcon={
                props.isDayTime ? day.dayWeatherIcon : day.nightWeatherIcon
              }
            />
          ))
        : null}
    </Row>
  );
};

export default DaysList;
