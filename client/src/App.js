import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import theme from "./theme";
import { Container } from "@mui/material";

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container fixed>
        <HomePage />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
