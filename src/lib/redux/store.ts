import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: {},
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the type of RootState and AppDispatch from the store itself (i.e. the return type of makeStore)
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
