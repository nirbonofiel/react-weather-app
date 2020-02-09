import React from 'react';
import './FavoriteContainer.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Button } from 'react-bootstrap';

const favoriteContainer = props => {
  return (
    <div>
      {props.isFavorite ? (
        <AiFillHeart
          color="red"
          height="1.5em"
          width="1.2em"
          className="fav-icon"
        />
      ) : (
        <AiOutlineHeart
          height="1.2em"
          width="1.5em"
          className="fav-icon"
          color="#f1f1f1"
        />
      )}
      <Button
        variant="outline-info"
        className="fav-btn"
        onClick={props.clicked}
      >
        {props.isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}
      </Button>
    </div>
  );
};

export default favoriteContainer;
