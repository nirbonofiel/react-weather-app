import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../../store/actionTypes';
import Switch from '../Switch/Switch';

import './Layout.css';

const Layout = props => {
  const weather = useSelector(state => state.weather);
  const application = useSelector(state => state.application);
  const dispatch = useDispatch();

  let backgroundColor = 'light';
  let nightModeSwitchType = '☀️';

  if (application.allowNightMode) {
    nightModeSwitchType = '🌙';
    if (weather.currentWeather != null && !weather.currentWeather.isDayTime)
      backgroundColor = 'dark';
  }

  const onChangeUnitHandler = () => {
    dispatch({
      type: actionType.CHANGE_TEMPERATURE_UNIT
    });
  };

  const onChangeModeHandler = () => {
    dispatch({
      type: actionType.ALLOW_NIGHT_MOOD
    });
  };

  return (
    <div>
      <Navbar bg={backgroundColor} expand="lg">
        <Navbar.Brand>Weather-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Switch
              changed={onChangeUnitHandler}
              switchType={application.temperatureUnit + '°'}
            />
            <Switch
              changed={onChangeModeHandler}
              switchType={nightModeSwitchType}
              disabled={
                weather.currentWeather !== null
                  ? weather.currentWeather.isDayTime
                  : false
              }
              tooltipText="Available only at night time"
            />
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/favorites">
              Favorite
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
