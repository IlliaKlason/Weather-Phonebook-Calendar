import { useContext } from 'react';
import { ThemeContext, themes } from 'components/context/themeContext';
import Appear from 'components/Appear';
import { useTranslation } from 'react-i18next';



const CalendarHeader = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <>
      <Appear time={350}>
        <h1
        className={theme === themes.light ? "lightText" : "darkText"}>
          {t("calendar.title")}
        </h1>
      </Appear>

    </>
  )
}

export default CalendarHeader