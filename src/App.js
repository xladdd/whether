import { Search } from "./components/search/search";
import { CurrentWeather } from "./components/descriptive/current-weather";
import { DayForecast } from "./components/forecast/day-forecast";
import {WeekForecast} from "./components/forecast/week-forecast";
import { Section } from "./components/descriptive/section"; 
import { Bottom } from "./components/descriptive/bottom";
import { WEATHER_API_URL, WEATHER_API_KEY, ONECALL_API_URL } from "./api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

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
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} data2={forecast} />}
      {forecast && <DayForecast data={forecast}/>}
      {forecast &&  <Section data={forecast}/>}
      {forecast && <WeekForecast data={forecast}/>}
      {forecast && <Bottom data={forecast}/>}
      <div className="footer"></div>
    </div>
  );
}

export default App;
