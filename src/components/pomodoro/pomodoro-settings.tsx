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
import { useSelector, useDispatch } from 'react-redux';
import { pomodoroSettingsSlice } from '@/lib/redux/slices/pomodoroSettingsSlice';

export default function PomodoroSettings(): ReactElement {
  const dispatch = useDispatch();
  const getStore = useSelector((state) => state.pomodoroSettings);

  const [selectedPomodoro, setSelectedPomodoro] = useState<number>(getStore.pomodoro);
  const [selectedShortBreakTime, setSelectedShortBreakTime] = useState<number>(getStore.shortBreakTime);
  const [selectedLongBreakTime, setSelectedLongBreakTime] = useState<number>(getStore.longBreakTime);
  const [selectedFont, setSelectedFont] = useState<string>(getStore.font);
  const [selectedColour, setSelectedColour] = useState<string>(getStore.colour);

  console.log(getStore);

  // const handlePomodoroChange = (pomodoro: string) => {
  //   setSelectedPomodoro(pomodoro);
  // }

  // const handleLongBreakChange = (longBreakTime: string) => {
  //   setSelectedLongBreak(longBreak);
  // }

  // const handleShortBreakChange = (shortBreakTime: string) => {
  //   setSelectedShortBreak(shortBreakTime);
  // }

  // const handleFontChange = (font: string) => {
  //   setSelectedFont(font);
  // }
  const handleColourChange = (colour: string) => {
    setSelectedColour(colour);
  }

  const handleApplyNewSettings = () => {
    const settings = {
      pomodoro: selectedPomodoro,
      shortBreakTime: selectedShortBreakTime,
      longBreakTime: selectedLongBreakTime,
      font: selectedFont,
      colour: selectedColour,
    }
    dispatch(pomodoroSettingsSlice.actions.updateAllSettings(settings));
    // console.log(settings);
  }


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
