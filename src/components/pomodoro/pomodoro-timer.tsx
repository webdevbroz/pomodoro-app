'use client';

// This is a client component 👈🏽
import { ReactElement, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { pomodoroStatusSlice } from '@/lib/redux/slices/pomodoroStatusSlice';
import { ReduxState, useDispatch, useSelector } from '@/lib/redux/store';
import { Colours } from '@/lib/colours';
import { CircularTimer } from './circular-progress';

  export default function PomodoroTimer(): ReactElement {
    const { status } = useSelector((state: ReduxState) => state.pomodoroStatus);
    const { colour, time } = useSelector((state: ReduxState) => state.pomodoroSettings);
    const dispatch = useDispatch();

    const pomodoroTime = time.pomodoro * 60;
    const shortBreakTime = time.shortBreak * 60;
    const longBreakTime = time.longBreak * 60;

    const intervalId = useRef<number | null>(null);
    const [pomodoroCount, setPomodoroCount] = useState<number>(1);
    const [timeRemaining, setTimeRemaining] = useState<number>(pomodoroTime);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const [isFocusTime, setIsFocusTime] = useState<boolean>(true);

  const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, '0');
  const seconds = String(timeRemaining % 60).padStart(2, '0'); // Pad the seconds with '0' to ensure it's always two digits
  const focusTimePercentage = (timeRemaining / pomodoroTime) * 100;
  const shortBreakTimePercentage = (timeRemaining / shortBreakTime) * 100;
  const longBreakTimePercentage = (timeRemaining / longBreakTime) * 100;

  function statusPercentage(isFocusTime: boolean) {
    if (isFocusTime) {
      return focusTimePercentage;
    } else if (!isFocusTime && status === 'short') {
      return shortBreakTimePercentage;
    } else {
      return longBreakTimePercentage;
    }
  }

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
    setTimeRemaining(timeRemaining);
    setIsTimerActive(false);
    if (status !== 'pomodoro') {
      setIsFocusTime(false);
    }
  }

  useEffect(() => {
    pauseTimer();
    if (status === 'pomodoro') {
      setTimeRemaining(pomodoroTime);
      setIsFocusTime(true);
    } else if (status === 'short') {
      setTimeRemaining(shortBreakTime);
      setIsFocusTime(false);
    } else if (status === 'long') {
      setTimeRemaining(longBreakTime);
      setIsFocusTime(false);
    }
  }, [status]);

  useEffect(() => {
    if (timeRemaining === 0) {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
      // clearInterval(intervalId.current);
      intervalId.current = null;
      if (isFocusTime && pomodoroCount == 4) {
        dispatch(pomodoroStatusSlice.actions.selectedTimer('long'));
        setIsFocusTime(false);
        setTimeRemaining(longBreakTime);
        setPomodoroCount(0);
      } else if (isFocusTime) {
        dispatch(pomodoroStatusSlice.actions.selectedTimer('short'));
        setIsFocusTime(false);
        setTimeRemaining(shortBreakTime);
      } else {
        dispatch(pomodoroStatusSlice.actions.selectedTimer('pomodoro'));
        setIsFocusTime(true);
        setTimeRemaining(pomodoroTime);
        setPomodoroCount((prev) => prev + 1);
      }
      setIsTimerActive(false);
    }
  }, [timeRemaining, isFocusTime, dispatch]);

  function buttonTextColourOnHover(colour: string) {
    if (colour === Colours.SecondaryPeach) {
      return 'ghost-peach';
    } else if (colour === Colours.SecondaryAqua) {
      return 'ghost-aqua';
    } else {
      return 'ghost-purple';
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
        <CircularTimer
          percentage={statusPercentage(isFocusTime)}
          colour={colour}
          minutes={minutes}
          seconds={seconds}
        />
        <TimerButton />
      </div>
    </div>
  );
}
