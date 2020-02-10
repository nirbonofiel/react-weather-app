import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../store/actionTypes';
import {
  fiveDaysofDailyForecasts,
  currentForecastByLocation
} from '../../services/homeAPIActions';

import './Home.css';
import DaysList from '../../components/DaysList/DaysList';
import { Spinner } from 'react-bootstrap';

import ErrorHandler from '../../components/UI/ErrorHandler/ErrorHandler';
import SearchBar from '../../components/Search/SearchBar';
import FavoriteContainer from '../../components/FavoriteContainer/FavoriteContainer';
import CurrentForecast from '../../components/CurrentForecast/CurrentForecast';
import BackgroundContainer from '../../components/UI/BackgroundContainer/BackgroundContainer';

const Home = () => {
  const weather = useSelector(state => state.weather);
  const application = useSelector(state => state.application);
  const dispatch = useDispatch();

  const toggleFavHandler = () => {
    dispatch({ type: actionType.TOGGLE_FAV });
  };

  useEffect(() => {
    dispatch(fiveDaysofDailyForecasts(weather.searchLocation.id));
    dispatch(currentForecastByLocation(weather.searchLocation.id));
  }, [dispatch, weather.searchLocation.id]);

  return (
    <div>
      <SearchBar items={weather.items} />
      {weather.currentWeather !== null ? (
        <BackgroundContainer
          containerClass="home-container"
          allowNightMode={application.allowNightMode}
          isDayTime={weather.currentWeather.isDayTime}
        >
          {application.errorMsg !== null ? (
            <ErrorHandler
              error={application.errorMsg}
              show={application.modalShow}
            />
          ) : null}
          <React.Fragment>
            <div className="header-container">
              <CurrentForecast
                temperature={weather.currentWeather.temperature}
                name={weather.currentWeather.name}
                weatherIcon={weather.currentWeather.icon}
                temperatureUnit={application.temperatureUnit}
              />
              <FavoriteContainer
                isFavorite={weather.currentWeather.isFavorite}
                clicked={toggleFavHandler}
              />
            </div>

            <div className="headline-text">
              {weather.currentWeather.weatherText}
            </div>

            <DaysList
              current5DaysLocationsForecasts={
                weather.current5DaysLocationsForecasts
              }
              currentUnitTemp={application.temperatureUnit}
              isDayTime={
                application.allowNightMode
                  ? weather.currentWeather.isDayTime
                  : true
              }
            />
          </React.Fragment>
        </BackgroundContainer>
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
    </div>
  );
};

export default Home;
