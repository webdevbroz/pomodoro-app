import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Colours } from '@/lib/colours';

interface PomodoroSettingsSliceState {
  font: string;
  colour: string;
}

const InitialSettingsState: PomodoroSettingsSliceState = {
  font: 'font-kumbh',
  colour: Colours.SecondaryPeach,
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
    updateAllSettings: (state, action: PayloadAction<PomodoroSettingsSliceState>) => {
      state.pomodoro = action.payload.pomodoro;
      state.shortBreakTime = action.payload.shortBreakTime;
      state.longBreakTime = action.payload.longBreakTime;
      state.font = action.payload.font;
      state.colour = action.payload.colour;
    }
  },
});

export const reducer = {
  pomodoroSettings: pomodoroSettingsSlice.reducer
}
