'use client';

// This is a client component 👈🏽
import { ReactElement, useState } from 'react';
import Image from 'next/image';
import PomodoroColourSettings from '@/components/pomodoro/pomodoro-colour-settings';
import PomodoroFontSettings from '@/components/pomodoro/pomodoro-font-settings';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { pomodoroSettingsSlice } from '@/lib/redux/slices/pomodoroSettingsSlice';
import { useDispatch, useSelector } from '@/lib/redux/store';

export default function PomodoroSettings(): ReactElement {
  const dispatch = useDispatch();
  const { colour, font } = useSelector((state) => state.pomodoroSettings);

  const [selectedFont, setSelectedFont] = useState<string>(font);
  const [selectedColour, setSelectedColour] = useState<string>(colour);
  const [open, setOpen] = useState<boolean>(false);

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
  };

  const handleColourChange = (colour: string) => {
    setSelectedColour(colour);
  };

  const handleApplyNewSettings = () => {
    const settings = {
      font: selectedFont,
      colour: selectedColour,
    };
    dispatch(pomodoroSettingsSlice.actions.updateAllSettings(settings));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">
        <Image src="/icon-settings.svg" width={28} height={28} alt="settings" className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="flex h-[575px] w-[327px]	flex-col justify-between dark:bg-settings-background md:h-[540px] md:w-[490px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <PomodoroColourSettings onColourChange={handleColourChange} />
        <PomodoroFontSettings onFontChange={handleFontChange} />
        <Button onClick={handleApplyNewSettings}>Apply</Button>
      </DialogContent>
    </Dialog>
  );
}
