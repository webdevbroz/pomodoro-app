import { Colours } from '@/lib/colours';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PomodoroTimerData } from '@/components/pomodoro/pomodoro-timer-settings';

interface PomodoroSettingsSliceState {
  font: string;
  colour: string;
  time: PomodoroTimerData;
}

const InitialSettingsState: PomodoroSettingsSliceState = {
  font: 'font-kumbh',
  colour: Colours.SecondaryPeach,
  time: { pomodoro: 25, shortBreak: 5, longBreak: 15 }
};

export const pomodoroSettingsSlice = createSlice({
  name: 'pomodoroSettings',
  initialState: InitialSettingsState,
  reducers: {
    setFont: (state, action: PayloadAction<string>) => {
      state.font = action.payload;
    },
    setColour: (state, action: PayloadAction<string>) => {
      state.colour = action.payload;
    },
    updateAllSettings: (state, action: PayloadAction<PomodoroSettingsSliceState>) => {
      state.font = action.payload.font;
      state.colour = action.payload.colour;
      state.time = action.payload.time;
    },
  },
});
