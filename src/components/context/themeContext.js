import { createContext } from "react";


let time = new Date().getHours();

const themes = {
  dark: "dark",
  light: "light",
  
};
const themesColor = time <= 12 ? themes.light : themes.dark;

const ThemeContext = createContext({
  theme: themesColor,
  toggleTheme: () => {},
});

export { ThemeContext, themes };