import { useContext } from "react";
import { ThemeContext, themes } from "../../components/context/themeContext";
import Switch from "react-switch";
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import Appear from "components/Appear";

import s from "./ThemeSwitcher.module.css";


const ThemeSwitcher = () => {
 
  const { theme, toggleTheme } = useContext(ThemeContext);
  // console.log(theme)
  // console.log(ThemeContext)

  return (
    <Appear time={350}>

   
    <div className={s.container}>
      <div>
        <label>
          <Switch
            className={s.reactSwitch}
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === themes.dark}
            handleDiameter={28}
            offColor="#fffc35"
            onColor="#4b4e4e"
            offHandleColor="#4b4e4e"
            onHandleColor="#fffc35"
            height={40}
            width={70}
            borderRadius={6}
            activeBoxShadow="0px 0px 1px 2px #fffc35"
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  color: "orange",
                  paddingRight: 2,
                }}
              ></div>
            }
            checkedIcon={<svg></svg>}
            uncheckedHandleIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 18,
                }}
              >
                <WbSunnyRoundedIcon style={{ color: "#fffc35" }} />
              </div>
            }
            checkedHandleIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  color: "red",
                  fontSize: 18,
                }}
              >
                <DarkModeRoundedIcon  style={{ color: "#4b4e4e" }} />
              </div>
            }
          />
        </label>
      </div>
      </div>
       </Appear>
  );
};

export default ThemeSwitcher;