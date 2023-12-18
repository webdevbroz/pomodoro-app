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
  const focusTimePercentage = (timeRemaining / 1500) * 100;
  const breakTimePercentage = (timeRemaining / 300) * 100;

  function startTimer() {
    intervalId.current = window.setInterval(() => setTimeRemaining((currentTimeRemaining) => currentTimeRemaining - 1), 1000) as unknown as number;
    setIsTimerActive(true);

    return () => {
      if(intervalId.current !== null) {
        clearInterval(intervalId.current);
      };
    };
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
    <div className="h-[410px] w-[410px]">
      <div className="relative flex flex-col items-center justify-center rounded-full bg-primary-dark">
        <CircularProgress percentage={isFocusTime ? focusTimePercentage : breakTimePercentage} colour="#f87070" minutes={minutes} seconds={seconds} />
        <div className="absolute inset-x-[205] top-[275px] flex flex-col gap-1">
          {isTimerActive ? <Button onClick={pauseTimer}>Pause</Button> : <Button onClick={startTimer}>Start</Button>}
        </div>
      </div>
    </div>
  );
}
