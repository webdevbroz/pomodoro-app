'use client';

import { ReactElement } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export default function TimerTransition(): ReactElement {
  return (
    <div className="z-10 flex h-[3.938rem] w-[20.438rem] items-center justify-center rounded-full bg-primary-dark md:w-[23.313rem]">
      <RadioGroup className="flex gap-x-7" defaultValue="pomodoro">
        <div className="flex items-center">
          <RadioGroupItem className=" w-0 opacity-0" value="pomodoro" id="radioPomodoro" />
          <Label
            className=" inline-block rounded-full bg-secondary-peach px-[19px] py-[17px] text-xs font-bold md:px-[22px]"
            htmlFor="radioPomodoro"
          >
            pomodoro
          </Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem className=" w-0 opacity-0" value="short" id="radioShort" />
          <Label className=" text-xs font-bold text-on-dark-background" htmlFor="radioShort">
            short break
          </Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem className=" w-0 opacity-0" value="long" id="radioLong" />
          <Label className="text-xs font-bold text-on-dark-background" htmlFor="radioLong">
            long break
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
