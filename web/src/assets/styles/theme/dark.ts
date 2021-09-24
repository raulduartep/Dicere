import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  surface: '#121212',
  primary: {
    light: '#BDDFFD',
    main: '#94CCFC',
    mediumDark: '#6AB7FA',
  },
  onSurface: {
    high: 'rgba(255,255,255,0.87)',
    medium: 'rgba(255,255,255,0.6)',
    disabled: 'rgba(255,255,255,0.38)',
  },
  onPrimary: {
    high: '#121212',
  },
  divider: 'rgba(255,255,255,0.12)',
  button: {
    hover: 'rgba(255,255,255,0.12)',
    disabled: 'rgba(255,255,255,0.12)',
    hoverPrimary: 'rgba(148, 204, 252, 0.07)',
  },
  box: {
    fourdp: '#272727',
    twodp: '#232323',
    twentyfourdp: '#383838',
    shadows: {
      fourdp:
        '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
      twodp:
        '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
      twentyfourdp:
        '0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.2)',
    },
  },
  input: {
    background: '#414141',
  },
  error: '#FF3D71',
  success: '#00D68F',
  info: '#0095FF',
  warning: '#FFAA00',
};
