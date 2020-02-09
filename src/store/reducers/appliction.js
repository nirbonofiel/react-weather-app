import * as actionType from '../actionTypes';

const initialState = {
  errorMsg: null,
  modalShow: false,
  allowNightMode: false,
  temperatureUnit: 'C'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ERROR_HANDLER:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
        modalShow: true
      };
    case actionType.HIDE_MODAL_ERROR:
      return {
        ...state,
        errorMsg: null,
        modalShow: false
      };
    case actionType.CHANGE_TEMPERATURE_UNIT:
      let currTemp = '';
      if (state.temperatureUnit === 'C') {
        currTemp = 'F';
      } else {
        currTemp = 'C';
      }
      return {
        ...state,
        temperatureUnit: currTemp
      };
    case actionType.ALLOW_NIGHT_MOOD:
      let nightMood = !state.allowNightMode;
      return {
        ...state,
        allowNightMode: nightMood
      };
    default:
      return state;
  }
};

export default reducer;
