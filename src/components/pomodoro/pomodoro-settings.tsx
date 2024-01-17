'use client';

// This is a client component 👈🏽
import { ReactElement, useState } from 'react';
import PomodoroColourSettings from '@/components/pomodoro/pomodoro-colour-settings';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { pomodoroSettingsSlice } from '@/lib/redux/slices/pomodoroSettingsSlice';
import { useDispatch } from '@/lib/redux/store';

export default function PomodoroSettings(): ReactElement {
  const dispatch = useDispatch();
  const getStore = useSelector((state) => state.pomodoroSettings);

  const [selectedFont, setSelectedFont] = useState<string>(getStore.font);
  const [selectedColour, setSelectedColour] = useState<string>(getStore.colour);

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
    // console.log(settings);
  };

  console.log(selectedColour);
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="dark:bg-settings-background">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <div>Colour</div>
        <PomodoroColourSettings onColourChange={handleColourChange} />
        {/* dispatch needs to take all handle callbacks in this file */}
        {/* this button rerenders each time PomodoroColorSettings onColourChange is executed */}
        <button onClick={handleApplyNewSettings}>Save</button>
      </DialogContent>
    </Dialog>
  );
}
