import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PomodoroSettingsSliceState {
  pomodoro: number;
  shortBreakTime: number;
  longBreakTime: number;
  font: string;
  colour: string;
}

const InitialSettingsState: PomodoroSettingsSliceState = {
  pomodoro: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  font: 'kumbh-sans',
  colour: '#ff0000',
};

export const pomodoroSettingsSlice = createSlice({
  name: 'pomodoroSettings',
  initialState: InitialSettingsState,
  reducers: {
    setPomodoro: (state, action: PayloadAction<number>) => {
      state.pomodoro = action.payload;
    },
    setShortBreakTime: (state, action: PayloadAction<number>) => {
      state.shortBreakTime = action.payload;
    },
    setLongBreakTime: (state, action: PayloadAction<number>) => {
      state.longBreakTime = action.payload;
    },
    setFont: (state, action: PayloadAction<string>) => {
      state.font = action.payload;
    },
    setColour: (state, action: PayloadAction<string>) => {
      state.colour = action.payload;
    },
  },
});
