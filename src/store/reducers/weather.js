import * as actionType from '../actionTypes';
import { DailyForcast, Temperature, CurrentWeather } from '../../models/models';
import { celsiusToFahrenheit } from '../../shared/utility';

const initialState = {
  // currentWeather: null,
  searchLocation: { id: '215854', name: 'Tel-Aviv' },
  items: [],
  currentWeather: {
    id: '215854',
    name: 'Tel-Aviv',
    isFavorite: false,
    weatherText: 'Sunny',
    icon: 1,
    isDayTime: false,
    temperature: [
      {
        unit: 'C',
        value: 20.1
      },
      {
        unit: 'F',
        value: 68
      }
    ]
  },
  favoriteLocationsForecasts: [],
  current5DaysLocationsForecasts: [
    {
      date: '2020-02-05T07:00:00+02:00',
      dayWeatherIcon: 1,
      nightWeatherIcon: 33,
      unitType: 'C',
      maxTemperature: [
        {
          unit: 'C',
          value: 20.7
        },
        {
          unit: 'F',
          value: 69
        }
      ],
      minTemperature: [
        {
          unit: 'C',
          value: 13.2
        },
        {
          unit: 'F',
          value: 56
        }
      ]
    },
    {
      date: '2020-02-06T07:00:00+02:00',
      dayWeatherIcon: 2,
      nightWeatherIcon: 40,
      unitType: 'C',
      maxTemperature: [
        {
          unit: 'C',
          value: 22.3
        },
        {
          unit: 'F',
          value: 72
        }
      ],
      minTemperature: [
        {
          unit: 'C',
          value: 12.5
        },
        {
          unit: 'F',
          value: 55
        }
      ]
    },
    {
      date: '2020-02-07T07:00:00+02:00',
      dayWeatherIcon: 3,
      nightWeatherIcon: 18,
      unitType: 'C',
      maxTemperature: [
        {
          unit: 'C',
          value: 15.9
        },
        {
          unit: 'F',
          value: 61
        }
      ],
      minTemperature: [
        {
          unit: 'C',
          value: 10.4
        },
        {
          unit: 'F',
          value: 51
        }
      ]
    },
    {
      date: '2020-02-08T07:00:00+02:00',
      dayWeatherIcon: 13,
      nightWeatherIcon: 39,
      unitType: 'C',
      maxTemperature: [
        {
          unit: 'C',
          value: 14.8
        },
        {
          unit: 'F',
          value: 59
        }
      ],
      minTemperature: [
        {
          unit: 'C',
          value: 10.2
        },
        {
          unit: 'F',
          value: 50
        }
      ]
    },
    {
      date: '2020-02-09T07:00:00+02:00',
      dayWeatherIcon: 4,
      nightWeatherIcon: 38,
      unitType: 'C',
      maxTemperature: [
        {
          unit: 'C',
          value: 13.3
        },
        {
          unit: 'F',
          value: 56
        }
      ],
      minTemperature: [
        {
          unit: 'C',
          value: 5.1
        },
        {
          unit: 'F',
          value: 41
        }
      ]
    }
  ]
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
