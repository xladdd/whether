import { Search } from "./components/search/search";
import { CurrentWeather } from "./components/descriptive/current-weather";
import { DayForecast } from "./components/forecast/day-forecast";
import { WeekForecast } from "./components/forecast/week-forecast";
import { Section } from "./components/descriptive/section";
import { Bottom } from "./components/descriptive/bottom";
import { WEATHER_API_URL, WEATHER_API_KEY, ONECALL_API_URL } from "./api";
import { useEffect, useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetch(
      "https://ipgeolocation.abstractapi.com/v1/?api_key=c2d0e55bff5643fa846b3a5574ace44f"
    )
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed!");
        },
        (networkError) => console.log(networkError.message)
      )
      .then((jsonResponse) => {
        const lat = jsonResponse.latitude;
        const lon = jsonResponse.longitude;
        const cityName = `${jsonResponse.city}, ${jsonResponse.country_code}`;
        const currentWeatherFetch = fetch(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const forecastFetch = fetch(
          `${ONECALL_API_URL}/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        Promise.all([currentWeatherFetch, forecastFetch])
          .then(async (response) => {
            const weatherResponse = await response[0].json();
            const forecastResponse = await response[1].json();

            setCurrentWeather({ city: cityName, ...weatherResponse });
            setForecast({ city: cityName, ...forecastResponse });
          })
          .catch((err) => console.log(err));
      });
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${ONECALL_API_URL}/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);

  return (
    <div className="container">
      {currentWeather && <Search onSearchChange={handleOnSearchChange} />}
      {currentWeather && (
        <CurrentWeather data={currentWeather} data2={forecast} />
      )}
      {forecast && <DayForecast data={forecast} />}
      {forecast && <Section data={forecast} />}
      {forecast && <WeekForecast data={forecast} />}
      {forecast && <Bottom data={forecast} />}
      {forecast && (
        <div className="footer">
          <p>
            <a href="https://frolov.cz/">Vlad made this</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
