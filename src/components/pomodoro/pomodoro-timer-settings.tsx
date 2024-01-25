import { ChangeEvent, useState } from 'react';
import { Colours } from '@/lib/colours';
import { ReduxState, useSelector } from '@/lib/redux/store';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export interface PomodoroTimerData {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

interface PomodoroTimerSettingsProps {
  onTimerChange: (updatedTimerData: PomodoroTimerData) => void;
}

export default function PomodoroTimerSettings({ onTimerChange }: PomodoroTimerSettingsProps) {
  const { colour, time } = useSelector((state: ReduxState) => state.pomodoroSettings);
  const [selectedTime, setSelectedTime] = useState<PomodoroTimerData>(time);
  const inputRules = {
    min: 5,
    max: 60,
    step: 5,
  };

  const updateTimeValues = (callback: (prevSelectedTime: PomodoroTimerData) => Partial<PomodoroTimerData>) => {
    const updatedProperties = callback(selectedTime);

    setSelectedTime((prevSelectedTime) => ({
      ...prevSelectedTime,
      ...updatedProperties,
    }));

    onTimerChange({ ...selectedTime, ...updatedProperties });
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateTimeValues(() => ({ [name]: value }));
  };

  function setRingOffsetColor(colour: string) {
    switch (colour) {
      case Colours.SecondaryAqua:
        return 'focus:border-secondary-aqua';
      case Colours.SecondaryPurple:
        return 'focus:border-secondary-purple';
    }
    return 'focus:border-secondary-peach';
  }

  return (
    <div className="mx-6 flex flex-col gap-2">
      <Label className="pb-3 text-center text-[11px] font-bold uppercase tracking-[0.4em] md:self-start md:text-[13px]">
        Time (Minutes)
      </Label>
      <div className="flex flex-col items-center gap-2 md:flex-row md:gap-5">
        <div className="flex w-full items-center justify-between md:flex-col md:items-start md:gap-2">
          <Label className="text-xs font-bold text-gray-400">pomodoro</Label>
          <Input
            name="pomodoro"
            className={`bg-gray-100 font-bold ${setRingOffsetColor(colour)}`}
            type="number"
            onChange={handleTimeChange}
            value={selectedTime.pomodoro}
            min={inputRules.min}
            max={inputRules.max}
            step={inputRules.step}
          />
        </div>
        <div className="flex w-full items-center justify-between md:flex-col md:items-start md:gap-2">
          <Label className="text-xs font-bold text-gray-400">short break</Label>
          <Input
            name="shortBreak"
            className={`bg-gray-100 font-bold ${setRingOffsetColor(colour)}`}
            type="number"
            onChange={handleTimeChange}
            value={selectedTime.shortBreak}
            min={inputRules.min}
            max={inputRules.max}
            step={inputRules.step}
          />
        </div>
        <div className="flex w-full items-center justify-between md:flex-col md:items-start md:gap-2">
          <Label className="text-xs font-bold text-gray-400">long break</Label>
          <Input
            name="longBreak"
            className={`bg-gray-100 font-bold ${setRingOffsetColor(colour)}`}
            type="number"
            onChange={handleTimeChange}
            value={selectedTime.longBreak}
            min={inputRules.min}
            max={inputRules.max}
            step={inputRules.step}
          />
        </div>
      </div>
    </div>
  );
}
