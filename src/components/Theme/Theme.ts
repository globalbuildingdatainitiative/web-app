import { createTheme, MantineColorsTuple, rem } from '@mantine/core'

export const theme = createTheme({
  fontFamily: 'Outfit, sans-serif',
  headings: {
    fontFamily: 'Outfit, sans-serif',
    fontWeight: '700',
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
    xxl: '120em',
  },
  colors: {
    green: [
      '#eefcf8',
      '#ddf5ef',
      '#b5edde',
      '#8ce5cb',
      '#6addbc',
      '#57d8b1',
      '#4bd6ac',
      '#3dbd97',
      '#31a985',
      '#1d9a78',
    ] as MantineColorsTuple,
  },
  primaryColor: 'green',
  primaryShade: 9,
  other: {
    backgroundColor: '#fafbff',
  },
})
