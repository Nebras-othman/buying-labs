import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage />}></Route>
            </Routes>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
