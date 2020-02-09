export const celsiusToFahrenheit = celsius => {
  let currTemp = celsius;
  currTemp = toFahrenheit(celsius);

  return Math.round(currTemp);
};

const toFahrenheit = celsius => (celsius * 9) / 5 + 32;
