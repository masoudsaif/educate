export const common = {
  black: '#000',
  white: '#fff',
};

export const light = {
  primary: '#0e56bc',
  secondary: '#0e56bc',
  success: '#2e7d32',
  error: 'd32f2f',
  dark: '#898f9c',
  text: '#000',
  light: '#e3e3e3',
  background: '#eef8ff',
  lightBackground: '#fff',
  ...common,
};

export const dark = {
  primary: '#397cdb',
  secondary: '#0e56bc',
  success: '#2e7d32',
  error: 'd32f2f',
  dark: '#f9f9f9',
  light: '#e3e3e3',
  text: '#fff',
  background: '#1e1e1e',
  lightBackground: '#111111',
  ...common,
};

export default {
  light,
  dark,
};

export type Color = keyof typeof light;
