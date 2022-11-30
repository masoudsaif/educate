import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Theme } from '../../constants/types';

interface ISettings {
  theme: Theme;
  didSplashScreensOpen: boolean;
  isAuthScreensActive: boolean;
}

const booleans = {
  didSplashScreensOpen: false,
  isAuthScreensActive: true,
};

type BooleanSetting = keyof typeof booleans;

const initialState: ISettings = {
  theme: 'light',
  ...booleans,
};

const settingsSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<Theme>) {
      state.theme = payload;
    },
    turnOffSetting(state, { payload }: PayloadAction<BooleanSetting>) {
      state[payload] = false;
    },
    turnOnSetting(state, { payload }: PayloadAction<BooleanSetting>) {
      state[payload] = true;
    },
  },
});

export const { setTheme, turnOffSetting, turnOnSetting } =
  settingsSlice.actions;

export default settingsSlice.reducer;
