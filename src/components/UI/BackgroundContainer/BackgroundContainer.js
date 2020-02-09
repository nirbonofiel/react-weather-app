import React from 'react';
import { Container } from 'react-bootstrap';

import dayImage from '../../../assets/day_mood.jpg';
import nightImage from '../../../assets/night_mood.jpg';

const BackgroundContainer = props => {
  let imgUrl = !props.allowNightMode
    ? dayImage
    : !props.isDayTime
    ? nightImage
    : dayImage;

  return (
    <div
      style={{ backgroundImage: `url(${imgUrl})` }}
      className={props.containerClass}
    >
      <Container>{props.children}</Container>
    </div>
  );
};

export default BackgroundContainer;
