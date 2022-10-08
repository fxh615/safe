



import * as React from 'react';
import { ThemeProvider } from 'styled-components';
// const DefaultTheme = require("less-vars-loader!antd/lib/style/themes/default.less")
// const colors = require("less-vars-loader!antd/lib/style/color/colors.less")
// console.log('DefaultTheme', DefaultTheme, colors);

const ThemeWrapper: React.FC = ({ children }: any) => {
  return <ThemeProvider theme={{}}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
