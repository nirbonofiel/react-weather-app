import * as actionType from '../actionTypes';
import { DailyForcast, Temperature, CurrentWeather } from '../../models/models';
import { celsiusToFahrenheit } from '../../shared/utility';

const initialState = {
  currentWeather: null,
  searchLocation: { id: '215854', name: 'Tel-Aviv' },
  items: [],
  favoriteLocationsForecasts: [],
  current5DaysLocationsForecasts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FIVE_DAY_DAILY_FORCAST_SUCCESS:
      const fiveDaysForecasts = action.payload.dailyForecasts.map(day => {
        const dayMap = new DailyForcast(
          day.Date,
          day.Day.Icon,
          day.Night.Icon,
          day.Temperature.Minimum.Unit,
          [
            new Temperature('C', day.Temperature.Maximum.Value),
            new Temperature(
              'F',
              celsiusToFahrenheit(day.Temperature.Maximum.Value)
            )
          ],
          [
            new Temperature('C', day.Temperature.Minimum.Value),
            new Temperature(
              'F',
              celsiusToFahrenheit(day.Temperature.Minimum.Value)
            )
          ]
        );
        return dayMap;
      });
      return {
        ...state,
        current5DaysLocationsForecasts: fiveDaysForecasts
      };
    case actionType.CURRENT_WEATHER_BY_LOCATION_SUCCESS:
      const locationsIndex = state.favoriteLocationsForecasts.findIndex(
        x => x.id === state.searchLocation.id
      );
      let isFavorite = false;
      if (locationsIndex !== -1) {
        isFavorite = true;
      }

      const currentweather = new CurrentWeather(
        state.searchLocation.id,
        state.searchLocation.name,
        isFavorite,
        action.payload.text,
        action.payload.icon,
        action.payload.isDayTime,
        [
          new Temperature('C', action.payload.temperature.Metric.Value),
          new Temperature('F', action.payload.temperature.Imperial.Value)
        ]
      );

      return {
        ...state,
        currentWeather: currentweather
      };
    case actionType.LOCATION_AUTOCOMPLATE_SUCCESS:
      return {
        ...state,
        items: action.payload.items
      };
    case actionType.LOCATION_AUTOCOMPLATE_SELECTED:
      return {
        ...state,
        searchLocation: { ...action.payload }
      };

    case actionType.TOGGLE_FAV:
      const locationsForecastsIndex = state.favoriteLocationsForecasts.findIndex(
        x => x.id === state.currentWeather.id
      );
      const newFavStatus = !state.currentWeather.isFavorite;
      const newCurrentLocationForecasts = { ...state.currentWeather };
      newCurrentLocationForecasts.isFavorite = newFavStatus;
      let updatedFavoriteLocations = [...state.favoriteLocationsForecasts];
      if (locationsForecastsIndex === -1) {
        updatedFavoriteLocations = state.favoriteLocationsForecasts.concat(
          newCurrentLocationForecasts
        );
      } else {
        updatedFavoriteLocations.splice(locationsForecastsIndex, 1);
      }
      return {
        ...state,
        favoriteLocationsForecasts: updatedFavoriteLocations,
        currentWeather: newCurrentLocationForecasts
      };
    default:
      return state;
  }
};

export default reducer;
