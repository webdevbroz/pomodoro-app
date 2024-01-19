'use client';

// This is a client component 👈🏽
import { ReactElement, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSelector } from '@/lib/redux/store';
import { CircularTimer } from './circular-progress';
import { Colours } from '@/lib/colours';

export default function PomodoroTimer(): ReactElement {
  const { colour } = useSelector((state) => state.pomodoroSettings);
  const [timeRemaining, setTimeRemaining] = useState<number>(1500);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isFocusTime, setIsFocusTime] = useState<boolean>(true);
  const intervalId = useRef<number | null>(null);

  const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, '0');
  const seconds = String(timeRemaining % 60).padStart(2, '0'); // Pad the seconds with '0' to ensure it's always two digits
  const focusTimePercentage = (timeRemaining / 1500) * 100;
  const breakTimePercentage = (timeRemaining / 300) * 100;
  const percentage = isFocusTime ? focusTimePercentage : breakTimePercentage;

  function startTimer(): () => void {
    intervalId.current = window.setInterval(
      () => setTimeRemaining((currentTimeRemaining) => currentTimeRemaining - 1),
      1000
    ) as unknown as number;
    setIsTimerActive(true);

    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    };
  }

  function pauseTimer(): void {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }
    // clearInterval(intervalId.current);
    setTimeRemaining(timeRemaining);
    setIsTimerActive(false);
  }

  useEffect(() => {
    if (timeRemaining === 0) {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
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

function buttonTextColourOnHover(colour: string) {
  if (colour === Colours.SecondaryPeach) {
    return 'ghost-peach'
  } else if (colour === Colours.SecondaryAqua) {
    return 'ghost-aqua'
  } else {
    return 'ghost-purple'
  }
}

  const TimerButton = (): ReactElement => {
    const pauseOrStartOnClick: () => void = isTimerActive ? pauseTimer : startTimer;
    const pauseOrStartText: string = isTimerActive ? 'PAUSE' : 'START';
    return (
      <div className="absolute top-[65%] flex items-center justify-center">
        <Button
          variant={buttonTextColourOnHover(colour)}
          className="pr-0 font-bold tracking-[1em] text-on-dark-background"
          onClick={pauseOrStartOnClick}
        >
          {pauseOrStartText}
        </Button>
      </div>
    );
  };

  return (
    <div className="h-[300px] w-[300px] md:h-[410px] md:w-[410px]">
      <div className="relative flex h-[100%] flex-col items-center justify-center rounded-full bg-primary-dark">
        <CircularTimer percentage={percentage} colour={colour} minutes={minutes} seconds={seconds} />
        <TimerButton />
      </div>
    </div>
  );
}
