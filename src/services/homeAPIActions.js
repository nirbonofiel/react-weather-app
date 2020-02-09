import AccuWeather from '../api/AccuWeather';
import * as actionType from '../store/actionTypes';

const API_KEY = 'AbUFYnKsYm9f0fjs58Muc5yKL805whpG';

export const searchApi = value => {
  return dispatch => {
    AccuWeather.get('/locations/v1/cities/autocomplete', {
      params: {
        apikey: API_KEY,
        q: value,
        details: false,
        language: 'en-us'
      }
    })
      .then(res => dispatch(locationAutocomplateSuccess(res)))
      .catch(err => dispatch(errorHandler('Something went wrong')));
  };
};

export const fiveDaysofDailyForecasts = locationId => {
  return dispatch => {
    AccuWeather.get('/forecasts/v1/daily/5day/' + locationId, {
      params: {
        apikey: API_KEY,
        language: 'en-us',
        metric: true
      }
    })
      .then(res => dispatch(fiveDaysofDailyForecastsSuccess(res)))
      .catch(err => dispatch(errorHandler('Something went wrong')));
  };
};

export const currentForecastByLocation = locationId => {
  return dispatch => {
    AccuWeather.get('/currentconditions/v1/' + locationId, {
      params: {
        apikey: API_KEY,
        language: 'en-us'
      }
    })
      .then(res => dispatch(currentForecastByLocationSuccess(res)))
      .catch(err => dispatch(errorHandler('Something went wrong')));
  };
};

const locationAutocomplateSuccess = res => {
  return {
    type: actionType.LOCATION_AUTOCOMPLATE_SUCCESS,
    payload: { items: res.data }
  };
};

const currentForecastByLocationSuccess = res => {
  return {
    type: actionType.CURRENT_WEATHER_BY_LOCATION_SUCCESS,
    payload: {
      icon: res.data[0].WeatherIcon,
      temperature: res.data[0].Temperature,
      text: res.data[0].WeatherText,
      isDayTime: res.data[0].IsDayTime
    }
  };
};

const fiveDaysofDailyForecastsSuccess = res => {
  return {
    type: actionType.FIVE_DAY_DAILY_FORCAST_SUCCESS,
    payload: {
      dailyForecasts: res.data.DailyForecasts
    }
  };
};

const errorHandler = errorMsg => {
  return {
    type: actionType.ERROR_HANDLER,
    payload: { errorMsg: errorMsg }
  };
};
