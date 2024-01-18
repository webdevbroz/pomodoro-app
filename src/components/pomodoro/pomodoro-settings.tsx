'use client';

// This is a client component 👈🏽
import { ReactElement, useState } from 'react';
import PomodoroColourSettings from '@/components/pomodoro/pomodoro-colour-settings';
import PomodoroFontSettings from '@/components/pomodoro/pomodoro-font-settings';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { pomodoroSettingsSlice } from '@/lib/redux/slices/pomodoroSettingsSlice';
import { useDispatch, useSelector } from '@/lib/redux/store';

export default function PomodoroSettings(): ReactElement {
  const dispatch = useDispatch();
  const getStore = useSelector((state) => state.pomodoroSettings);

  const [selectedFont, setSelectedFont] = useState<string>(getStore.font);
  const [selectedColour, setSelectedColour] = useState<string>(getStore.colour);
  const [open, setOpen] = useState<boolean>(false);

  console.log(getStore);

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
  }

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

  console.log(selectedColour);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">
        <img src="/icon-settings.svg" alt="settings" className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="flex h-[575px] w-[327px]	flex-col justify-between md:h-[540px] md:w-[490px] dark:bg-settings-background">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <PomodoroColourSettings onColourChange={handleColourChange} />
        <PomodoroFontSettings onFontChange={handleFontChange} />
        {/* this button rerenders each time PomodoroColorSettings onColourChange is executed */}
        <Button onClick={handleApplyNewSettings}>Apply</Button>
      </DialogContent>
    </Dialog>
  );
}
