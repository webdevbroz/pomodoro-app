'use client';

import { ReactElement, useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export default function TimerTransition(): ReactElement {
  const [selected, setSelected] = useState<string>('pomodoro');

  ('bg-secondary-peach px-[23px] py-[16px]');
  console.log(selected);

  // function setClassName(selected: string) {
  //   switch(selected) {
  //     case 'pomodoro':
  //       return 'bg-secondary-peach px-[23px] py-[16px]'
  //     case 'short':
  //       return
  //   }
  // }

  return (
    <div className="z-10 flex h-[3.938rem] w-[20.438rem] items-center justify-center rounded-full bg-primary-dark md:w-[23.313rem]">
      <RadioGroup
        onValueChange={(value) => setSelected(value)}
        className="flex w-full justify-center gap-0"
        defaultValue="pomodoro"
      >
        <div className="flex w-[106px] items-center md:w-[120px]">
          <RadioGroupItem className="w-0 opacity-0" value="pomodoro" id="radioPomodoro" />
          <Label
            className={`inline-block cursor-pointer rounded-full px-[23px] py-[18px] text-xs font-bold md:px-[26px] md:text-sm ${
              selected === 'pomodoro' ? 'bg-secondary-peach' : 'text-gray-500 hover:text-on-dark-background'
            }`}
            htmlFor="radioPomodoro"
          >
            pomodoro
          </Label>
        </div>
        <div className="flex w-[106px] items-center md:w-[120px]">
          <RadioGroupItem className="w-0 opacity-0" value="short" id="radioShort" />
          <Label
            className={`inline-block cursor-pointer whitespace-nowrap rounded-full px-[20px] py-[16px] text-xs font-bold md:px-[22px] md:text-sm ${
              selected === 'short' ? 'bg-secondary-peach' : 'text-gray-500 hover:text-on-dark-background'
            }`}
            htmlFor="radioShort"
          >
            short break
          </Label>
        </div>
        <div className="flex w-[106px] items-center md:w-[120px]">
          <RadioGroupItem className="w-0 opacity-0" value="long" id="radioLong" />
          <Label
            className={`inline-block cursor-pointer whitespace-nowrap rounded-full px-[21px] py-[16px] text-xs font-bold md:px-[25px] md:text-sm ${
              selected === 'long' ? 'bg-secondary-peach' : 'text-gray-500 hover:text-on-dark-background'
            }`}
            htmlFor="radioLong"
          >
            long break
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
