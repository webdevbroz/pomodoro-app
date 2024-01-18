'use client';

// This is a client component 👈🏽
import PomodoroTimer from '@/components/pomodoro/pomodoro-timer';
import PomodoroSettings from '@/components/pomodoro/pomodoro-settings';
import { useSelector } from '@/lib/redux/store';

export default function Pomodoro() {
  const getStore = useSelector((state) => state.pomodoroSettings);

  return (
    <>
      <div className={`flex h-112 w-full items-center justify-center ${getStore.font}`}>
        <PomodoroTimer />
      </div>
      {/* <button>Open Settings</button> */}
      <div className="flex h-32 w-full justify-center border-4 border-white">
        <PomodoroSettings />
      </div>
    </>
  );
}
