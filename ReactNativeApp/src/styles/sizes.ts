export const sizes = {
  xxs: 1,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  xxl: 12,
  '3xl': 14,
  '4xl': 16,
  '5xl': 18,
  '6xl': 20,
  '7xl': 22,
  '8xl': 24,
  '9xl': 26,
  '10xl': 28,
  '11xl': 30,
  '12xl': 32,
  '13xl': 34,
  '14xl': 36,
  '15xl': 38,
  '16xl': 40,
  '17xl': 42,
};

export const iconSizes = {
  xs: 20,
  sm: 24,
  md: 28,
  lg: 32,
  xl: 36,
};

export type Size = keyof typeof sizes;

export type IconSize = keyof typeof iconSizes;
