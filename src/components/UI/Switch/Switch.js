import React from 'react';
import './Switch.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Switch = props => {
  let className = 'switch-container';
  let disabledStyle = {};
  if (props.disabled) {
    className += ' disabled';
    disabledStyle = { pointerEvents: 'none', cursor: 'auto' };
  }
  return (
    <React.Fragment>
      <OverlayTrigger
        trigger="hover"
        arrowProps="none"
        placement="bottom"
        overlay={
          props.disabled ? (
            <Tooltip id="tooltip-disabled">{props.tooltipText}</Tooltip>
          ) : (
            <Tooltip style={{ display: 'none' }}></Tooltip>
          )
        }
      >
        <div className={className}>
          <input
            style={disabledStyle}
            onChange={props.changed}
            type="checkbox"
            readOnly={props.disabled}
          />
          <div>
            <span className="slide">{props.switchType}</span>
          </div>
        </div>
      </OverlayTrigger>
    </React.Fragment>
  );
};

export default Switch;
