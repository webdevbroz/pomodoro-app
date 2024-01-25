'use client';

// This is a client component 👈🏽
import { ReactElement, useState } from 'react';
import Image from 'next/image';
import PomodoroColourSettings from '@/components/pomodoro/pomodoro-colour-settings';
import PomodoroFontSettings from '@/components/pomodoro/pomodoro-font-settings';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogCustomClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { pomodoroSettingsSlice } from '@/lib/redux/slices/pomodoroSettingsSlice';
import { useDispatch, useSelector } from '@/lib/redux/store';
import { setVariantAndColour } from '@/lib/utils';
import { X } from 'lucide-react';
import PomodoroTimerSettings, { PomodoroTimerData } from './pomodoro-timer-settings';

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
    setSelectedTime(time);
  };

  const handleApplyNewSettings = () => {
    const settings = {
      font: selectedFont,
      colour: selectedColour,
      time: selectedTime,
    };
    dispatch(pomodoroSettingsSlice.actions.updateAllSettings(settings));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">
        <Image src="/icon-settings.svg" width={28} height={28} alt="settings" className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent
        customClose
        className="flex h-[575px] w-[327px] flex-col rounded-2xl p-0 font-kumbh sm:rounded-2xl md:h-[490px] md:w-[540px] md:justify-between dark:bg-white"
      >
        <DialogHeader className="border-b border-gray-200 px-6 pb-7 pt-4 text-left md:pb-8 md:pt-6">
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
        </DialogHeader>
        <PomodoroTimerSettings onTimerChange={handleTimeChange} />
        <PomodoroFontSettings onFontChange={handleFontChange} />
        <PomodoroColourSettings onColourChange={handleColourChange} />
        <DialogFooter>
          <Button
            size={'lg'}
            variant={setVariantAndColour(colour, 'solid')}
            className={'absolute -bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2'}
            onClick={handleApplyNewSettings}
          >
            Apply
          </Button>
        </DialogFooter>
        <DialogCustomClose className="absolute right-6 top-8 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 disabled:pointer-events-none">
          <X className="text-gray-500" />
        </DialogCustomClose>
      </DialogContent>
    </Dialog>
  );
}
