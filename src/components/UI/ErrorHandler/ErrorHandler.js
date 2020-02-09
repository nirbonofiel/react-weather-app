import React from 'react';
import { useDispatch } from 'react-redux';
import * as actionType from '../../../store/actionTypes';

import { Modal } from 'react-bootstrap';
import './ErrorHandler.css';

const ErrorHandler = props => {
  const dispatch = useDispatch();
  const onHideModalHandler = () => {
    dispatch({ type: actionType.HIDE_MODAL_ERROR });
  };

  return (
    <Modal show={props.show} onHide={onHideModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.error}</Modal.Body>
    </Modal>
  );
};

export default ErrorHandler;
