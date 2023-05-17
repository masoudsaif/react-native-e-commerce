export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 22,
  '3xl': 24,
  '4xl': 26,
  '5xl': 28,
  '6xl': 30,
  extreme: 45,
};

export const fontFamilies = {
  primary: 'Roboto-Medium',
};

export type FontFamily = keyof typeof fontFamilies;

export type FontSize = keyof typeof fontSizes;
