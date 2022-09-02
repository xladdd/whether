import { useEffect, useState } from "react";

export const AnimatedWord = () => {
  const wordArray = [
    <span style={{ color: "#F8C100" }}>sunny</span>,
    <span style={{ color: "#0008CC" }}>foggy</span>,
    <span style={{ color: "#FF53BA" }}>snowy</span>,
    <span style={{ color: "#0008CC" }}>rainy</span>,
    <span style={{ color: "#F8C100" }}>clear</span>,
    <span style={{ color: "#FF53BA" }}>stormy</span>
  ];

  let [n, setN] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (n === 5) {
        setN(0);
      } else {
        setN(n + 1);

      }
    }, 1500);
    return () => clearInterval(timer);
  }, [n]);

  return <span>{wordArray[n]}</span>;
};
