import React, { createContext, useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import {
  getStorageData,
  removeStorageData,
  setStorageData,
} from "../other/storage";

export const SchemeContext = createContext();

export const SchemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [themeSetting, setThemeSetting] = useState("auto");
  const [theme, setTheme] = useState(systemTheme);

  // on app launch
  useEffect(() => {
    getStorageData("theme").then((storedTheme) => {
      if (storedTheme) setThemeSetting(storedTheme);
    });
  }, []);

  // configure if theme is manually set or system set
  useEffect(() => {
    if (themeSetting != "auto") {
      setTheme(themeSetting);
    } else setTheme(systemTheme);
    setStorageData("theme", themeSetting);
  }, [themeSetting, systemTheme]);

  const colors =
    theme != "dark"
      ? {
          // light mode
          primary: "#32D274",
          primaryShade: "#5effa2",
          secondary: "#435058",
          background: "#EDF7F6",
          foreground: "#fff",
          text: "#435058",
          caption: "#636366",
          caption2: "#ababab",
          destructive: "#ff3b30",
          lightButton: "#e1e6eb",
          theme: "#EDF7F6",
          light: "#EDF7F6",
          dark: "#2c2c2e",
          black: "#000",
        }
      : {
          // dark mode
          primary: "#32D274",
          primaryShade: "#5effa2",
          secondary: "#839189",
          background: "#1c1c1e",
          foreground: "#2c2c2e",
          text: "#EDF7F6",
          caption: "#ababab",
          caption2: "#636366",
          destructive: "#ff3b30",
          lightButton: "#3a3a3c",
          theme: "#2c2c2e",
          light: "#EDF7F6",
          dark: "#2c2c2e",
          black: "#000",
        };

  const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    containerTop: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      textAlign: "center",
    },
    containerTop2: {
      flex: 1,
      backgroundColor: colors.foreground,
      alignItems: "center",
      textAlign: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
    },
    title: {
      textAlign: "center",
      fontSize: 40,
      fontWeight: "900",
      color: colors.primary,
      marginBottom: 20,
    },
    heading: {
      fontSize: 32,
      fontWeight: "800",
      color: colors.primary,
      marginTop: 100,
    },
    nameInput: {
      fontSize: 24,
      paddingTop: 80,
      paddingBottom: 300,
      color: colors.text,
      textAlign: "center",
    },
    caption: {
      color: colors.caption,
      maxWidth: 340,
      textAlign: "center",
    },
    inputLabel: {
      fontSize: 18,
      width: 300,
      marginTop: 16,
      color: colors.primary,
      fontFamily: "Avenir",
    },
    textInput: {
      fontSize: 20,
      marginTop: 8,
      width: 290,
      color: colors.text,
      textAlign: "left",
      fontFamily: "Avenir",
    },
    errorText: {
      color: colors.destructive,
      fontSize: 14,
      textAlign: "left",
      width: 300,
      fontFamily: "Avenir",
    },
    shadow: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.3,
      shadowRadius: 15,
      elevation: 20,
    },
  });

  return (
    <SchemeContext.Provider
      value={{ colors, globalStyles, theme, themeSetting, setThemeSetting }}
    >
      {children}
    </SchemeContext.Provider>
  );
};
