'use client';

import { ReactElement } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { PomodoroStatus } from '@/lib/redux/slices/pomodoroStatusSlice';
import { pomodoroStatusSlice } from '@/lib/redux/slices/pomodoroStatusSlice';
import { useSelector, useDispatch, ReduxState } from '@/lib/redux/store';
import { Colours } from '@/lib/colours';

export default function PomodoroStatus(): ReactElement {
  const dispatch = useDispatch()
  const { status } = useSelector((state: ReduxState) => state.pomodoroStatus)
  const { colour } = useSelector((state: ReduxState) => state.pomodoroSettings)

  const RadioItems = ({ status }: { status: PomodoroStatus }): ReactElement => {
    function setstatusStyles<T extends PomodoroStatus>(status: T, value: T): string {
      return status === value ? setColour() : 'text-gray-500 hover:text-on-dark-background';
    }

    function setColour(): string {
      switch(colour) {
        case Colours.SecondaryAqua:
          return 'bg-secondary-aqua'
        case Colours.SecondaryPurple:
          return 'bg-secondary-purple'
      }
      return 'bg-secondary-peach'
    }

    return (
      <>
        <div className="flex w-[106px] items-center md:w-[120px]">
          <RadioGroupItem className="w-0 opacity-0" value="pomodoro" id="radioPomodoro" />
          <Label
            className={`inline-block cursor-pointer rounded-full px-[23px] py-[18px] text-xs font-bold md:px-[26px] md:text-sm ${setstatusStyles(
              status,
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
            className={`inline-block cursor-pointer whitespace-nowrap rounded-full px-[20px] py-[16px] text-xs font-bold md:px-[22px] md:text-sm ${setstatusStyles(
              status,
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
            className={`inline-block cursor-pointer whitespace-nowrap rounded-full px-[21px] py-[16px] text-xs font-bold md:px-[25px] md:text-sm ${setstatusStyles(
              status,
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
        onValueChange={(value: PomodoroStatus) => dispatch(pomodoroStatusSlice.actions.selectedTimer(value))}
        className="flex w-full justify-center gap-0"
        defaultValue="pomodoro"
      >
        <RadioItems status={status} />
      </RadioGroup>
    </div>
  );
}
