import React from 'react';
import './Switch.css';

const Switch = props => {
  return (
    <div>
      <div className="switch-container">
        <input onChange={props.changed} type="checkbox" />
        <div>
          <span className="slide">{props.switchType}</span>
        </div>
      </div>
    </div>
  );
};

export default Switch;
