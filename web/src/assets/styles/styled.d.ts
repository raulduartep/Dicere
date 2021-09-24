import 'styled-components';
import { string } from 'yup/lib/locale';

declare module 'styled-components' {
  export interface DefaultTheme {
    surface: string;
    primary: {
      light: string;
      main: string;
      mediumDark: string;
    };
    onSurface: {
      high: string;
      medium: string;
      disabled: string;
    };
    onPrimary: {
      high: string;
    };
    divider: string;
    button: {
      disabled: string;
      hover: string;
      hoverPrimary: string;
    };
    input: {
      background: string;
    };
    box: {
      twodp: string;
      fourdp: string;
      twentyfourdp: string;
      shadows: {
        fourdp: string;
        twodp: string;
        twentyfourdp: string;
      };
    };
    success: string;
    error: string;
    warning: string;
    info: string;
  }
}
