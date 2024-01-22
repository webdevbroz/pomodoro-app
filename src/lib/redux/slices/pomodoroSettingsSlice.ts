import { Colours } from '@/lib/colours';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setFont: (state, action: PayloadAction<string>) => {
      state.font = action.payload;
    },
    setColour: (state, action: PayloadAction<string>) => {
      state.colour = action.payload;
    },
    updateAllSettings: (state, action: PayloadAction<PomodoroSettingsSliceState>) => {
      state.font = action.payload.font;
      state.colour = action.payload.colour;
    },
  },
});

export const reducer = {
  pomodoroSettings: pomodoroSettingsSlice.reducer,
};
