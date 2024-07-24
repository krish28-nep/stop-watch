import { useEffect, useState } from "react";
const Stop_Watch = () => {
  const [state, setState] = useState({ isPaused: false, content: "pause" });
  const [isRunning, setRunning] = useState(false);
  const toggleState = () => {
    setState({
      isPaused: !state.isPaused,
      content: state.isPaused ? "pause" : "resume",
    });
    setRunning((preState) => !preState);
  };
  const initialTime = {
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
  };
  const [time, setTime] = useState(initialTime);

  const handleStart = () => {
    setRunning(true);
  };
  const handleReset = () => {
    setTime(initialTime);
    setRunning(false);
  };
  const format = () => {
    let hours = time.Hours;
    let minutes = time.Minutes;
    let seconds = time.Seconds;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  };

  const padZero = (n) => {
    return n < 10 ? "0" + n : n;
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          let { Hours, Minutes, Seconds } = prevTime;
          Seconds++;
          if (Seconds === 60) {
            Seconds = 0;
            Minutes++;
          }
          if (Minutes === 60) {
            Minutes = 0;
            Hours++;
          }
          return { Hours, Minutes, Seconds };
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);
  return (
    <>
      <div className="stop-watch-container">
        <div className="stop-watch">
          <span className="Time">{format()}</span>
        </div>
        <div className="Controller">
          <button className="Start" onClick={handleStart}>
            Start
          </button>
          <button className="Reset" onClick={handleReset}>
            Reset
          </button>
          <button className="Pause" onClick={toggleState}>
            {state.content}
          </button>
        </div>
      </div>
    </>
  );
};

export default Stop_Watch;
