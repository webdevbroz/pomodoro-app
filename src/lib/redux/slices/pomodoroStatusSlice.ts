import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PomodoroStatus = 'pomodoro' | 'short' | 'long';

interface PomodoroStatusSliceState {
  status: PomodoroStatus
}

const initialState: PomodoroStatusSliceState = {
  status: 'pomodoro'
}

export const pomodoroStatusSlice = createSlice({
  name: 'timerTransition',
  initialState,
  reducers: {
    selectedTimer: (state, action: PayloadAction<PomodoroStatus>) => {
      state.status = action.payload
    }
  }
})
