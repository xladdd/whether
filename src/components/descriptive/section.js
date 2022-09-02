export const Section = ({ data }) => {
  // Sunrise
  const sunriseRaw = new Date(
    (data.current.sunrise + data.timezone_offset) * 1000
  ).toLocaleString("en-GB", { timeZone: "UTC" });
  const sunrise = sunriseRaw.slice(12, 17);
  console.log(`Sun rises at ${sunrise}`);

  // Sunset
  const sunsetRaw = new Date(
    (data.current.sunset + data.timezone_offset) * 1000
  ).toLocaleString("en-GB", { timeZone: "UTC" });
  const sunset = sunsetRaw.slice(12, 17);
  console.log(`Sun sets at ${sunset}`);

  // Moonrise
  const moonriseRaw = new Date(
    (data.daily[0].moonrise + data.timezone_offset) * 1000
  ).toLocaleString("en-GB", { timeZone: "UTC" });
  const moonrise = moonriseRaw.slice(12, 17);
  console.log(`Moon rises at ${moonrise}`);

  // Moonset
  const moonsetRaw = new Date(
    (data.daily[0].moonset + data.timezone_offset) * 1000
  ).toLocaleString("en-GB", { timeZone: "UTC" });
  const moonset = moonsetRaw.slice(12, 17);
  console.log(`Moon sets at ${moonset}`);

  // Moon phase
  const moonphase = data.daily[0].moon_phase;
  let typeOfMoon = "";
  if (moonphase >= 0.03 && moonphase <= 0.03) {
    typeOfMoon = "new";
  } else if (moonphase <= 1 && moonphase >= 0.971) {
    typeOfMoon = "new";
  } else if (moonphase >= 0.031 && moonphase <= 0.22) {
    typeOfMoon = "waxing crescent";
  } else if (moonphase >= 0.221 && moonphase <= 0.28) {
    typeOfMoon = "first quarter";
  } else if (moonphase >= 0.281 && moonphase <= 0.47) {
    typeOfMoon = "waxing gibbous";
  } else if (moonphase >= 0.471 && moonphase <= 0.53) {
    typeOfMoon = "full";
  } else if (moonphase >= 0.531 && moonphase <= 0.72) {
    typeOfMoon = "waning gibbous";
  } else if (moonphase >= 0.721 && moonphase <= 0.78) {
    typeOfMoon = "last quarter";
  } else if (moonphase >= 0.781 && moonphase <= 0.97) {
    typeOfMoon = "waning crescent";
  } else {
    typeOfMoon = "beautiful";
  }

  console.log(`The type of moon is ${typeOfMoon}`);

  return (
    <h3>
      The sun rises at <span style={{ color: "#F8C100" }}>{sunrise}</span>, sets
      at <span style={{ color: "#0008CC" }}>{sunset}</span>. A&nbsp;{typeOfMoon} moon
      rises at&nbsp;<span style={{ color: "#F8C100" }}>{moonrise}</span>, sets at&nbsp;<span style={{ color: "#0008CC" }}>{moonset}</span>.<br/>And the rest of the
      week looks like&nbsp;this:
    </h3>
  );
};


