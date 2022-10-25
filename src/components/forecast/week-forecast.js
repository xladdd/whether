const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const WeekForecast = ({ data }) => {
  const currentUNIX = data.current.dt;
  const offsetUNIX = data.timezone_offset;
  const localUNIX = currentUNIX + offsetUNIX;
  const dayInAWeek = new Date(localUNIX * 1000).getUTCDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );
  //console.log(forecastDays);

  return (
    <div className="week-horizontal-scroll">
      <img className="separator-line" alt=" " src="../daily-line.svg" />

      {data.daily.slice(0, 6).map((item, idx) => (
        <div className="week-horizontal-scroll-item" key={idx}>
          <label>{forecastDays[idx].substring(0, 3)}</label>
          <img
            alt="weather"
            className="icon-small"
            src={`icons/${item.weather[0].icon}.png`}
          />
          <label className="scroll-temp">{Math.round(item.temp.day)}°C</label>
        </div>
      ))}
      <div className="scroll-back-spacer">.</div>
    </div>
  );
};
