import React from 'react';
import './Favorites.css';

import { useSelector } from 'react-redux';
import FavoriteList from '../../components/FavoritesList/FavoritesList';
import BackgroundContainer from '../../components/UI/BackgroundContainer/BackgroundContainer';

const Favorites = () => {
  const weather = useSelector(state => state.weather);
  const application = useSelector(state => state.application);

  return (
    <BackgroundContainer
      containerClass="favorites-container"
      allowNightMode={application.allowNightMode}
      isDayTime={weather.currentWeather.isDayTime}
    >
      <FavoriteList
        favoriteList={weather.favoriteLocationsForecasts}
        temperatureUnit={application.temperatureUnit}
      />
    </BackgroundContainer>
  );
};

export default Favorites;
