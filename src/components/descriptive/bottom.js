export const Bottom = ({ data }) => {
  let greeting = "";
  const hourInADay = new Date(
    (data.current.dt + data.timezone_offset) * 1000
  ).getUTCHours();
  //console.log(hourInADay);
  if (hourInADay >= 0 && hourInADay <= 5) {
    greeting = "Enjoy your night!";
  } else if (hourInADay >= 5 && hourInADay <= 11) {
    greeting = "Have a lovely morning!";
  } else if (hourInADay >= 12 && hourInADay <= 17) {
    greeting = "Have a nice day!";
  } else if (hourInADay >= 18 && hourInADay <= 22) {
    greeting = "Have a nice evening.";
  } else if (hourInADay >= 23 && hourInADay <= 0) {
    greeting = "Get a good night's sleep!";
  }

  return <h3>{greeting}</h3>;
};
