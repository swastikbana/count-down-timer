import "./styles.css";
import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [minuteValue, setMinuteValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const interval = useRef(null);
  const secondRef = useRef(null);
  const minuteRef = useRef(null);

  const handleMinuteChange = (e) => {
    e.target.value && setMinuteValue(e.target.value);
  };

  const handleSecondChange = (e) => {
    e.target.value && setSecondValue(e.target.value);
  };

  const handleStart = () => {
    secondRef.current.value = "";
    minuteRef.current.value = "";
    if (!isTimerRunning && secondValue) {
      clearInterval(interval.current);
      setIsTimerRunning(true);

      interval.current = setInterval(() => {
        setSecondValue((value) => value - 1);
      }, 1000);
    }
  };

  const handlePauseResume = () => {};

  const handleReset = () => {
    setIsTimerRunning(false);
    clearInterval(interval.current);
    setSecondValue(0);
    setMinuteValue(0);
  };

  useEffect(() => {
    if (secondValue === 0) {
      setIsTimerRunning(false);
      clearInterval(interval.current);
    }
  }, [secondValue]);

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  return (
    <>
      <div className="App">
        Minute:{" "}
        <input
          type="text"
          name="minute"
          onChange={handleMinuteChange}
          ref={minuteRef}
          // value={minuteValue}
        />
        Second:{" "}
        <input
          type="text"
          name="second"
          onChange={handleSecondChange}
          ref={secondRef}
          // value={secondValue}
        />
      </div>
      <button onClick={handleStart}> Start</button>
      <button onClick={handlePauseResume}> Pause/Resume</button>
      <button onClick={handleReset}> Reset</button>
      <h1>
        {isTimerRunning
          ? String(minuteValue).padStart(2, "0") +
            ":" +
            String(secondValue).padStart(2, "0")
          : "00:00"}{" "}
      </h1>
    </>
  );
}
