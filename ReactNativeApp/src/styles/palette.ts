export const palette = {
  background: '#F8F9FC',
  primaryBackground: '#ADEBED',
  primary: '#66CFD3',
  secondary: '#ADEBED',
  light: '#ECF8FB',
  white: '#FFF',
  black: '#000',
  green: '#4CBE70',
  lightGreen: '#DEF0F2',
  darkGreen: '#008F95',
  gray: '#ECECEC',
  dark: '#939393',
  error: '#C62828',
  primaryFont: '#090D31',
  secondaryFont: '#6a6a6a',
  orange: '#FF9529',
};

export const detailedPalette = {
  success: {
    dark: '#005221',
    light: '#e0e9e5',
    main: '#2e7d32',
  },
  error: {
    dark: '#c62828',
    light: '#fde0e4',
    main: '#d32f2f',
  },
  info: {
    dark: '#5b95a6',
    light: '#d9e0e6',
    main: '#597bac',
  },
  warning: {
    dark: '#e65100',
    light: '#ffe8dc',
    main: '#ed6c02',
  },
  light: {
    dark: '#dedede',
    light: '#e8e8e8',
    main: '#e3e3e3',
  },
};

export type DetailedColor = keyof typeof detailedPalette;

export type Color = keyof typeof palette;

export default palette;
