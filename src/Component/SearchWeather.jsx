import React from "react";
import SpinnerLogo from "../spinner.gif";

function SearchWeather() {
  const [cityName, setCityName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [weatherData, setWeatherData] = React.useState([]);

  const makeApiCall = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const rawResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const rawJson = await rawResponse.json();
      setWeatherData(rawJson?.list || []);
      if (rawJson.message) {
        alert(rawJson.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [cityName]);

  const onSubmit = React.useCallback(() => {
    if (cityName.trim() !== "") {
      makeApiCall();
    } else {
      alert("Please provide a valid city name");
    }
  }, [cityName, makeApiCall]);

  const handleChange = React.useCallback((event) => {
    setCityName(event.target.value);
  }, []);

  return (
    <>
      <section className="header-section">
        <header className="header-text">Weather in your city</header>
        <div className="inputs">
          <input type="text" className="input-text" onChange={handleChange} />
          <button className="search-btn" onClick={onSubmit}>
            Search
          </button>
          {isLoading ? (
            <img src={SpinnerLogo} className="spinner" alt="Loading..." />
          ) : null}
        </div>
      </section>
      <section className="results-section">
        {weatherData.length
          ? Array.from({ length: 5 }, (_, i) => i * 8).map((key) => (
              <div key={key} className="weather-data">
                <div className="date">
                  Date: {new Date(weatherData[key].dt * 1000).toDateString()}
                </div>
                <div className="temp">
                  <p>Temperature</p>
                  <div className="temp-min-max">
                    <div className="flex">
                      <div className="inner-flex">
                        <p>Min</p>
                      </div>
                      <div className="inner-flex">
                        <p>Max</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="inner-flex">
                        <p>{weatherData[key].main.temp_min}</p>
                      </div>
                      <div className="inner-flex">
                        <p>{weatherData[key].main.temp_max}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="inner-flex">
                    <p>Pressure</p>
                  </div>
                  <div className="inner-flex">
                    <p>{weatherData[key].main.pressure}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="inner-flex">
                    <p>Humidity</p>
                  </div>
                  <div className="inner-flex">
                    <p>{weatherData[key].main.humidity}</p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </section>
    </>
  );
}

export default SearchWeather;
