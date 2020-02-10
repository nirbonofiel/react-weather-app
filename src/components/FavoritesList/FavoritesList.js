import React from 'react';
import './FavoritesList.css';

import { Row } from 'react-bootstrap';
import FavoriteItem from './FavoriteItem/FavoriteItem';

const FavoriteList = props => {
  let content = <p className="placeholder">No favorites yet!</p>;
  if (props.favoriteList.length > 0) {
    content = props.favoriteList.map(fav => (
      <FavoriteItem
        key={fav.id}
        name={fav.name}
        temperature={fav.temperature}
        temperatureUnit={props.temperatureUnit}
        weatherIcon={fav.icon}
        weatherDescription={fav.weatherText}
      />
    ));
  }

  return <Row className="favorites-list">{content}</Row>;
};

export default FavoriteList;
