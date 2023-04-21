import { Button } from "./components/Button/Button.index";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./layouts/theme/DefaultTheme";
import { GlobalStyle } from "./styles/global-style";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { CycleContextProvider } from "./contexts/cycles-context";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
