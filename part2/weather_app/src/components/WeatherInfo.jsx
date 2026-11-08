const WeatherInfo = ({ weatherData, capitalName }) => {
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/payload/api/media/file/${iconCode}.png`;
  };

  if (weatherData === null) {
    return null;
  } else {
    return (
      <>
        <h3>Weather in {capitalName}</h3>
        <p>Temperature {weatherData.main.temp} Celisius</p>
        <img
          src={getWeatherIcon(weatherData.weather[0].icon)}
          alt={weatherData.weather[0].description}
        />
        <p>Wind {weatherData.wind.speed} m/s</p>
      </>
    );
  }
};

export default WeatherInfo;
