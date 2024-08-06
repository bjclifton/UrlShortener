import React, { createContext, useContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6a1b9a", // purple
    },
    secondary: {
      main: "#43a047", // green
    },
    background: {
      default: "#f5f5f5", // light background color
      paper: "#ffffff", // background color for paper elements
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9c27b0", // lighter purple
    },
    secondary: {
      main: "#66bb6a", // lighter green
    },
    background: {
      default: "#303030", // dark background color
      paper: "#424242", // background color for paper elements
    },
  },
});

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, handleToggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
