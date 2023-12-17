'use client';

// This is a client component 👈🏽
import { useEffect, useRef, useState } from 'react';
import { CircularProgress } from './circular-progress';
import { Button } from './ui/button';

export default function PomodoroTimer() {
  const [timeRemaining, setTimeRemaining] = useState<number>(1500);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isFocusTime, setIsFocusTime] = useState<boolean>(true);
  const intervalId = useRef<number | null>(null);

  const minutes = String(Math.floor(timeRemaining / 60));
  const seconds = String(timeRemaining % 60).padStart(2, '0'); // Pad the seconds with '0' to ensure it's always two digits
  const percentage = (timeRemaining / 1500) * 100;

  function startTimer() {
    intervalId.current = window.setInterval(() => setTimeRemaining((currentTimeRemaining) => currentTimeRemaining - 1), 1000) as unknown as number;
    setIsTimerActive(true);

    return () => clearInterval(intervalId.current);
  }

  function stopAndResetTimer() {
    if(intervalId.current !== null) {
      clearInterval(intervalId.current);
    };
    intervalId.current = null;
    setTimeRemaining(1500);
    setIsTimerActive(false);
    setIsFocusTime(false);
  }

  function pauseTimer() {
    if(intervalId.current !== null) {
      clearInterval(intervalId.current);
    };
    // clearInterval(intervalId.current);
    setTimeRemaining(timeRemaining);
    setIsTimerActive(false);
  }

  useEffect(() => {
    if (timeRemaining === 0) {
      if(intervalId.current !== null) {
        clearInterval(intervalId.current);
      };
      // clearInterval(intervalId.current);
      intervalId.current = null;
      if (isFocusTime) {
        setIsFocusTime(false);
        setTimeRemaining(300);
      } else {
        setIsFocusTime(true);
        setTimeRemaining(1500);
      }
      setIsTimerActive(false);
    }
  }, [timeRemaining, isFocusTime]);

  return (
    <div className="h-[510px] w-[510px]">
      <div className="relative flex h-[400px] w-[400px] flex-col items-center justify-center rounded-full bg-primary-dark">
        <CircularProgress percentage={percentage} colour="#f87070" minutes={minutes} seconds={seconds} />
        <div className="absolute inset-x-[205] top-[275px] flex flex-col gap-1">
          {isTimerActive ? <Button onClick={pauseTimer}>Pause</Button> : <Button onClick={startTimer}>Start</Button>}
          <Button onClick={stopAndResetTimer}>Reset</Button>
        </div>
      </div>
    </div>
  );
}
