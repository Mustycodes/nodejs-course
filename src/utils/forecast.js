const request = require("postman-request");

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9d1b8f9c740138d60e971ab2fb7395b5&query=${address}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to fetch forecast data. Please try again later",
        undefined
      );
    } else if (body.error) {
      callback(
        "Unable to get location. Please confirm address and try again",
        undefined
      );
    } else {
      const { name, region, country } = body.location;
      const { feelslike, weather_descriptions, temperature } = body.current;
      callback(undefined, {
        name,
        feelslike,
        region,
        country,
        weather_descriptions,
        temperature,
      });
    }
  });
};

module.exports = forecast;
