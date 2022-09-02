
export const CurrentWeather = ({ data, data2 }) => {
  let sunscreen = "";
  let umbrella = "";

  const shouldWearSunscreen = () => {
    if (data2.current.uvi > 4) {
      sunscreen = "You should put some sunscreen on.";
    } else {
      sunscreen = "";
    }
    return sunscreen;
  };

  const shouldTakeUmbrella = () => {
    if (data2.daily[0].weather[0].main === "Rain") {
      umbrella = "Don't forget to grab an umbrella!";
    } else {
      umbrella = "";
    }
    return umbrella;
  };

  return (
    <div className="weather">
      <h3>
        Today it's {Math.round(data.main.temp)}°C and{" "}
        {data.weather[0].description} in {data.city}. {shouldWearSunscreen()}{" "}
        {shouldTakeUmbrella()}
      </h3>
    </div>
  );
};
