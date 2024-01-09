import { pomodoroSettingsSlice } from "./slices/pomodoroSettingsSlice"
import { pomodoroStatusSlice } from "./slices/pomodoroStatusSlice"

export const reducer = {
  pomodoroSettings: pomodoroSettingsSlice.reducer,
  pomodoroStatus: pomodoroStatusSlice.reducer
}
