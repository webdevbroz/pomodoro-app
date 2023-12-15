'use client';

// This is a client component 👈🏽
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Progress } from "./ui/progress"


export default function PomodoroTimer() {
  const [timeRemaining, setTimeRemaining] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(false);
  const [focusTime, setFocusTime] = useState(true);
  const intervalId = useRef(null);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = String(timeRemaining % 60).padStart(2, '0'); // Pad the seconds with '0' to ensure it's always two digits
  const percentage = (timeRemaining / 1500) * 100

  function startTimer() {
    intervalId.current = setInterval(() => setTimeRemaining((currentTimeRemaining) => currentTimeRemaining - 1), 1000);
    setTimerRunning(true);

    return () => clearInterval(intervalId.current);
  }

  function stopAndResetTimer() {
    clearInterval(intervalId.current);
    intervalId.current = null;
    setTimeRemaining(1500);
    setTimerRunning(false);
    setFocusTime(false);
  }

  function pauseTimer() {
    clearInterval(intervalId.current);
    setTimeRemaining(timeRemaining);
    setTimerRunning(false);
  }

  useEffect(() => {
    if(timeRemaining === 0) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      if(focusTime) {
        setFocusTime(false);
        setTimeRemaining(300)
      } else {
        setFocusTime(true);
        setTimeRemaining(1500)
      }
      setTimerRunning(false);
    }
  }, [timeRemaining, focusTime])

  return (
    <>
      <div className='relative flex flex-col items-center justify-center w-[410px] h-[410px] rounded-full bg-primary-dark text-on-dark-background'>
        <div className='text-8xl tabular-nums'>
          {minutes} : {seconds}
        </div>
        <div className='flex flex-col gap-1 absolute top-[300px] left-205 right-205'>
          {timerRunning ? (
            <Button onClick={pauseTimer}>Pause</Button>
          ) : (
            <Button onClick={startTimer}>Start</Button>
          )}
          <Button onClick={stopAndResetTimer}>Reset</Button>
        </div>
      </div>

      <Progress value={percentage} />
    </>
  );
}
