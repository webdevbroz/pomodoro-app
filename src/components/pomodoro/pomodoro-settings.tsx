'use client';

// This is a client component 👈🏽
import { ReactElement, useState } from 'react';
import Image from 'next/image';
import PomodoroColourSettings from '@/components/pomodoro/pomodoro-colour-settings';
import PomodoroFontSettings from '@/components/pomodoro/pomodoro-font-settings';
import PomodoroTimerSettings, { PomodoroTimerData } from './pomodoro-timer-settings';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { pomodoroSettingsSlice } from '@/lib/redux/slices/pomodoroSettingsSlice';
import { useDispatch, useSelector } from '@/lib/redux/store';

export default function PomodoroSettings(): ReactElement {
  const dispatch = useDispatch();
  const { colour, font, time } = useSelector((state) => state.pomodoroSettings);

  const [selectedFont, setSelectedFont] = useState<string>(font);
  const [selectedColour, setSelectedColour] = useState<string>(colour);
  const [selectedTime, setSelectedTime] = useState<PomodoroTimerData>(time);
  const [open, setOpen] = useState<boolean>(false);

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
  };

  const handleColourChange = (colour: string) => {
    setSelectedColour(colour);
  };

  const handleTimeChange = (time: PomodoroTimerData) => {
    setSelectedTime(time)
  }

  const handleApplyNewSettings = () => {
    const settings = {
      font: selectedFont,
      colour: selectedColour,
      time: selectedTime
    };
    dispatch(pomodoroSettingsSlice.actions.updateAllSettings(settings));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">
        <Image src="/icon-settings.svg" width={28} height={28} alt="settings" className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="flex h-[575px] w-[327px] flex-col justify-between md:h-[540px] md:w-[490px] dark:bg-settings-background">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <PomodoroTimerSettings onTimerChange={handleTimeChange} />
        <PomodoroColourSettings onColourChange={handleColourChange} />
        <PomodoroFontSettings onFontChange={handleFontChange} />
        <Button onClick={handleApplyNewSettings}>Apply</Button>
      </DialogContent>
    </Dialog>
  );
}


// import React, { useState } from 'react';

// interface PomodoroTimerData {
//   minutes: number;
//   seconds: number;
// }

// interface PomodoroTimerSettingsProps {
//   onTimerChange: (updatedTimerData: PomodoroTimerData) => void;
// }

// const PomodoroTimerSettings: React.FC<PomodoroTimerSettingsProps> = ({ onTimerChange }) => {
//   const [timerData, setTimerData] = useState<PomodoroTimerData>({ minutes: 25, seconds: 0 });

//   const handleTimerChange = (callback: (prevSelectedTime: PomodoroTimerData) => Partial<PomodoroTimerData>) => {
//     const updatedProperties = callback(timerData);
//     setTimerData(prevTimerData => ({ ...prevTimerData, ...updatedProperties }));
//     onTimerChange({ ...timerData, ...updatedProperties });
//   };

//   const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const minutes = parseInt(event.target.value, 10) || 0;
//     handleTimerChange(prevSelectedTime => ({ minutes }));
//   };

//   const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const seconds = parseInt(event.target.value, 10) || 0;
//     handleTimerChange(prevSelectedTime => ({ seconds }));
//   };

//   return (
//     <div>
//       <label>
//         Minutes:
//         <input type="number" value={timerData.minutes} onChange={handleMinutesChange} />
//       </label>
//       <br />
//       <label>
//         Seconds:
//         <input type="number" value={timerData.seconds} onChange={handleSecondsChange} />
//       </label>
//     </div>
//   );
// };

// export default PomodoroTimerSettings;
