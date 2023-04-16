

import 'styled-components';
import { defaultTheme } from '../layouts/theme/DefaultTheme';


type themeType = typeof defaultTheme;

declare module 'styled-components' {
    export interface DefaultTheme extends themeType {}
}