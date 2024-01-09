'use client';

import { ReactElement, useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

type RadioValue = 'pomodoro' | 'short' | 'long';

export default function TimerTransition(): ReactElement {
  const [selected, setSelected] = useState<RadioValue>('pomodoro');

  const RadioItems = ({ selected }: { selected: RadioValue }): ReactElement => {
    function setSelectedStyles<T extends RadioValue>(selected: T, value: T): string {
      return selected === value ? 'bg-secondary-peach' : 'text-gray-500 hover:text-on-dark-background';
    }

    return (
      <>
        <div className="flex w-[106px] items-center md:w-[120px]">
          <RadioGroupItem className="w-0 opacity-0" value="pomodoro" id="radioPomodoro" />
          <Label
            className={`inline-block cursor-pointer rounded-full px-[23px] py-[18px] text-xs font-bold md:px-[26px] md:text-sm ${setSelectedStyles(
              selected,
              'pomodoro'
            )}`}
            htmlFor="radioPomodoro"
          >
            pomodoro
          </Label>
        </div>
        <div className="flex w-[106px] items-center md:w-[120px]">
          <RadioGroupItem className="w-0 opacity-0" value="short" id="radioShort" />
          <Label
            className={`inline-block cursor-pointer whitespace-nowrap rounded-full px-[20px] py-[16px] text-xs font-bold md:px-[22px] md:text-sm ${setSelectedStyles(
              selected,
              'short'
            )}`}
            htmlFor="radioShort"
          >
            short break
          </Label>
        </div>
        <div className="flex w-[106px] items-center md:w-[120px]">
          <RadioGroupItem className="w-0 opacity-0" value="long" id="radioLong" />
          <Label
            className={`inline-block cursor-pointer whitespace-nowrap rounded-full px-[21px] py-[16px] text-xs font-bold md:px-[25px] md:text-sm ${setSelectedStyles(
              selected,
              'long'
            )}`}
            htmlFor="radioLong"
          >
            long break
          </Label>
        </div>
      </>
    );
  };

  return (
    <div className="z-10 flex h-[3.938rem] w-[20.438rem] items-center justify-center rounded-full bg-primary-dark md:w-[23.313rem]">
      <RadioGroup
        onValueChange={(value: RadioValue) => setSelected(value)}
        className="flex w-full justify-center gap-0"
        defaultValue="pomodoro"
      >
        <RadioItems selected={selected} />
      </RadioGroup>
    </div>
  );
}
