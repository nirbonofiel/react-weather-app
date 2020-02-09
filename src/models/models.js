export class CurrentWeather {
  id = null;
  name = null;
  isFavorite = null;
  weatherText = null;
  icon = null;
  isDayTime = null;
  temperature = null;

  constructor(
    _id,
    _name,
    _isFavorite,
    _weatherText,
    _icon,
    _isDayTime,
    _temperature
  ) {
    this.id = _id;
    this.name = _name;
    this.isFavorite = _isFavorite;
    this.weatherText = _weatherText;
    this.icon = _icon;
    this.isDayTime = _isDayTime;
    this.temperature = _temperature;
  }
}

export class DailyForcast {
  date = null;
  dayWeatherIcon = null;
  nightWeatherIcon = null;
  unitType = null;
  maxTemperature = null;
  minTemperature = null;

  constructor(
    _date,
    _dayWeatherIcon,
    _nightWeatherIcon,
    _unitType,
    _maxTemperature,
    _minTemperature
  ) {
    this.date = _date;
    this.dayWeatherIcon = _dayWeatherIcon;
    this.nightWeatherIcon = _nightWeatherIcon;
    this.unitType = _unitType;
    this.maxTemperature = _maxTemperature;
    this.minTemperature = _minTemperature;
  }
}

export class Temperature {
  unit = null;
  value = null;

  constructor(_unit, _value) {
    this.unit = _unit;
    this.value = _value;
  }
}
