const HOURS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "00",
];

export const DayForecast = ({ data }) => {
  const currentUNIX = data.current.dt;
  const offsetUNIX = data.timezone_offset;
  const localUNIX = currentUNIX + offsetUNIX;
 // console.log(`Local UNIX is ${localUNIX}`);
  const date = new Date(localUNIX * 1000);
  const hourInADay = date.getUTCHours();
  //console.log(hourInADay);

  const forecastHours = HOURS.slice(hourInADay - 1, HOURS.length).concat(
    HOURS.slice(0, hourInADay)
  );
  //console.log(`now hour in a day is: ${hourInADay}`);
  //console.log(forecastHours);

  return (
    <div className="today-horizontal-scroll">
      <img className="separator-line" alt=" " src="../hourly-line.svg" />
      {data.hourly.slice(0, 16).map((item, idx) => (
        <div className="today-horizontal-scroll-item" key={idx}>
          <label>{forecastHours[idx]}:00</label>
          <img
            alt="weather"
            className="icon-small"
            src={`icons/${item.weather[0].icon}.png`}
          />
          <label className="scroll-temp">{Math.round(item.temp)}°C</label>
        </div>
      ))}
    </div>
  );
};