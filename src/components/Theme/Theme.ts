import { createTheme, MantineColorsTuple, rem } from '@mantine/core'

export const theme = createTheme({
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  headings: {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
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
      '#EAFAF0', // [0] Pastel
      '#A6DBC9', // [1] Light
      '#8ED3BC',
      '#76CCAF',
      '#5EC4A2',
      '#1B9D7E', // [5] Bright
      '#1B8E73',
      '#1C7F68',
      '#206D59', // [8] Dark
      '#1B9D7E', // [9] Primary Green
    ] as MantineColorsTuple,
    blue: [
      '#E9F7FE', // [0] Pastel
      '#9DD2F3', // [1] Light
      '#89C7EF',
      '#75BCEB',
      '#61B1E7',
      '#3592E3', // [5] Bright
      '#3485D4',
      '#3378C5',
      '#326BB6',
      '#31658D', // [9] Dark
    ] as MantineColorsTuple,
    purple: [
      '#EFECFE', // [0] Pastel
      '#BAAEF6', // [1] Light
      '#ACA0F4',
      '#9E92F2',
      '#9084F0',
      '#8671EF', // [5] Bright
      '#7B6AE0',
      '#7063D1',
      '#6560C2',
      '#5C5CAE', // [9] Dark
    ] as MantineColorsTuple,
    orange: [
      '#FEE6C8', // [0] Pastel
      '#FBCA94', // [1] Light
      '#FAC082',
      '#F8B670',
      '#F7AC5E',
      '#F59B3A', // [5] Bright
      '#E68E32',
      '#D7812A',
      '#C8741E',
      '#CC7212', // [9] Dark
    ] as MantineColorsTuple,
    red: [
      '#ffeeea',
      '#fbdbd6',
      '#f0b6ab',
      '#e68e7d',
      '#de6d56',
      '#da573d',
      '#d84c30',
      '#c03d23',
      '#ac341d',
      '#972a16',
    ] as MantineColorsTuple,
    yellow: [
      '#fffae5',
      '#fff3d0',
      '#fee69f',
      '#fed869',
      '#fecc3f',
      '#fec426',
      '#fec019',
      '#e2a90c',
      '#c99600',
      '#ae8100',
    ] as MantineColorsTuple,
  },
  primaryColor: 'green',
  primaryShade: 9,
  other: {
    backgroundColor: '#fafbff',
  },
})
