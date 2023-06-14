import { useState, useEffect } from "react";

export default function Timer({ setTiming, qn }) {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time === 0) return setTiming(true);

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000); // Corrected interval to 1000 milliseconds (1 second)

    // Clean up the interval on component unmount or when the dependency array changes
    return () => clearInterval(interval);
  }, [setTiming, time]); // Added empty dependency array to run effect only once
  useEffect(() => {
    setTime(30);
  }, [qn]);
  return <div>{time}</div>;
}
